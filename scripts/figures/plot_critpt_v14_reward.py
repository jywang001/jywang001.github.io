#!/usr/bin/env python3
"""Plot V14 steps 1–40 and an explicitly labeled eight-step trailing mean.

Requires Matplotlib (rendered with 3.11.2). Optional --source-repo PATH verifies
all 80 retained values against the original log, CSV, and public full-run plot.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import math
import os
import statistics
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
DATA = HERE / "critpt-v14-reward.csv"
PROVENANCE = HERE / "critpt-v14-provenance.json"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load(provenance: dict) -> tuple[list[int], list[float]]:
    if digest(DATA) != provenance["selected_csv_sha256"]:
        raise ValueError("Selected data do not match their provenance.")
    with DATA.open(encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle))
    steps = [int(row["step"]) for row in rows]
    values = [float(row["mean_training_reward"]) for row in rows]
    if steps != list(range(1, 81)) or not all(math.isfinite(v) and 0 <= v <= 1 for v in values):
        raise ValueError("Expected 80 consecutive steps and rewards in [0, 1].")
    measured = {"mean": statistics.mean(values), "first5_mean": statistics.mean(values[:5]),
                "last5_mean": statistics.mean(values[-5:]), "first16_mean": statistics.mean(values[:16]),
                "last16_mean": statistics.mean(values[-16:]), "min": min(values), "max": max(values)}
    for key, value in measured.items():
        if not math.isclose(value, provenance["validated_statistics"][key], abs_tol=1e-12, rel_tol=1e-12):
            raise ValueError(f"Statistic mismatch: {key}.")
    return steps, values


def verify_sources(repo: Path, provenance: dict, steps: list[int], values: list[float]) -> None:
    sources = provenance["sources"]
    for info in sources.values():
        if digest(repo / info["path"]) != info["sha256"]:
            raise ValueError(f"Source hash mismatch: {info['path']}.")
    raw = [json.loads(line) for line in (repo / sources["raw_log"]["path"]).read_text().splitlines() if line.strip()]
    if [(r["step"], r["data"]["critic/score/mean"]) for r in raw] != list(zip(steps, values)):
        raise ValueError("Selected values differ from original JSONL.")
    with (repo / sources["metrics_csv"]["path"]).open(newline="") as handle:
        rows = list(csv.DictReader(handle))
    if [(int(float(r["step"])), float(r["critic/score/mean"])) for r in rows] != list(zip(steps, values)):
        raise ValueError("Selected values differ from original CSV.")
    # Forward-render the known raw values into the public plot's coordinate
    # system. No numeric input is inferred from image or curve coordinates.
    ns = {"s": "http://www.w3.org/2000/svg"}
    public = ET.parse(repo / sources["public_full_run_svg"]["path"]).getroot()
    panel = next(g for g in public.findall("s:g", ns)
                 if any(t.text == "critic/score/mean" for t in g.findall("s:text", ns)))
    area = panel.find("s:rect", ns).attrib
    x, y, width, height = (float(area[k]) for k in ["x", "y", "width", "height"])
    low, high = min(values), max(values)
    expected = " ".join(f"{x + (step - steps[0]) / (steps[-1] - steps[0]) * width:.1f},"
                        f"{y + height - (value - low) / (high - low) * height:.1f}"
                        for step, value in zip(steps, values))
    if panel.find("s:polyline", ns).attrib["points"] != expected:
        raise ValueError("Raw observations do not reproduce the public plot.")
    print("Verified all 80 observations against raw JSONL, CSV, and the public 80-step SVG.")


def render(steps: list[int], values: list[float]) -> None:
    os.environ.setdefault("MPLCONFIGDIR", str(Path(tempfile.gettempdir()) / "wjysite-matplotlib"))
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib.ticker import FormatStrFormatter

    plt.rcParams.update({
        "font.family": "serif", "font.serif": ["STIXGeneral", "DejaVu Serif"],
        "font.size": 14, "axes.labelsize": 16, "xtick.labelsize": 13, "ytick.labelsize": 13,
        "axes.linewidth": 0.7, "axes.spines.top": False, "axes.spines.right": False,
        "axes.grid": False, "xtick.direction": "out", "ytick.direction": "out",
        "figure.facecolor": "white", "axes.facecolor": "white", "pdf.fonttype": 42,
        "svg.fonttype": "path", "svg.hashsalt": "critpt-v14-reward-40-steps", "savefig.dpi": 300,
    })
    trailing = [statistics.mean(values[end - 8:end]) for end in range(8, len(values) + 1)]
    assert steps == list(range(1, 41)) and len(trailing) == 33
    fig, ax = plt.subplots(figsize=(8, 5))
    fig.subplots_adjust(left=0.12, right=0.975, bottom=0.14, top=0.95)
    ax.plot(steps, values, color="#a5b8c9", linewidth=1.15, marker="o", markersize=3.2,
            markeredgewidth=0, label="Logged batch mean", zorder=2)
    ax.plot(steps[7:], trailing, color="#0072B2", linewidth=2.1,
            label="8-step trailing mean", zorder=3)
    ax.set_xlim(0, 40.5)
    ax.set_xticks([0, 10, 20, 30, 40])
    ax.set_ylim(0, 1)
    ax.set_yticks([0, 0.2, 0.4, 0.6, 0.8, 1.0])
    ax.yaxis.set_major_formatter(FormatStrFormatter("%.1f"))
    ax.set_xlabel("Training step", labelpad=9)
    ax.set_ylabel("Mean training reward", labelpad=11)
    ax.tick_params(axis="both", pad=5, width=0.7, length=3)
    ax.legend(loc="lower right", frameon=False, fontsize=13, handlelength=2.7,
              borderaxespad=1.0, labelspacing=0.5)
    directory = ROOT / "images" / "projects"
    directory.mkdir(parents=True, exist_ok=True)
    for extension in ["svg", "pdf", "png"]:
        metadata = {"Date": None} if extension == "svg" else ({"CreationDate": None, "ModDate": None} if extension == "pdf" else {})
        path = directory / f"critpt-v14-reward.{extension}"
        fig.savefig(path, metadata=metadata)
        if extension == "svg":
            path.write_text("\n".join(line.rstrip() for line in path.read_text().splitlines()) + "\n")
    plt.close(fig)
    print("Plotted the first 40 logged rewards and 33 trailing means at steps 8–40; no edge padding.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-repo", type=Path)
    args = parser.parse_args()
    provenance = json.loads(PROVENANCE.read_text(encoding="utf-8"))
    steps, values = load(provenance)
    if args.source_repo:
        verify_sources(args.source_repo, provenance, steps, values)
    assert provenance["displayed_step_range"] == [1, 40]
    assert provenance["smoothing"]["plotted_steps"] == [8, 40]
    assert provenance["smoothing"]["outputs"] == 33
    render(steps[:40], values[:40])


if __name__ == "__main__":
    main()
