// Renders the bias-diagnostics section from data/bias.json (validation scores only).
(function () {
  const $ = (s) => document.querySelector(s);
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) k === 'class' ? (n.className = v) : n.setAttribute(k, v);
    for (const k of kids) n.append(k instanceof Node ? k : document.createTextNode(k));
    return n;
  };
  const ARM_NAME = { A: 'A · AI 自主', B: 'B · 点选', C: 'C · 批评' };
  const pct = (v) => (v == null ? '—' : v.toFixed(1) + '%');

  // A horizontal bar with a 95% interval whisker, all in percent of a 0..max axis.
  function bar(value, ci, max, arm) {
    const w = (x) => Math.max(0, Math.min(100, (x / max) * 100)) + '%';
    const track = el('div', { class: 'bb-track' });
    track.append(el('i', { class: 'bb-fill arm-' + arm, style: `width:${w(value)}` }));
    if (ci) track.append(el('i', { class: 'bb-ci', style: `left:${w(ci[0])};width:calc(${w(ci[1])} - ${w(ci[0])})` }));
    return track;
  }

  function armBars(host, title, note, rows, field, ciField, max) {
    const card = el('div', { class: 'bb-card' }, el('h4', {}, title), el('p', { class: 'bb-note' }, note));
    for (const arm of ['A', 'B', 'C']) {
      const r = rows[arm];
      if (!r) continue;
      card.append(el('div', { class: 'bb-row' },
        el('span', { class: 'bb-label' }, ARM_NAME[arm]),
        bar(r[field], r[ciField], max, arm),
        el('span', { class: 'bb-val' }, pct(r[field]),
          r[ciField] ? el('small', {}, ` [${r[ciField][0]}, ${r[ciField][1]}]`) : '')));
    }
    host.append(card);
  }

  function streak(host, streaks) {
    const card = el('div', { class: 'bb-card' },
      el('h4', {}, '连续失败之后，下一轮更难成功'),
      el('p', { class: 'bb-note' }, '把所有臂合在一起：已经连续 k 轮没有改进时，第 k+1 轮改进的比例。方向被证伪后继续在附近打转，是循环里最贵的浪费。'));
    for (const s of streaks) {
      card.append(el('div', { class: 'bb-row' },
        el('span', { class: 'bb-label' }, s.failures_in_a_row + ' 次连败'),
        bar(s.improved_pct, null, 60, 'X'),
        el('span', { class: 'bb-val' }, pct(s.improved_pct), el('small', {}, ` n=${s.rounds}`))));
    }
    host.append(card);
  }

  function facts(host, d) {
    const o = d.optimism, n = d.noise, w = d.winners_curse, h = d.hedged_support;
    const items = [
      [d.rounds, '轮已执行并打分', `${d.tasks} 个任务 · 三臂合计`],
      [pct(o.false_support_rate_pct), '“支持”但实测没涨', `${o.claimed_support} 次模型写下“支持”`],
      [pct(n.within_noise_pct), '“改进”小于噪声底', `${n.within_noise_floor}/${n.improving_rounds} 次改进不超过该任务退步的中位幅度`],
      [pct(h.pct), '“支持”自己承认可能是噪声', `${h.support_that_admits_noise_in_limitations}/${h.claimed_support} 次在局限里写了方差/显著性`],
    ];
    for (const [big, label, sub] of items) {
      host.append(el('div', { class: 'bb-fact' }, el('b', {}, String(big)), el('span', {}, label), el('small', {}, sub)));
    }
  }

  async function main() {
    const host = $('#bias-body');
    if (!host) return;
    const d = await (await fetch('data/bias.json', { cache: 'no-cache' })).json();
    const factsHost = el('div', { class: 'bb-facts' });
    facts(factsHost, d);
    host.replaceChildren(factsHost);
    const grid = el('div', { class: 'bb-grid' });
    armBars(grid, '自评乐观：写下“支持”时，到底涨没涨',
      '条形是“模型写了支持/初步支持，但验证分并没有变好”的比例；须线是 95% bootstrap 区间。越短越可信。',
      d.arms, 'false_support_pct', 'false_support_ci', 80);
    armBars(grid, '每一轮真的改进的比例',
      '三臂在同一任务、同一模型、同一起点下，每轮实测验证分变好的比例。',
      d.arms, 'improved_pct', 'improved_ci', 60);
    streak(grid, d.streaks);
    host.append(grid);
    $('#bias-generated') && ($('#bias-generated').textContent = (d.generated || '').replace('T', ' ').slice(0, 16) + ' UTC');
  }
  main().catch((e) => { const h = $('#bias-body'); if (h) h.textContent = '偏差数据加载失败：' + e.message; });
})();
