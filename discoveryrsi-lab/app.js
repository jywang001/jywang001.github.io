(() => {
  'use strict';
  const ARMS = ['A', 'B', 'C'];
  const ARM_NAME = { A: 'A · AI 自主', B: 'B · 人类选择', C: 'C · 人类批评 → AI 选择' };
  const EV = {
    preliminary_support: '初步支持', not_supported: '不支持',
    inconclusive: '不确定', implementation_mismatch: '实现与假设不符',
  };
  const NS = 'http://www.w3.org/2000/svg';
  const $ = (s) => document.querySelector(s);
  const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const color = (arm) => css('--' + arm);

  function el(tag, attrs = {}, text) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (text != null) n.textContent = text;
    return n;
  }
  function svgEl(tag, attrs = {}, text) {
    const n = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (text != null) n.textContent = text;
    return n;
  }
  function fmt(v, s) {
    if (v == null) return '—';
    const d = s && s.bench === 'mle-bench' ? 5 : 4;
    return Number(v).toFixed(d);
  }
  function studyLabel(s) {
    return s.bench === 'mle-bench' ? s.name : `${s.name} · 重复 ${s.replicate}`;
  }
  function niceTicks(lo, hi, n = 4) {
    const span = hi - lo || Math.abs(hi) || 1;
    const step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step0);
    const out = [];
    for (let t = Math.ceil(lo / step) * step; t <= hi + step * 1e-9; t += step) out.push(+t.toFixed(10));
    return out;
  }
  function tickFmt(t, ticks) {
    const step = ticks.length > 1 ? Math.abs(ticks[1] - ticks[0]) : 1;
    const d = Math.max(0, Math.min(5, -Math.floor(Math.log10(step)) + (step / Math.pow(10, Math.floor(Math.log10(step))) % 1 ? 1 : 0)));
    return t.toFixed(d);
  }

  // Tooltip -------------------------------------------------------------
  const tip = $('#tooltip');
  function showTip(x, y, head, rows) {
    tip.replaceChildren(el('div', { class: 'h' }, head));
    for (const r of rows) {
      const row = el('div', { class: 'r' });
      if (r.arm) { const i = el('i'); i.style.background = color(r.arm); row.append(i); }
      row.append(el('b', {}, r.value), el('span', {}, r.label));
      tip.append(row);
    }
    tip.hidden = false;
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.min(window.innerWidth - w - 8, x + 14) + 'px';
    tip.style.top = Math.max(8, y - h - 10) + 'px';
  }
  const hideTip = () => { tip.hidden = true; };

  function legend(target, kind) {
    const box = $(target);
    for (const a of ARMS) {
      const s = el('span'); const i = el('i', kind === 'dot' ? { class: 'dot' } : {});
      i.style.background = color(a); s.append(i, document.createTextNode(ARM_NAME[a])); box.append(s);
    }
  }

  // Final-result dot plot ------------------------------------------------
  function finalChart(s) {
    const card = el('div', { class: 'card' });
    card.append(el('h4', {}, studyLabel(s)));
    const dirTxt = s.direction === 'lower' ? '越低越好 ←' : '越高越好 →';
    card.append(el('p', { class: 'sub' }, `${s.bench === 'mle-bench' ? '官方测试集 ' + s.metric + ' · 竖线为排行榜奖牌/中位线' : 'mean_g（在线反馈最优）'} · ${dirTxt}`));
    const W = 340, rowH = 30, top = 22, left = 34, right = 16, H = top + rowH * 3 + 26;
    const vals = s.runs.map((r) => r.final.value);
    let lo = Math.min(...vals), hi = Math.max(...vals);
    const th = s.runs[0].final.thresholds;
    const refs = [];
    if (th) {
      for (const [k, name] of [['median', '中位线'], ['bronze', '铜'], ['silver', '银'], ['gold', '金']]) {
        if (th[k] != null) refs.push({ v: th[k], name });
      }
      // include thresholds only if they are near the data range, so the dots keep resolution
      const span = hi - lo || Math.abs(hi) * 0.05;
      for (const r of refs) if (Math.abs(r.v - (r.v < lo ? lo : hi)) < span * 1.5 || (r.v >= lo && r.v <= hi)) { lo = Math.min(lo, r.v); hi = Math.max(hi, r.v); }
    }
    if (s.bench !== 'mle-bench') lo = Math.min(lo, 0);
    const pad = (hi - lo) * 0.08 || Math.abs(hi) * 0.05 || 0.01;
    lo -= pad; hi += pad;
    const x = (v) => left + (v - lo) / (hi - lo) * (W - left - right);
    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': `${studyLabel(s)} 最终分数` });
    const ticks = niceTicks(lo, hi, 4);
    for (const t of ticks) {
      svg.append(svgEl('line', { class: 'gridline', x1: x(t), x2: x(t), y1: top, y2: top + rowH * 3 }));
      svg.append(svgEl('text', { x: x(t), y: H - 6, 'text-anchor': 'middle' }, tickFmt(t, ticks)));
    }
    let lastLabel = -1e9;
    for (const r of refs.filter((r) => r.v >= lo && r.v <= hi).sort((a, b) => x(a.v) - x(b.v))) {
      svg.append(svgEl('line', { class: 'thresh', x1: x(r.v), x2: x(r.v), y1: top - 6, y2: top + rowH * 3 }));
      if (x(r.v) - lastLabel < 30) continue;  // skip colliding threshold labels; the table/tooltip keep them
      svg.append(svgEl('text', { x: x(r.v), y: top - 10, 'text-anchor': 'middle' }, r.name));
      lastLabel = x(r.v);
    }
    s.runs.forEach((run, i) => {
      const cy = top + rowH * i + rowH / 2, cx = x(run.final.value);
      svg.append(svgEl('text', { class: 'lab', x: 0, y: cy + 4 }, run.arm));
      svg.append(svgEl('line', { class: 'axis', x1: left, x2: W - right, y1: cy, y2: cy, 'stroke-opacity': 0.5 }));
      const dot = svgEl('circle', { class: 'dot', cx, cy, r: 6, fill: color(run.arm) });
      svg.append(dot);
      const anchor = cx > W - 90 ? 'end' : 'start';
      const medal = run.final.medal ? { gold: ' 金', silver: ' 银', bronze: ' 铜' }[run.final.medal] : '';
      svg.append(svgEl('text', { class: 'val', x: cx + (anchor === 'end' ? -10 : 10), y: cy - 8, 'text-anchor': anchor }, fmt(run.final.value, s) + medal));
      const hit = svgEl('rect', { x: left, y: cy - rowH / 2, width: W - left - right, height: rowH, fill: 'transparent', tabindex: 0 });
      const rows = [{ arm: run.arm, value: fmt(run.final.value, s), label: ARM_NAME[run.arm] }];
      if (run.final.validation != null) rows.push({ value: fmt(run.final.validation, s), label: '对应验证集分数' });
      if (run.final.medal || run.final.above_median != null) rows.push({ value: run.final.medal ? { gold: '金牌线', silver: '银牌线', bronze: '铜牌线' }[run.final.medal] : (run.final.above_median ? '高于中位' : '低于中位'), label: '排行榜参照' });
      const on = (e) => { const b = hit.getBoundingClientRect(); showTip(e.clientX ?? b.left + b.width / 2, e.clientY ?? b.top, studyLabel(s), rows); };
      hit.addEventListener('pointermove', on); hit.addEventListener('focus', on);
      hit.addEventListener('pointerleave', hideTip); hit.addEventListener('blur', hideTip);
      svg.append(hit);
    });
    card.append(svg);
    return card;
  }

  function finalTable(studies) {
    const t = el('table');
    const head = el('tr');
    for (const h of ['任务', '指标', 'A', 'B', 'C', '说明']) head.append(el('th', {}, h));
    t.append(head);
    for (const s of studies) {
      const tr = el('tr');
      tr.append(el('td', {}, studyLabel(s)), el('td', {}, `${s.metric}（${s.direction === 'lower' ? '低好' : '高好'}）`));
      for (const r of s.runs) {
        const m = r.final.medal ? { gold: ' 金', silver: ' 银', bronze: ' 铜' }[r.final.medal] : '';
        tr.append(el('td', {}, fmt(r.final.value, s) + m));
      }
      tr.append(el('td', {}, s.bench === 'mle-bench' ? '官方私有测试集，仅评一次' : '在线反馈最优（无独立测试集）'));
      t.append(tr);
    }
    return t;
  }

  // Incumbent curves ------------------------------------------------------
  function curveChart(s) {
    const card = el('div', { class: 'card' });
    card.append(el('h4', {}, studyLabel(s)));
    card.append(el('p', { class: 'sub' }, `${s.bench === 'mle-bench' ? '验证集 ' + s.metric : 'mean_g'} · ${s.direction === 'lower' ? '越低越好' : '越高越好'}`));
    const W = 340, H = 190, top = 10, left = 46, right = 14, bottom = 24;
    const n = Math.max(...s.runs.map((r) => r.rounds.length));
    const series = s.runs.map((r) => ({ arm: r.arm, pts: r.rounds.map((d) => d.incumbent) }));
    const all = series.flatMap((p) => p.pts).filter((v) => v != null);
    let lo = Math.min(...all), hi = Math.max(...all);
    const pad = (hi - lo) * 0.08 || 0.01; lo -= pad; hi += pad;
    const x = (i) => left + i / (n - 1) * (W - left - right);
    const y = (v) => top + (hi - v) / (hi - lo) * (H - top - bottom);
    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': `${studyLabel(s)} 迭代曲线` });
    const ticks = niceTicks(lo, hi, 4);
    for (const t of ticks) {
      if (t < lo || t > hi) continue;
      svg.append(svgEl('line', { class: 'gridline', x1: left, x2: W - right, y1: y(t), y2: y(t) }));
      svg.append(svgEl('text', { x: left - 6, y: y(t) + 4, 'text-anchor': 'end' }, tickFmt(t, ticks)));
    }
    svg.append(svgEl('line', { class: 'axis', x1: left, x2: W - right, y1: H - bottom, y2: H - bottom }));
    for (const i of [0, 4, 9, 14, 19]) if (i < n) svg.append(svgEl('text', { x: x(i), y: H - 6, 'text-anchor': 'middle' }, String(i + 1)));
    for (const p of series) {
      const d = p.pts.map((v, i) => (v == null ? null : `${x(i)},${y(v)}`)).filter(Boolean);
      svg.append(svgEl('polyline', { class: 'line', points: d.join(' '), stroke: color(p.arm) }));
      const last = p.pts.length - 1;
      if (p.pts[last] != null) svg.append(svgEl('circle', { class: 'dot', cx: x(last), cy: y(p.pts[last]), r: 4, fill: color(p.arm) }));
    }
    const cross = svgEl('line', { class: 'cross', y1: top, y2: H - bottom, visibility: 'hidden' });
    svg.append(cross);
    const hit = svgEl('rect', { x: left, y: top, width: W - left - right, height: H - top - bottom, fill: 'transparent', tabindex: 0 });
    let focusIdx = n - 1;
    const show = (i, cx, cy) => {
      cross.setAttribute('x1', x(i)); cross.setAttribute('x2', x(i)); cross.setAttribute('visibility', 'visible');
      const rows = series.map((p) => ({ arm: p.arm, value: fmt(p.pts[i], s), label: ARM_NAME[p.arm] }));
      showTip(cx, cy, `第 ${i + 1} 轮 · 截至此轮最好`, rows);
    };
    hit.addEventListener('pointermove', (e) => {
      const b = svg.getBoundingClientRect();
      const px = (e.clientX - b.left) / b.width * W;
      focusIdx = Math.max(0, Math.min(n - 1, Math.round((px - left) / (W - left - right) * (n - 1))));
      show(focusIdx, e.clientX, e.clientY);
    });
    hit.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      focusIdx = Math.max(0, Math.min(n - 1, focusIdx + (e.key === 'ArrowRight' ? 1 : -1)));
      const b = svg.getBoundingClientRect(); show(focusIdx, b.left + x(focusIdx) / W * b.width, b.top + 20); e.preventDefault();
    });
    hit.addEventListener('focus', () => { const b = svg.getBoundingClientRect(); show(focusIdx, b.left + x(focusIdx) / W * b.width, b.top + 20); });
    const leave = () => { cross.setAttribute('visibility', 'hidden'); hideTip(); };
    hit.addEventListener('pointerleave', leave); hit.addEventListener('blur', leave);
    svg.append(hit);
    card.append(svg);
    const det = el('details', { class: 'table-view' }); det.append(el('summary', {}, '数据表'));
    const t = el('table'); const h = el('tr'); h.append(el('th', {}, '轮'));
    for (const p of series) h.append(el('th', {}, p.arm));
    t.append(h);
    for (let i = 0; i < n; i++) {
      const tr = el('tr'); tr.append(el('td', {}, String(i + 1)));
      for (const p of series) tr.append(el('td', {}, fmt(p.pts[i], s)));
      t.append(tr);
    }
    det.append(t); card.append(det);
    return card;
  }

  // Round explorer --------------------------------------------------------
  let DATA, current = { study: 0, arm: 'B' };
  function evBadge(status) {
    return el('span', { class: 'ev', 'data-ev': status || 'none' }, EV[status] || '无判定');
  }
  function renderStrips() {
    const s = DATA.studies[current.study];
    const box = $('#strips'); box.replaceChildren();
    const lg = el('div', { class: 'ev-legend' });
    for (const k of Object.keys(EV)) lg.append(evBadge(k));
    box.append(lg);
    for (const run of s.runs) {
      const row = el('div', { class: 'strip' });
      const name = el('span'); const k = el('span', { class: 'key', 'data-arm': run.arm });
      name.append(k, document.createTextNode(ARM_NAME[run.arm]));
      const cells = el('div', { class: 'cells' });
      for (const r of run.rounds) {
        const c = el('button', { class: 'cell', 'data-ev': r.evidence_status || 'none', 'aria-label': `${run.arm} 第 ${r.index} 轮：${EV[r.evidence_status] || '无判定'}` }, String(r.index));
        c.addEventListener('click', () => { current.arm = run.arm; renderRounds(r.index); });
        const on = (e) => { const b = c.getBoundingClientRect(); showTip(e.clientX ?? b.left, e.clientY ?? b.top, `${ARM_NAME[run.arm]} · 第 ${r.index} 轮`, [{ value: EV[r.evidence_status] || '无判定', label: '' }, { value: fmt(r.control, s) + ' → ' + fmt(r.intervention, s), label: '对照 → 干预' }]); };
        c.addEventListener('pointermove', on); c.addEventListener('focus', on);
        c.addEventListener('pointerleave', hideTip); c.addEventListener('blur', hideTip);
        cells.append(c);
      }
      row.append(name, cells); box.append(row);
    }
  }
  function renderSeg() {
    const seg = $('#arm-seg'); seg.replaceChildren();
    for (const a of ARMS) {
      const b = el('button', { role: 'tab', 'aria-selected': String(a === current.arm) });
      b.append(el('span', { class: 'key', 'data-arm': a }), document.createTextNode(ARM_NAME[a]));
      b.addEventListener('click', () => { current.arm = a; renderRounds(); });
      seg.append(b);
    }
  }
  function renderRounds(jump) {
    renderSeg();
    const s = DATA.studies[current.study];
    const run = s.runs.find((r) => r.arm === current.arm);
    const box = $('#rounds'); box.replaceChildren();
    const better = (d) => (s.direction === 'lower' ? d < 0 : d > 0);
    for (const r of run.rounds) {
      const card = el('article', { class: 'round', id: `round-${run.arm}-${r.index}` });
      const head = el('div', { class: 'round-head' });
      head.append(el('h4', {}, `第 ${r.index} 轮`), evBadge(r.evidence_status));
      const sc = el('div', { class: 'scores' });
      sc.append(document.createTextNode('对照 '), el('b', {}, fmt(r.control, s)), document.createTextNode(' → 干预 '), el('b', {}, r.intervention == null ? (r.intervention_status || '失败') : fmt(r.intervention, s)));
      if (r.control != null && r.intervention != null) {
        const d = r.intervention - r.control;
        sc.append(document.createTextNode(' '), el('span', { class: better(d) ? 'delta-good' : d === 0 ? '' : 'delta-bad' }, `（${d >= 0 ? '+' : ''}${fmt(d, s)}）`));
      }
      head.append(sc);
      card.append(head);
      if (r.critique) {
        const p = el('p', { class: 'block' }); p.append(el('b', {}, '批评（Claude 代人类）：'), document.createTextNode(r.critique)); card.append(p);
      }
      const cands = el('div', { class: 'cands' });
      for (const c of r.candidates) {
        const sel = c.id === r.selected_id;
        const d = el('div', { class: 'cand' + (sel ? ' sel' : '') });
        const t = el('div'); t.append(el('span', { class: 't' }, c.title));
        if (sel) t.append(el('span', { class: 'tag' }, `✓ 被选中 · ${r.actor}`));
        d.append(t, el('div', { class: 'c' }, c.claim)); cands.append(d);
      }
      card.append(cands);
      if (r.reason) { const p = el('p', { class: 'block' }); p.append(el('b', {}, '选择理由：'), document.createTextNode(r.reason)); card.append(p); }
      if (r.interpretation) { const p = el('p', { class: 'block' }); p.append(el('b', {}, 'AI 反思：'), document.createTextNode(r.interpretation)); card.append(p); }
      box.append(card);
    }
    if (jump) {
      const t = document.getElementById(`round-${run.arm}-${jump}`);
      t.scrollIntoView({ block: 'start' }); t.classList.add('flash'); setTimeout(() => t.classList.remove('flash'), 1200);
    }
  }

  // Takeaways ---------------------------------------------------------------
  function takeaways(studies) {
    const box = $('#takeaways');
    const add = (title, text) => { const d = el('div', { class: 'takeaway' }); d.append(el('h4', {}, title), el('p', { style: 'margin:0' }, text)); box.append(d); };
    const nat = studies.filter((s) => s.bench !== 'mle-bench');
    const mean = (a) => nat.reduce((t, s) => t + s.runs.find((r) => r.arm === a).final.value, 0) / nat.length;
    add('MLE-bench：人介入在 4/5 任务上测试分更好',
      'Spooky、Tabular、Leaf（log loss 0.040/0.047 vs A 0.071）与 Pizza（AUC 0.682/0.661 vs A 0.644）上，B、C 的官方测试分都好于 A，其中 Leaf 与 Pizza 都是 B 最好；NOMAD 上三臂差距很小，A 测试分反而最好（银牌线），而验证集上 B 最好——验证集排名在测试集上翻转了。');
    add('Nature：逐重复结果不一致',
      `三个重复里，赢家分别是 A、C、B。按均值是 C (${mean('C').toFixed(3)}) > B (${mean('B').toFixed(3)}) > A (${mean('A').toFixed(3)})，但 C 的均值几乎全靠第 2 个重复的 0.224；B 在 3 个重复中有 2 个高于 A。不能据此下结论。`);
    add('读结果时请记住',
      'B/C 的"人类"是 Claude 代决，且能看到其他臂；每个 MLE 任务只有 1 个重复。本页更适合用来看人在环路下的研究过程长什么样，而不是作为效果证明。');
  }

  // Boot --------------------------------------------------------------------
  fetch('data.json').then((r) => r.json()).then((data) => {
    DATA = data;
    const order = (s) => (s.bench === 'mle-bench' ? 0 : 1);
    data.studies.sort((a, b) => order(a) - order(b) || a.key.localeCompare(b.key));
    legend('#legend-results', 'dot'); legend('#legend-curves', 'line');
    takeaways(data.studies);
    for (const s of data.studies) { $('#final-charts').append(finalChart(s)); $('#curve-charts').append(curveChart(s)); }
    $('#final-table').append(finalTable(data.studies));
    const sel = $('#study-select');
    data.studies.forEach((s, i) => sel.append(el('option', { value: i }, studyLabel(s))));
    sel.addEventListener('change', () => { current.study = +sel.value; renderStrips(); renderRounds(); });
    renderStrips(); renderRounds();
    const lim = new Set(data.studies.flatMap((s) => s.limitations));
    for (const l of lim) $('#limitations').append(el('li', {}, l));
    $('#generated').textContent = data.generated.slice(0, 10);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => location.reload());
  });
})();
