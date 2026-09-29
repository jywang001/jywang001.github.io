#!/usr/bin/env python3
"""Render the retained E3 run without smoothing or reconstructed observations.

Requires Matplotlib (rendered with 3.11.2). Run from any working directory:
    python scripts/figures/plot_critpt_results.py

The CSV is a numeric-only extraction of the original log. To re-extract it,
pass --source-log PATH; its SHA-256 must match the recorded provenance.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import math
import os
import tempfile
from pathlib import Path


HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
DATA = HERE / "critpt-e3-timeseries.csv"
SUMMARY = HERE / "critpt-e3-public-summary.json"
PROVENANCE = HERE / "critpt-results-provenance.json"
FIELDS = ["step", "training_reward", "response_length_tokens"]
SOURCE_FIELDS = ["critic/score/mean", "response_length/mean"]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def extract(source: Path, provenance: dict) -> None:
    if sha256(source) != provenance["raw_log_sha256"]:
        raise ValueError("Source log does not match the documented experiment.")
    with source.open(encoding="utf-8") as handle:
        rows = [json.loads(line) for line in handle if line.strip()]
    with DATA.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle, lineterminator="\n")
        writer.writerow(FIELDS)
        for row in rows:
            writer.writerow([row["step"], *(row["data"][key] for key in SOURCE_FIELDS)])


def load_and_validate(provenance: dict) -> tuple[list[int], list[float], list[float]]:
    if sha256(SUMMARY) != provenance["public_summary_sha256"]:
        raise ValueError("The copied public summary has changed.")
    if sha256(DATA) != provenance["selected_csv_sha256"]:
        raise ValueError("The selected observations have changed.")
    summary = json.loads(SUMMARY.read_text(encoding="utf-8"))
    with DATA.open(encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle))
    steps = [int(row["step"]) for row in rows]
    if len(rows) != summary["rows"] or steps != list(range(1, summary["last_step"] + 1)):
        raise ValueError("Missing, duplicated, or reordered training steps.")
    series = []
    for csv_key, source_key in zip(FIELDS[1:], SOURCE_FIELDS):
        values = [float(row[csv_key]) for row in rows]
        if not all(math.isfinite(value) for value in values):
            raise ValueError(f"Non-finite observations in {csv_key}.")
        statistics = {"last": values[-1], "min": min(values), "max": max(values),
                      "mean": sum(values) / len(values)}
        for key, value in statistics.items():
            if not math.isclose(value, summary[source_key][key], rel_tol=1e-12, abs_tol=1e-12):
                raise ValueError(f"Public-summary mismatch: {source_key}/{key}.")
        series.append(values)
    return steps, series[0], series[1]


def render(steps: list[int], reward: list[float], length: list[float]) -> None:
    os.environ.setdefault("MPLCONFIGDIR", str(Path(tempfile.gettempdir()) / "wjysite-matplotlib"))
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib.ticker import FormatStrFormatter

    plt.rcParams.update({
        "font.family": "serif",
        "font.serif": ["STIXGeneral", "DejaVu Serif"],
        "mathtext.fontset": "stix",
        "font.size": 13,
        "axes.labelsize": 14,
        "xtick.labelsize": 12,
        "ytick.labelsize": 12,
        "axes.linewidth": 0.7,
        "axes.spines.top": False,
        "axes.spines.right": False,
        "axes.grid": False,
        "xtick.direction": "out",
        "ytick.direction": "out",
        "xtick.major.size": 3,
        "ytick.major.size": 3,
        "figure.facecolor": "white",
        "axes.facecolor": "white",
        "pdf.fonttype": 42,
        "svg.fonttype": "path",
        "svg.hashsalt": "critpt-e3-120-steps",
        "savefig.dpi": 300,
    })
    fig, axes = plt.subplots(2, 1, sharex=True, figsize=(8.0, 5.0))
    fig.subplots_adjust(left=0.15, right=0.975, top=0.955, bottom=0.13, hspace=0.22)
    # Okabe–Ito colors; both series also have distinct panel labels and axes.
    for ax, values, color, panel in zip(axes, [reward, length], ["#0072B2", "#D55E00"], ["(a)", "(b)"]):
        ax.plot(steps, values, color=color, linewidth=0.95, marker="o",
                markersize=2.3, markeredgewidth=0, solid_capstyle="round")
        ax.set_xlim(0, 122)
        ax.set_xticks([0, 30, 60, 90, 120])
        ax.text(0.015, 0.94, panel, transform=ax.transAxes, va="top", fontsize=13)
        ax.tick_params(axis="both", pad=5)
    axes[0].set_ylim(0, 0.20)
    axes[0].set_yticks([0, 0.05, 0.10, 0.15, 0.20])
    axes[0].yaxis.set_major_formatter(FormatStrFormatter("%.2f"))
    axes[0].set_ylabel("Mean training\nreward", labelpad=12)
    axes[1].set_ylim(0, 125)
    axes[1].set_yticks([0, 40, 80, 120])
    axes[1].set_ylabel("Mean response length\n(tokens)", labelpad=12)
    axes[1].set_xlabel("Training step", labelpad=8)
    output = ROOT / "images" / "projects"
    output.mkdir(parents=True, exist_ok=True)
    for extension in ["svg", "pdf", "png"]:
        metadata = {"Date": None} if extension == "svg" else ({"CreationDate": None, "ModDate": None} if extension == "pdf" else {})
        fig.savefig(output / f"critpt-results.{extension}", metadata=metadata)
        if extension == "svg":
            svg = output / "critpt-results.svg"
            svg.write_text("\n".join(line.rstrip() for line in svg.read_text().splitlines()) + "\n")
    plt.close(fig)
    print(f"Validated and plotted {len(steps)} observed steps; no smoothing or data interpolation.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-log", type=Path, help="Optional original E3 log for exact numeric-only extraction.")
    args = parser.parse_args()
    provenance = json.loads(PROVENANCE.read_text(encoding="utf-8"))
    if args.source_log:
        extract(args.source_log, provenance)
    render(*load_and_validate(provenance))


if __name__ == "__main__":
    main()
