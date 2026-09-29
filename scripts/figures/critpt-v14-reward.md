# V14 compact executable-answer training

**Caption:** Mean training reward across the full 80-step V14 GRPO run on
synthetic coding tasks. Light points and lines show every logged batch mean;
the blue line is an eight-step trailing arithmetic mean, shown only at steps
8–80. The first and last 16-step mean rewards are 0.7456 and 0.8989. This is a
single-run training-objective diagnostic, not benchmark accuracy or evidence
of improved official70 performance.

The reward uses executable checks plus partial credit for formatting and
compactness, with repetition and length penalties. It is clipped to [0, 1].
This V14 run uses a local verifier, not an LLM judge. The configuration specifies
four rollouts per prompt and 80 training steps.

Immutable source references:

- [Full 80-step public artifact](https://github.com/jywang001/CritPT-RL/blob/8f518c81dc78cb52d93dd7d3e3dfa37d6880160d/artifacts/curated/generated_metric_plots/experiments__qwen3_8b_grpo_v14_compact_exec_n4_step80__metrics_key.svg)
- [V14 training configuration](https://github.com/jywang001/CritPT-RL/blob/8f518c81dc78cb52d93dd7d3e3dfa37d6880160d/configs/experiments/qwen3_8b_grpo_v14_compact_exec_n4.env)
- [Reward implementation](https://github.com/jywang001/CritPT-RL/blob/8f518c81dc78cb52d93dd7d3e3dfa37d6880160d/src/rl_posttrain/critpt_synth/verl_reward_v14_compact.py)

`artifacts/curated/v14_metrics_key.svg` is the earlier 40-step snapshot and is
not the full-run source used here.

## Reproduction and validation

```sh
python scripts/figures/plot_critpt_v14_reward.py
# Optional verification against the local original source repository:
python scripts/figures/plot_critpt_v14_reward.py --source-repo PATH
```

Requires Matplotlib; rendered with version 3.11.2. The CSV copies only `step`
and `data["critic/score/mean"]` from the original JSONL. No raw log, prompts,
outputs, credentials, host details, or other training fields are published.
Hashes and source-relative paths are in `critpt-v14-provenance.json`.

All selected values match both the original JSONL and its CSV export exactly.
Forward-transforming those known data values into the public full-run SVG's
axes reproduces its 80 curve coordinates at the artifact's recorded precision.
The public SVG is used only for validation, never to infer the input data.
Mean and first/last-five values also match the original run summary.

The trailing mean at step t is the arithmetic mean of observations t−7 through
t. It uses no future values, padding, interpolation, or fitted trend. The raw
points remain visible. Both axis limits and all 80 observations are retained.
Outputs are an 8 × 5 inch SVG, vector PDF, and 300-dpi PNG in `images/projects/`.
