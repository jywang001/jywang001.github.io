# CritPT-RL: retained E3 training diagnostics

**Caption:** Unsmoothed diagnostics from one 120-step E3 GRPO run: (a) batch mean
training reward and (b) batch mean response length in tokens. Every marker is a
logged observation; connecting segments only guide the eye. The curves are
training diagnostics, not task accuracy, and are not evidence of a benchmark
gain. The project reports no improvement in official70 accuracy.

The numeric CSV contains only the original `step`, `critic/score/mean`, and
`response_length/mean` fields. No prompts, outputs, paths, host information, or
other log fields are copied. It is not reconstructed from chart coordinates.

The original E3 log contains 120 consecutive steps. Its count and final step,
and both series' minimum, maximum, mean, and final value, match the committed
public summary. The plotting script verifies these checks at a tolerance of
1e-12 on every run. The copied summary is byte-for-byte identical to the source;
input hashes and source references are recorded in
`critpt-results-provenance.json`.

Public evidence at the source revision:

- [E3 summary](https://github.com/jywang001/CritPT-RL/blob/8f518c81dc78cb52d93dd7d3e3dfa37d6880160d/artifacts/curated/e3_realtime_summary.json)
- [Previously published E3 plot](https://github.com/jywang001/CritPT-RL/blob/8f518c81dc78cb52d93dd7d3e3dfa37d6880160d/artifacts/curated/e3_realtime_curves.svg)
- [Project result and limitations](https://github.com/jywang001/CritPT-RL/blob/8f518c81dc78cb52d93dd7d3e3dfa37d6880160d/README.md#result)

The separate E2 official70 score artifact records accuracy 0 and four judge
errors. It is intentionally not plotted as a clean benchmark comparison, and
it is not combined with this E3 run.

## Reproduce

Use Python 3.10+ with Matplotlib installed (rendered with Matplotlib 3.11.2):

```sh
python scripts/figures/plot_critpt_results.py
```

Outputs: `images/projects/critpt-results.svg`, `.pdf`, and `.png`.
The 8 × 5 inch figure uses embedded/path-converted serif fonts, vector axes and
data marks, a white background, and the blue/vermillion Okabe–Ito palette.
There is no smoothing, averaging between steps, fitted trend, confidence band,
or cross-run comparison. The original inputs can be re-extracted with
`--source-log PATH`; the log must match the documented SHA-256.
