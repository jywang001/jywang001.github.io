---
layout: project
title: "CritPT-RL"
permalink: /portfolio/critpt-rl/
category: "Reinforcement learning"
period: "July 2026"
summary: "An end-to-end GRPO post-training and evaluation pipeline for scientific coding tasks, with synthetic data, reward functions, and executable verifiers."
stack: "Python · verl · vLLM · GRPO"
repository: "https://github.com/jywang001/CritPT-RL"
image: "/images/projects/critpt-workflow.svg"
image_alt: "An illustrated overview of the CritPT-RL task generation, verification, training, and evaluation pipeline."
collection: portfolio
order: 1
featured: true
---

## The problem

Scientific coding tasks ask a language model to read a problem and return an executable Python `answer()` function. Evaluating these outputs requires distinguishing valid formatting, successful execution, and a semantically correct answer.

I built this personal project to connect data generation, model rollouts, reward design, GRPO training, and evaluation in one repeatable experiment pipeline.

## Training and evaluation

The training pipeline uses verl and vLLM, with tools for checkpoint merging, evaluation, and plotting. Training data includes programmatically generated tasks, benchmark-style prompts, hard cases collected from failed attempts, and LLM-generated task specifications.

I compared reward designs using execution checks, semantic code judging, length constraints, final-answer checks, and LLM judges. Experiment configurations and results are retained together to make these comparisons traceable.

## What I investigated

Repeated training comparisons and error analysis exposed two practical problems: incorrect answers receiving high rewards, and training examples that did not match the kinds of questions used in evaluation. I revised training samples and reward rules in response, treating evaluation failures as evidence for the next experiment.

## Public materials

The repository includes data builders, reward implementations, experiment configurations, evaluation scripts, unit tests, and selected training curves. Local tests can run without model weights or API keys. Full model weights and raw rollouts are not included.
