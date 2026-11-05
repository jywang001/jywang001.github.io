(() => {
  'use strict';
  const ARMS = ['A', 'B', 'C'];
  const ARM_NAME = { A: 'A · AI 自主', B: 'B · Claude 代人类点选', C: 'C · Claude 批评 → AI 选' };
  const ARM_SHORT = { A: 'AI 自主', B: 'Claude 代人类点选', C: 'Claude 批评 → AI 选' };
  const EV = {
    preliminary_support: '初步支持', not_supported: '不支持',
    inconclusive: '不确定', implementation_mismatch: '实现与假设不符',
  };
  const ST = { solver_failed: '代码运行出错', timeout: '超时', invalid_output: '输出格式无效', interrupted: '被中断' };
  const MEDAL = { gold: '金牌', silver: '银牌', bronze: '铜牌' };
  const NS = 'http://www.w3.org/2000/svg';
  const $ = (s, r = document) => r.querySelector(s);
  const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const color = (arm) => css('--' + arm);

  let INDEX = null;
  const studyCache = new Map();
  const state = { key: null, arm: null, round: null, visible: { A: true, B: true, C: true } };
  const redraws = new Map();

  // ---------------------------------------------------------------- helpers
  function el(tag, attrs = {}, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'on') { for (const [ev, fn] of Object.entries(v)) n.addEventListener(ev, fn); continue; }
      n.setAttribute(k, v === true ? '' : v);
    }
    for (const k of kids.flat()) if (k != null && k !== false) n.append(k instanceof Node ? k : document.createTextNode(String(k)));
    return n;
  }
  function svgEl(tag, attrs = {}, text) {
    const n = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) if (v != null) n.setAttribute(k, v);
    if (text != null) n.textContent = text;
    return n;
  }
  function fmt(v, s) {
    if (v == null) return '—';
    const a = Math.abs(v);
    if (a >= 100) return Number(v).toFixed(2);
    return Number(v).toFixed(s && s.bench !== 'mle-bench' ? 4 : 5);
  }
  const pct = (g) => (g == null ? '—' : (g * 100).toFixed(1) + '%');
  const wan = (n) => (n == null ? '—' : n >= 1e4 ? (n / 1e4).toFixed(n >= 1e6 ? 0 : 1) + ' 万' : String(n));
  const dirWord = (s) => (s.direction === 'lower' ? '越低越好' : '越高越好');
  const better = (s, a, b) => (s.direction === 'lower' ? a < b : a > b);
  const metricLabel = (s) => s.metric;
  function studyLabel(s) {
    const many = INDEX.studies.filter((x) => x.task_id === s.task_id).length > 1;
    return many ? `${s.name} · 重复 ${s.replicate}` : s.name;
  }
  function niceTicks(lo, hi, n = 4) {
    const span = hi - lo || Math.abs(hi) || 1;
    const step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((x) => x >= step0);
    const out = [];
    for (let t = Math.ceil(lo / step) * step; t <= hi + step * 1e-9; t += step) out.push(+t.toFixed(10));
    return out;
  }
  function tickFmt(t, ticks) {
    const step = ticks.length > 1 ? Math.abs(ticks[1] - ticks[0]) : 1;
    let d = Math.max(0, -Math.floor(Math.log10(step) + 1e-9));
    if (+(t.toFixed(d)) !== +t.toFixed(10)) d += 1;
    return t.toFixed(Math.min(d, 6));
  }
  function deltaInfo(s, r) {
    if (r.ctl == null || r.itv == null) return null;
    const d = r.itv - r.ctl;
    const improved = better(s, r.itv, r.ctl);
    const same = Math.abs(d) < 1e-12;
    return { d, improved, same, word: same ? '持平' : improved ? '改善' : '变差' };
  }
  const sign = (d, s) => (d > 0 ? '+' : d < 0 ? '−' : '±') + fmt(Math.abs(d), s);
  function evBadge(ev) {
    return ev ? el('span', { class: 'ev', 'data-ev': ev }, EV[ev] || ev) : el('span', { class: 'muted' }, '—');
  }
  function onResize(id, fn) { redraws.set(id, fn); }
  let rt = null;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { for (const fn of redraws.values()) fn(); }, 150);
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => { for (const fn of redraws.values()) fn(); });

  // ---------------------------------------------------------------- tooltip
  const tip = $('#tooltip');
  function showTip(x, y, head, rows) {
    tip.replaceChildren(el('div', { class: 'h' }, head));
    for (const r of rows) {
      const row = el('div', { class: 'r' });
      if (r.arm) { const i = el('i'); i.style.background = color(r.arm); row.append(i); }
      row.append(el('b', {}, r.value), el('span', {}, r.label || ''));
      tip.append(row);
    }
    tip.hidden = false;
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, x + 14)) + 'px';
    tip.style.top = (y - h - 12 < 8 ? y + 18 : y - h - 12) + 'px';
  }
  const hideTip = () => { tip.hidden = true; };
  document.addEventListener('scroll', hideTip, { passive: true });

  function legend(box, opts = {}) {
    box.replaceChildren();
    for (const a of ARMS) {
      const sw = el('i', { class: 'dot' }); sw.style.background = color(a);
      if (opts.toggle) {
        const b = el('button', { type: 'button', class: 'lg-btn', 'aria-pressed': String(state.visible[a]),
          on: { click: () => { state.visible[a] = !state.visible[a]; if (!ARMS.some((x) => state.visible[x])) state.visible[a] = true; opts.toggle(); } } },
          sw, ARM_NAME[a]);
        box.append(b);
      } else box.append(el('span', {}, sw, ARM_NAME[a]));
    }
    if (opts.extra) for (const x of opts.extra) box.append(x);
  }

  // ---------------------------------------------------------------- hero facts
  function renderFacts() {
    const st = INDEX.studies;
    const tasks = new Set(st.map((s) => s.task_id)).size;
    let rounds = 0, calls = 0, tokens = 0;
    for (const s of st) for (const a of ARMS) {
      const r = s.arms[a]; if (!r) continue;
      rounds += r.rounds; calls += r.cost.calls || 0; tokens += (r.cost.prompt || 0) + (r.cost.completion || 0);
    }
    const running = st.filter((s) => s.status !== 'complete');
    const box = $('#facts');
    const fact = (b, t) => el('div', {}, el('b', {}, b), el('span', {}, t));
    box.append(fact(tasks, '个任务'), fact(st.length, '组研究（任务 × 重复）'), fact(rounds.toLocaleString(), '轮已完成（各臂合计）'),
      fact((rounds * 2).toLocaleString(), '次沙箱执行'), fact(calls.toLocaleString(), '次模型调用'), fact(wan(tokens), 'token'));
    if (running.length) $('#tldr-status').textContent = ` 目前仍有 ${running.length} 组研究在进行中，页面标注为“进行中”，宏观总结待全部完成后更新。`;
  }

  // ---------------------------------------------------------------- overview chart
  function renderOverviewChart() {
    const box = $('#overview-chart');
    legend($('#legend-overview'), { extra: [el('span', { class: 'muted' }, el('i', { class: 'dot hollow' }), '空心 = 该臂仍在进行中')] });
    const draw = () => {
      const studies = INDEX.studies;
      const W = Math.max(300, box.clientWidth), rowH = 46, top = 8, bottom = 40, left = 8, right = 18;
      const H = top + rowH * studies.length + bottom;
      const gaps = studies.flatMap((s) => ARMS.map((a) => s.arms[a] && s.arms[a].gap).filter((g) => g != null));
      let lo = Math.min(0, ...gaps), hi = Math.max(0.2, ...gaps);
      const ticks = niceTicks(lo, hi, W < 500 ? 4 : 6);
      lo = Math.min(lo, ticks[0]); hi = Math.max(hi, ticks[ticks.length - 1]);
      const x = (v) => left + (v - lo) / (hi - lo) * (W - left - right);
      const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': '各任务三臂的验证集差距关闭比例' });
      const yb = top + rowH * studies.length;
      for (const t of ticks) {
        svg.append(svgEl('line', { class: t === 0 ? 'axis' : 'gridline', x1: x(t), x2: x(t), y1: top, y2: yb }));
        svg.append(svgEl('text', { x: x(t), y: yb + 16, 'text-anchor': 'middle' }, (t * 100).toFixed(0) + '%'));
      }
      svg.append(svgEl('text', { class: 'lab', x: W - right, y: yb + 34, 'text-anchor': 'end' }, '差距关闭比例（验证集最优）→ 越右越好'));
      studies.forEach((s, i) => {
        const y0 = top + rowH * i, cy = y0 + 31;
        const g = svgEl('g', { class: 'ov-row', tabindex: 0, role: 'button', 'aria-label': `${studyLabel(s)}：打开任务详情` });
        g.append(svgEl('rect', { class: 'row-hl', x: 0, y: y0, width: W, height: rowH, rx: 6 }));
        const status = s.status === 'complete' ? '' : '（进行中）';
        g.append(svgEl('text', { class: 'lab', x: left, y: y0 + 15 }, studyLabel(s) + status));
        g.append(svgEl('line', { class: 'gridline', x1: left, x2: W - right, y1: cy, y2: cy }));
        ARMS.forEach((a, k) => {
          const r = s.arms[a]; if (!r || r.gap == null) return;
          const running = r.status !== 'complete';
          g.append(svgEl('circle', { class: 'dot', cx: x(r.gap), cy: cy + (k - 1) * 5, r: 5.5,
            fill: running ? css('--raised') : color(a), stroke: running ? color(a) : null, 'stroke-width': running ? 2 : null }));
        });
        const tipRows = () => ARMS.filter((a) => s.arms[a]).map((a) => {
          const r = s.arms[a];
          return { arm: a, value: pct(r.gap), label: `${a} · 最优 ${fmt(r.best, s)} · ${r.rounds}/${s.planned} 轮` };
        });
        const head = () => `${studyLabel(s)} · ${metricLabel(s)}（${dirWord(s)}）· 基线 ${fmt(s.baseline_runs ? s.baseline_runs.mean : s.arms.A.baseline, s)}`;
        g.addEventListener('mousemove', (e) => showTip(e.clientX, e.clientY, head(), tipRows()));
        g.addEventListener('mouseleave', hideTip);
        g.addEventListener('click', () => { hideTip(); openStudy(s.key, { scroll: true }); });
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openStudy(s.key, { scroll: true }); } });
        svg.append(g);
      });
      box.replaceChildren(svg);
    };
    draw(); onResize('overview', draw);
  }

  // ---------------------------------------------------------------- overview table
  function medalText(f, s) {
    if (!f || s.bench !== 'mle-bench') return '—';
    if (f.medal) return MEDAL[f.medal];
    return f.above_median ? '中位线以上' : '未达中位线';
  }
  function renderOverviewTable() {
    const t = $('#overview-table');
    t.append(el('thead', {}, el('tr', {}, ['任务', '臂', '进度', '验证集：基线 → 最优', '差距关闭', '测试集（最终）', '奖牌', '模型调用', 'token'].map((h) => el('th', { scope: 'col' }, h)))));
    const tb = el('tbody');
    for (const s of INDEX.studies) {
      ARMS.forEach((a, k) => {
        const r = s.arms[a]; if (!r) return;
        const tr = el('tr', { class: 'click' + (k === 0 ? ' grp' : ''), tabindex: 0,
          on: { click: () => openStudy(s.key, { scroll: true }), keydown: (e) => { if (e.key === 'Enter') openStudy(s.key, { scroll: true }); } } });
        if (k === 0) tr.append(el('th', { scope: 'rowgroup', rowspan: 3, class: 'task-cell' }, el('span', {}, studyLabel(s)),
          el('small', {}, `${metricLabel(s)} · ${dirWord(s)}`), s.status !== 'complete' ? el('small', { class: 'chip run' }, '进行中') : null));
        const sw = el('i', { class: 'dot' }); sw.style.background = color(a);
        const final = s.bench === 'mle-bench' ? (r.final ? fmt(r.final.value, s) : '待揭晓') : '无独立测试集';
        tr.append(el('td', { class: 'arm-cell' }, sw, a),
          el('td', {}, `${r.rounds}/${s.planned}` + (r.status === 'complete' ? '' : ' · 进行中')),
          el('td', { class: 'num' }, `${fmt(r.baseline, s)} → ${fmt(r.best, s)}`),
          el('td', { class: 'num' }, pct(r.gap)),
          el('td', { class: 'num' }, final),
          el('td', {}, medalText(r.final, s)),
          el('td', { class: 'num' }, r.cost.calls ?? '—'),
          el('td', { class: 'num' }, wan((r.cost.prompt || 0) + (r.cost.completion || 0))));
        tb.append(tr);
      });
    }
    t.append(tb);
  }

  // ---------------------------------------------------------------- task grid
  function renderTaskGrid() {
    const grid = $('#task-grid');
    const seen = new Map();
    for (const s of INDEX.studies) if (!seen.has(s.task_id)) seen.set(s.task_id, INDEX.studies.filter((x) => x.task_id === s.task_id));
    for (const [tid, list] of seen) {
      const info = INDEX.tasks[tid] || {};
      const s = list[0];
      const running = list.some((x) => x.status !== 'complete');
      const prog = running ? ARMS.map((a) => `${a} ${list[0].arms[a] ? list[0].arms[a].rounds : 0}`).join(' · ') + `/${s.planned}` : '';
      grid.append(el('button', { type: 'button', class: 'task-card', 'data-task': tid, on: { click: () => openStudy(s.key, { scroll: true }) } },
        el('span', { class: 'tc-top' }, el('span', { class: 'chip' + (running ? ' run' : '') }, running ? '进行中 ' + prog : '已完成'),
          el('span', { class: 'chip ghost' }, s.bench === 'mle-bench' ? 'MLE-bench' : `NatureBench · ${list.length} 个重复`)),
        el('b', {}, info.name || tid), el('span', { class: 'tc-short' }, info.short || ''),
        el('span', { class: 'tc-metric' }, `${metricLabel(s)} · ${dirWord(s)}`)));
    }
  }

  // ---------------------------------------------------------------- study detail
  async function loadStudy(key) {
    if (!studyCache.has(key)) {
      const res = await fetch(`data/studies/${encodeURIComponent(key)}.json`);
      if (!res.ok) throw new Error('无法加载 ' + key);
      studyCache.set(key, await res.json());
    }
    return studyCache.get(key);
  }

  async function openStudy(key, opts = {}) {
    const summary = INDEX.studies.find((s) => s.key === key);
    if (!summary) return;
    const box = $('#task-detail');
    box.hidden = false;
    for (const c of document.querySelectorAll('.task-card')) c.setAttribute('aria-current', String(c.dataset.task === summary.task_id));
    if (state.key !== key) {
      box.replaceChildren(el('p', { class: 'muted' }, '加载中…'));
      if (opts.scroll) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
      let s;
      try { s = await loadStudy(key); } catch (e) { box.replaceChildren(el('p', { class: 'muted' }, String(e.message))); return; }
      state.key = key; state.arm = null; state.round = null;
      renderStudy(s, summary);
    } else if (opts.scroll) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (opts.arm && opts.round) selectRound(opts.arm, opts.round, { scroll: true, noHash: true });
    else setHash();
  }

  function setHash() {
    if (!state.key) return;
    const h = '#study=' + state.key + (state.arm ? `&arm=${state.arm}&round=${state.round}` : '');
    if (location.hash !== h) history.replaceState(null, '', h);
  }

  function renderStudy(s, summary) {
    const info = INDEX.tasks[s.task_id] || {};
    const box = $('#task-detail');
    const siblings = INDEX.studies.filter((x) => x.task_id === s.task_id);
    const head = el('div', { class: 'td-head' },
      el('div', {}, el('p', { class: 'eyebrow' }, info.source || s.bench), el('h3', { class: 'td-title' }, info.name || s.task_id),
        el('p', { class: 'muted small' }, `任务 ID：${s.task_id}` + (s.status !== 'complete' ? ' · 进行中' : ''))),
      siblings.length > 1 ? el('div', { class: 'seg', role: 'tablist', 'aria-label': '重复' }, siblings.map((x) =>
        el('button', { type: 'button', role: 'tab', 'aria-selected': String(x.key === s.key), on: { click: () => openStudy(x.key) } }, `重复 ${x.replicate}`))) : null);

    const base = summary.baseline_runs;
    const baseTxt = base ? (base.min === base.max
      ? `基线验证分 ${fmt(base.mean, s)}（同一份代码运行 ${base.n} 次，结果一致）。`
      : `基线验证分不稳定：同一份代码运行 ${base.n} 次，在 ${fmt(base.min, s)}–${fmt(base.max, s)} 之间波动（平均 ${fmt(base.mean, s)}）。这说明训练过程不是逐位可复现的，小于这个波动幅度的 Δ 基本无法和噪声区分，“当前最好代码”也可能只是一次运气好的运行。`) : '';
    const split = info.split || (s.bench === 'mle-bench' ? '官方公开训练集一次性切出冻结验证集，每轮反馈只有验证分；官方私有测试集只在 20 轮结束后，对验证分最好的那份代码评一次。' : '');
    const infoBox = el('dl', { class: 'task-info' });
    for (const [k, v] of [['输入', info.input], ['要预测', info.target], ['评分指标', info.metric + (s.metric ? `（数据中的评分器：${s.metric}；${dirWord(s)}）` : '')],
      ['怎样算好', info.good], ['冻结基线', (info.baseline || '') + ' ' + baseTxt], ['验证与反馈', split]]) {
      if (v) infoBox.append(el('dt', {}, k), el('dd', {}, v));
    }

    const finalBox = el('div', { class: 'card final-card' });
    const trajLegend = el('div', { class: 'legend' });
    const trajBox = el('div', { class: 'chart' });
    const detail = el('div', { id: 'round-detail', class: 'round-detail' }, el('p', { class: 'muted' }, '点击轨迹上的任一点，或下表中的任一格，查看那一轮的详情。'));
    const tableWrap = el('div', { class: 'table-wrap' });

    box.replaceChildren(head, infoBox,
      el('h4', { class: 'sub-h' }, '最终结果'), finalBox,
      el('h4', { class: 'sub-h' }, '20 轮轨迹'),
      el('p', { class: 'prose small' }, `纵轴是验证集 ${metricLabel(s)}（${s.direction === 'lower' ? '↓ 越低越好，线往下走表示变好' : '↑ 越高越好，线往上走表示变好'}）。阶梯线 = 该臂截至此轮的“当前最好代码”分数；实心点 = 本轮干预（被选中假设的实现）；空心小圈 = 本轮对照（当前最好代码重跑）；虚线 = 基线。超出纵轴范围的干预画成边缘三角，执行失败画成边缘 ×。点图例可隐藏/显示某一臂。`),
      trajLegend, el('div', { class: 'card chart-card' }, trajBox), detail,
      el('h4', { class: 'sub-h' }, '逐轮表（可点击）'), tableWrap);

    renderFinal(s, summary, finalBox);
    const redraw = () => { legend(trajLegend, { toggle: redraw, extra: legendExtras() }); drawTrajectory(s, summary, trajBox); };
    redraw(); onResize('traj', () => drawTrajectory(s, summary, trajBox));
    renderRoundTable(s, tableWrap);
    box._study = s; box._summary = summary;
  }

  function legendExtras() {
    const mk = (cls, text) => { const sv = svgEl('svg', { width: 14, height: 14, viewBox: '0 0 14 14', class: 'lg-mark' }); sv.append(cls); return el('span', { class: 'muted' }, sv, text); };
    return [
      mk(svgEl('circle', { cx: 7, cy: 7, r: 4.5, fill: css('--ink-3') }), '干预'),
      mk(svgEl('circle', { cx: 7, cy: 7, r: 3.5, fill: 'none', stroke: css('--ink-3'), 'stroke-width': 1.5 }), '对照'),
    ];
  }

  // ---------------------------------------------------------------- final mini chart
  function renderFinal(s, summary, card) {
    const runs = s.runs.filter((r) => r.final);
    const isMle = s.bench === 'mle-bench';
    if (!runs.length) {
      card.append(el('p', { class: 'muted small' }, isMle ? '进行中：测试集分数要等该臂 20 轮全部完成后才评一次。' : '进行中。'));
      return;
    }
    card.append(el('p', { class: 'sub' }, isMle
      ? `官方测试集 ${metricLabel(s)}（${dirWord(s)}），每臂只对验证集最优的代码评一次；竖线为该比赛 Kaggle 排行榜的奖牌线/中位线（仅作参照）。`
      : 'mean_g（20 轮在线反馈中见过的最好值；没有独立测试集），0 = 与论文参照持平。'));
    const chart = el('div', { class: 'chart' });
    card.append(chart);
    const draw = () => {
      const W = Math.max(280, chart.clientWidth), rowH = 30, top = 24, left = 30, right = 20, H = top + rowH * runs.length + 26;
      const vals = runs.map((r) => r.final.value);
      let lo = Math.min(...vals), hi = Math.max(...vals);
      const th = summary.thresholds, refs = [];
      if (isMle && th) {
        for (const [k, name] of [['median', '中位'], ['bronze', '铜'], ['silver', '银'], ['gold', '金']]) if (th[k] != null) refs.push({ v: th[k], name });
        const span = (hi - lo) || Math.abs(hi) * 0.05 || 0.01;
        for (const r of refs) if ((r.v >= lo - span * 1.5) && (r.v <= hi + span * 1.5)) { lo = Math.min(lo, r.v); hi = Math.max(hi, r.v); }
      }
      if (!isMle) { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
      const pad = (hi - lo) * 0.1 || Math.abs(hi) * 0.05 || 0.01;
      lo -= pad; hi += pad;
      const x = (v) => left + (v - lo) / (hi - lo) * (W - left - right);
      const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': `${studyLabel(s)} 最终分数` });
      const ticks = niceTicks(lo, hi, W < 420 ? 3 : 5);
      for (const t of ticks) {
        svg.append(svgEl('line', { class: 'gridline', x1: x(t), x2: x(t), y1: top, y2: top + rowH * runs.length }));
        svg.append(svgEl('text', { x: x(t), y: H - 6, 'text-anchor': 'middle' }, tickFmt(t, ticks)));
      }
      let last = -1e9;
      for (const r of refs.filter((r) => r.v >= lo && r.v <= hi).sort((a, b) => a.v - b.v)) {
        svg.append(svgEl('line', { class: 'thresh', x1: x(r.v), x2: x(r.v), y1: top - 6, y2: top + rowH * runs.length }));
        if (x(r.v) - last < 26) continue;
        svg.append(svgEl('text', { x: x(r.v), y: top - 10, 'text-anchor': 'middle' }, r.name));
        last = x(r.v);
      }
      runs.forEach((run, i) => {
        const cy = top + rowH * i + rowH / 2, cx = x(run.final.value);
        svg.append(svgEl('text', { class: 'lab', x: 0, y: cy + 4 }, run.arm));
        svg.append(svgEl('line', { class: 'gridline', x1: left, x2: W - right, y1: cy, y2: cy }));
        svg.append(svgEl('circle', { class: 'dot', cx, cy, r: 6, fill: color(run.arm) }));
        const anchor = cx > W - 110 ? 'end' : 'start';
        const medal = isMle && run.final.medal ? ' ' + MEDAL[run.final.medal] : '';
        svg.append(svgEl('text', { class: 'val', x: cx + (anchor === 'end' ? -10 : 10), y: cy - 7, 'text-anchor': anchor }, fmt(run.final.value, s) + medal));
        const hit = svgEl('rect', { x: left, y: cy - rowH / 2, width: W - left - right, height: rowH, fill: 'transparent' });
        hit.addEventListener('mousemove', (e) => {
          const rows = [{ arm: run.arm, value: fmt(run.final.value, s), label: isMle ? '测试集' : 'mean_g 在线最优' }];
          if (isMle) {
            rows.push({ value: medalText(run.final, s), label: '' });
            if (th) rows.push({ value: ['gold', 'silver', 'bronze', 'median'].map((k) => `${{ gold: '金', silver: '银', bronze: '铜', median: '中位' }[k]} ${fmt(th[k], s)}`).join(' · '), label: '' });
          }
          showTip(e.clientX, e.clientY, ARM_NAME[run.arm], rows);
        });
        hit.addEventListener('mouseleave', hideTip);
        svg.append(hit);
      });
      chart.replaceChildren(svg);
    };
    draw(); onResize('final', draw);
    if (isMle) {
      const tbl = el('table', { class: 'mini-table' }, el('thead', {}, el('tr', {}, ['臂', '验证集最优', '测试集', '奖牌'].map((h) => el('th', {}, h)))),
        el('tbody', {}, runs.map((r) => el('tr', {}, el('td', {}, r.arm), el('td', { class: 'num' }, fmt(summary.arms[r.arm].best, s)),
          el('td', { class: 'num' }, fmt(r.final.value, s)), el('td', {}, medalText(r.final, s))))));
      card.append(el('details', { class: 'table-view' }, el('summary', {}, '数据表'), tbl,
        summary.thresholds ? el('p', { class: 'muted small' }, '排行榜阈值：' + ['gold', 'silver', 'bronze', 'median'].map((k) => `${{ gold: '金', silver: '银', bronze: '铜', median: '中位线' }[k]} ${fmt(summary.thresholds[k], s)}`).join('，')) : null));
    }
  }

  // ---------------------------------------------------------------- trajectory chart
  function drawTrajectory(s, summary, box) {
    const W = Math.max(300, box.clientWidth), H = W < 520 ? 270 : 340;
    const m = { l: W < 520 ? 50 : 62, r: 14, t: 14, b: 36 };
    const N = s.planned;
    const runs = s.runs.filter((r) => state.visible[r.arm]);
    const vals = [];
    for (const r of s.runs) for (const d of r.rounds) { if (d.inc != null) vals.push(d.inc); if (d.ctl != null) vals.push(d.ctl); }
    const base = summary.baseline_runs;
    if (base) vals.push(base.min, base.max);
    if (!vals.length) { box.replaceChildren(el('p', { class: 'muted' }, '尚无已完成的轮次。')); return; }
    let lo = Math.min(...vals), hi = Math.max(...vals);
    const span = (hi - lo) || Math.abs(hi) * 0.02 || 0.01;
    lo -= span * 0.35; hi += span * 0.35;
    const ticks = niceTicks(lo, hi, H < 300 ? 4 : 5);
    const plotW = W - m.l - m.r, plotH = H - m.t - m.b;
    const x = (i) => m.l + (N > 1 ? (i - 1) / (N - 1) : 0.5) * plotW;
    const y = (v) => m.t + (1 - (v - lo) / (hi - lo)) * plotH;
    const worseY = s.direction === 'lower' ? m.t + 4 : m.t + plotH - 4;
    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img',
      'aria-label': `${studyLabel(s)}：三臂每轮验证分轨迹。详细数值见下方逐轮表。` });
    for (const t of ticks) {
      if (t < lo || t > hi) continue;
      svg.append(svgEl('line', { class: 'gridline', x1: m.l, x2: W - m.r, y1: y(t), y2: y(t) }));
      svg.append(svgEl('text', { x: m.l - 6, y: y(t) + 4, 'text-anchor': 'end' }, tickFmt(t, ticks)));
    }
    svg.append(svgEl('line', { class: 'axis', x1: m.l, x2: W - m.r, y1: m.t + plotH, y2: m.t + plotH }));
    const step = W < 520 ? 5 : (N > 10 ? 2 : 1);
    for (let i = 1; i <= N; i++) if (i === 1 || i % step === 0) svg.append(svgEl('text', { x: x(i), y: H - 18, 'text-anchor': 'middle' }, i));
    svg.append(svgEl('text', { class: 'lab', x: W - m.r, y: H - 2, 'text-anchor': 'end' }, '轮次 →'));
    svg.append(svgEl('text', { class: 'lab', x: 2, y: m.t - 2 + 0, 'text-anchor': 'start' }, ''));
    if (base) {
      svg.append(svgEl('line', { class: 'baseline', x1: m.l, x2: W - m.r, y1: y(base.mean), y2: y(base.mean) }));
      svg.append(svgEl('text', { x: W - m.r - 2, y: y(base.mean) - 4, 'text-anchor': 'end' }, '基线'));
    }
    const colW = plotW / Math.max(1, N - 1);
    const dx = Math.min(4, colW * 0.18);
    const off = { A: -dx, B: 0, C: dx };
    const pts = [];
    for (const r of runs) {
      const c = color(r.arm);
      const rs = r.rounds.filter((d) => d.inc != null);
      if (rs.length) {
        let d = `M${x(rs[0].i)},${y(rs[0].inc)}`;
        for (let k = 1; k < rs.length; k++) d += ` H${x(rs[k].i)} V${y(rs[k].inc)}`;
        svg.append(svgEl('path', { class: 'line', d, stroke: c }));
        const lastR = rs[rs.length - 1];
        if (W >= 520) svg.append(svgEl('text', { class: 'val', x: Math.min(x(lastR.i) + 6, W - m.r - 2), y: y(lastR.inc) - 6, 'text-anchor': x(lastR.i) > W - 40 ? 'end' : 'start' }, r.arm));
      }
    }
    for (const r of runs) {
      const c = color(r.arm);
      for (const d of r.rounds) {
        const cx = x(d.i) + off[r.arm];
        if (d.ctl != null) svg.append(svgEl('circle', { cx, cy: y(d.ctl), r: 3.2, fill: css('--raised'), stroke: c, 'stroke-width': 1.5 }));
        let py;
        if (d.itv == null) {
          py = worseY;
          svg.append(svgEl('path', { d: `M${cx - 4},${py - 4} L${cx + 4},${py + 4} M${cx + 4},${py - 4} L${cx - 4},${py + 4}`, stroke: c, 'stroke-width': 2, 'stroke-linecap': 'round' }));
        } else if (d.itv < lo || d.itv > hi) {
          const up = d.itv > hi; py = up ? m.t + 5 : m.t + plotH - 5;
          svg.append(svgEl('path', { d: up ? `M${cx},${py - 5} L${cx + 5},${py + 4} L${cx - 5},${py + 4} Z` : `M${cx},${py + 5} L${cx + 5},${py - 4} L${cx - 5},${py - 4} Z`, fill: c, stroke: css('--raised'), 'stroke-width': 1.5 }));
        } else {
          py = y(d.itv);
          svg.append(svgEl('circle', { class: 'dot', cx, cy: py, r: 4.6, fill: c }));
        }
        pts.push({ arm: r.arm, i: d.i, y: py, cx });
        if (state.arm === r.arm && state.round === d.i) svg.append(svgEl('circle', { cx, cy: py, r: 9, fill: 'none', stroke: css('--ink'), 'stroke-width': 1.5 }));
      }
    }
    // hover / click columns
    const cross = svgEl('line', { class: 'cross', y1: m.t, y2: m.t + plotH, visibility: 'hidden' });
    svg.append(cross);
    for (let i = 1; i <= N; i++) {
      const rect = svgEl('rect', { x: x(i) - colW / 2, y: m.t, width: colW, height: plotH, fill: 'transparent', style: 'cursor:pointer' });
      const rowsFor = () => s.runs.filter((r) => state.visible[r.arm]).map((r) => {
        const d = r.rounds.find((q) => q.i === i);
        if (!d) return { arm: r.arm, value: '—', label: `${r.arm} 尚未执行` };
        const di = deltaInfo(s, d);
        const itv = d.itv == null ? (ST[d.itv_st] || '失败') : fmt(d.itv, s);
        return { arm: r.arm, value: `对照 ${fmt(d.ctl, s)} → 干预 ${itv}`, label: `${di ? di.word : ''} · ${EV[d.ev] || '—'}` };
      });
      rect.addEventListener('mousemove', (e) => {
        cross.setAttribute('x1', x(i)); cross.setAttribute('x2', x(i)); cross.setAttribute('visibility', 'visible');
        showTip(e.clientX, e.clientY, `第 ${i} 轮 · 点击查看详情`, rowsFor());
      });
      rect.addEventListener('mouseleave', () => { cross.setAttribute('visibility', 'hidden'); hideTip(); });
      rect.addEventListener('click', (e) => {
        const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
        const cand = pts.filter((p) => p.i === i);
        if (!cand.length) return;
        cand.sort((a, b) => Math.abs(a.y - loc.y) - Math.abs(b.y - loc.y));
        hideTip();
        selectRound(cand[0].arm, i, { scroll: true });
      });
      svg.append(rect);
    }
    box.replaceChildren(svg);
  }

  // ---------------------------------------------------------------- round table
  function renderRoundTable(s, wrap) {
    const N = s.planned;
    const t = el('table', { class: 'round-table' });
    t.append(el('thead', {}, el('tr', {}, el('th', { scope: 'col' }, '轮'), ARMS.map((a) => {
      const sw = el('i', { class: 'dot' }); sw.style.background = color(a);
      return el('th', { scope: 'col' }, sw, ARM_NAME[a]);
    }))));
    const tb = el('tbody');
    for (let i = 1; i <= N; i++) {
      const tr = el('tr', {}, el('th', { scope: 'row' }, i));
      for (const a of ARMS) {
        const run = s.runs.find((r) => r.arm === a);
        const d = run && run.rounds.find((q) => q.i === i);
        if (!d) { tr.append(el('td', { class: 'muted' }, '—')); continue; }
        const sel = d.cands.find((c) => c.id === d.sel);
        const di = deltaInfo(s, d);
        const dtxt = di ? `${di.word} ${sign(di.d, s)}` : (ST[d.itv_st] || '未得分');
        tr.append(el('td', {}, el('button', { type: 'button', class: 'rt-cell', 'data-arm': a, 'data-round': i, on: { click: () => selectRound(a, i, { scroll: true }) } },
          el('span', { class: 'rt-top' }, evBadge(d.ev), el('span', { class: 'rt-d ' + (di ? (di.same ? '' : di.improved ? 'delta-good' : 'delta-bad') : 'delta-bad') }, dtxt)),
          el('span', { class: 'rt-title' }, sel ? sel.t : '—'))));
      }
      tb.append(tr);
    }
    t.append(tb);
    wrap.replaceChildren(t);
  }

  // ---------------------------------------------------------------- round detail
  function selectRound(arm, i, opts = {}) {
    const box = $('#task-detail');
    const s = box._study, summary = box._summary;
    if (!s) return;
    const run = s.runs.find((r) => r.arm === arm);
    const d = run && run.rounds.find((q) => q.i === i);
    if (!d) return;
    state.arm = arm; state.round = i;
    if (!state.visible[arm]) state.visible[arm] = true;
    const panel = $('#round-detail');
    const di = deltaInfo(s, d);
    const sw = el('i', { class: 'dot' }); sw.style.background = color(arm);
    const nav = el('div', { class: 'rd-nav' },
      el('button', { type: 'button', disabled: !run.rounds.find((q) => q.i === i - 1), on: { click: () => selectRound(arm, i - 1) } }, '← 上一轮'),
      el('div', { class: 'seg' }, ARMS.map((a) => {
        const has = s.runs.find((r) => r.arm === a)?.rounds.find((q) => q.i === i);
        const k = el('i', { class: 'dot' }); k.style.background = color(a);
        return el('button', { type: 'button', 'aria-selected': String(a === arm), disabled: !has, on: { click: () => selectRound(a, i) } }, k, a);
      })),
      el('button', { type: 'button', disabled: !run.rounds.find((q) => q.i === i + 1), on: { click: () => selectRound(arm, i + 1) } }, '下一轮 →'));
    const who = arm === 'A' ? 'AI 自己选择' : arm === 'B' ? 'Claude 代人类点选' : 'Claude 写批评后，AI 选择';
    const itvTxt = d.itv == null ? `未得分（${ST[d.itv_st] || d.itv_st || '失败'}）` : fmt(d.itv, s);
    const scores = el('div', { class: 'rd-scores' },
      el('div', {}, el('span', {}, '对照（当前最好代码）'), el('b', {}, fmt(d.ctl, s))),
      el('div', {}, el('span', {}, '干预（被选假设）'), el('b', {}, itvTxt)),
      el('div', {}, el('span', {}, `Δ = 干预 − 对照（${dirWord(s)}）`), el('b', { class: di ? (di.same ? '' : di.improved ? 'delta-good' : 'delta-bad') : '' }, di ? `${sign(di.d, s)}（${di.word}）` : '—')),
      el('div', {}, el('span', {}, '本轮后的当前最好'), el('b', {}, fmt(d.inc, s))),
      el('div', {}, el('span', {}, '证据判定'), evBadge(d.ev)));
    const cands = el('ol', { class: 'cands' }, d.cands.map((c, k) => {
      const isSel = c.id === d.sel;
      return el('li', { class: 'cand' + (isSel ? ' sel' : '') },
        el('div', { class: 'cand-h' }, el('span', { class: 'cand-n' }, `候选 ${k + 1}`), isSel ? el('span', { class: 'chip sel' }, `✓ 被选中 · ${who}`) : null),
        el('div', { class: 't' }, c.t), el('div', { class: 'c' }, c.c),
        c.x ? el('details', {}, el('summary', {}, '实验设计'), el('p', { class: 'c' }, c.x)) : null);
    }));
    const blocks = [];
    if (arm === 'C' && d.critique) blocks.push(el('div', { class: 'block critique' }, el('b', {}, 'Claude（代人类）的批评意见'), el('p', {}, d.critique)));
    if (arm === 'C' && !d.critique) blocks.push(el('div', { class: 'block' }, el('b', {}, 'Claude（代人类）的批评意见'), el('p', { class: 'muted' }, '本轮未留下批评文字。')));
    if (arm === 'B') blocks.push(el('div', { class: 'block' }, el('b', {}, '选择方式'), el('p', {}, 'Claude 代人类直接点选了上面标记的候选。B 臂接口只接受候选编号，不附任何文字理由。')));
    if (d.reason) blocks.push(el('div', { class: 'block' }, el('b', {}, arm === 'C' ? 'AI 读完批评后的选择理由' : 'AI 的选择理由'), el('p', {}, d.reason)));
    if (d.interp) blocks.push(el('div', { class: 'block' }, el('b', {}, 'AI 对结果的解读'), el('p', {}, d.interp)));
    if (d.next) blocks.push(el('div', { class: 'block' }, el('b', {}, 'AI 建议的下一步'), el('p', {}, d.next)));
    if (i === 1) blocks.push(el('p', { class: 'muted small' }, '第 1 轮的 3 个候选由三臂共享（只生成一次），各臂展示顺序不同。'));
    panel.replaceChildren(
      el('div', { class: 'rd-head' }, el('h4', {}, sw, `第 ${i} 轮 · ${ARM_NAME[arm]}`), nav),
      scores, el('h5', {}, '本轮的 3 个候选假设（按决策者看到的顺序）'), cands, ...blocks);
    panel.classList.add('open');
    for (const b of document.querySelectorAll('.rt-cell')) b.setAttribute('aria-current', String(b.dataset.arm === arm && +b.dataset.round === i));
    const trajBox = $('#task-detail .chart-card .chart');
    if (trajBox) drawTrajectory(s, summary, trajBox);
    if (!opts.noHash) setHash(); else setHash();
    if (opts.scroll) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---------------------------------------------------------------- docs (takeaways / disclosures)
  function renderBlocks(target, blocks) {
    for (const b of blocks || []) {
      if (b.h) target.append(el('h3', {}, b.h));
      if (b.p) target.append(el('p', { class: 'prose' }, b.p));
      if (b.ul) target.append(list(b.ul));
    }
    function list(items) {
      return el('ul', { class: 'prose-list' }, items.map((it) => typeof it === 'string' ? el('li', {}, it) : el('li', {}, it.text || '', it.ul ? list(it.ul) : null)));
    }
  }
  async function renderDoc(file, target) {
    try {
      const res = await fetch(file, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      const doc = await res.json();
      target.replaceChildren();
      if (doc.status === 'placeholder') target.append(el('div', { class: 'notice placeholder', role: 'note' }, el('strong', {}, doc.note || '待更新'), doc.updated ? ` · 最后更新 ${doc.updated}` : ''));
      else if (doc.updated) target.append(el('p', { class: 'muted small' }, `最后更新：${doc.updated}`));
      renderBlocks(target, doc.blocks);
    } catch (e) {
      target.replaceChildren(el('p', { class: 'muted' }, '内容暂缺。'));
    }
  }

  // ---------------------------------------------------------------- routing
  function route() {
    const h = location.hash.slice(1);
    if (!h.startsWith('study=')) return;
    const p = new URLSearchParams(h);
    const key = p.get('study');
    const arm = p.get('arm'), round = +p.get('round');
    if (key) openStudy(key, { scroll: true, arm: ARMS.includes(arm) ? arm : null, round: round || null });
  }

  async function main() {
    const res = await fetch('data/index.json', { cache: 'no-cache' });
    INDEX = await res.json();
    renderFacts();
    renderOverviewChart();
    renderOverviewTable();
    renderTaskGrid();
    $('#generated').textContent = INDEX.generated ? INDEX.generated.replace('T', ' ').slice(0, 16) + ' UTC' : '—';
    const lim = $('#limitations');
    for (const l of INDEX.limitations || []) lim.append(el('li', {}, l));
    renderDoc('takeaways.json', $('#takeaways-body'));
    renderDoc('disclosures.json', $('#disclosures-body'));
    window.addEventListener('hashchange', route);
    route();
  }
  main().catch((e) => {
    console.error(e);
    document.querySelector('main').prepend(el('p', { class: 'notice' }, '数据加载失败：' + e.message));
  });
})();
