/* The Ancient Rhythm · cycle-module.js  (load AFTER moon-engine.js)
   Turns "Mark Moon Flow" into a private cycle companion: inner seasons, predictions,
   and a wheel that shows your cycle beside the Moon's. All data stays on the device. */
(function () {
  'use strict';
  if (!window.__astro) return;
  var astro = window.__astro.astro, DAY = 864e5, EMO = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
  var moonEmo = function (e) { return EMO[Math.floor(((e + 22.5) % 360) / 45)]; };
  var SEASONS = [
    { n: 'Inner Winter', c: '#7f8cff', t: 'Release and rest. Your body is clearing; the quiet is productive. Say no gently, say yes to warmth.' },
    { n: 'Inner Spring', c: '#7fe0a8', t: 'Energy returns. Curiosity rises. A good window for planning, starting, and learning.' },
    { n: 'Inner Summer', c: '#ffd700', t: 'Radiant and outward. Many people feel most social and expressive now. Speak, create, connect.' },
    { n: 'Inner Autumn', c: '#ff8a65', t: 'Reflect and edit. Sensitivity sharpens, so use it: finish things, set boundaries, tell the truth kindly.' }
  ];

  function periodStarts() {
    var ds = Object.keys(db.logs || {}).filter(function (k) { return db.logs[k]; }).map(function (k) { return new Date(k); })
      .filter(function (d) { return !isNaN(d); }).sort(function (a, b) { return a - b; });
    var out = []; ds.forEach(function (d, i) { if (!i || Math.round((d - ds[i - 1]) / DAY) >= 10) out.push(d); });
    return out;
  }
  function seasonFor(day, L) {
    var O = Math.max(9, L - 14);
    return day <= 5 ? 0 : day <= O - 2 ? 1 : day <= O + 1 ? 2 : 3;
  }

  var dash = document.getElementById('oracleDash');
  var card = document.createElement('div'); card.className = 'wisdom-card'; card.style.borderLeftColor = 'var(--blood)';
  card.innerHTML = '<span class="wisdom-label" style="color:var(--blood)">CYCLE &amp; MOON · PRIVATE TO THIS DEVICE</span>' +
    '<div class="eng-row"><canvas class="q" id="cyWheel" width="230" height="230"></canvas><div class="eng-stat" id="cyStats"></div></div>' +
    '<div class="wisdom-text" id="cyMsg" style="font-size:1.05rem;margin-top:10px"></div>' +
    '<div class="eng-cap">Outer ring: the Moon’s 29.5-day cycle (gold = lit). Red dots: where the Moon was when your bleeds began. Inner ring: your own cycle in four inner seasons. This is a reflection tool for noticing patterns, not medical advice or a contraceptive. Research on menstrual cycles and the Moon is mixed, so let your own data tell you. Ovulation timing is an estimate.</div>';
  var qCard = Array.prototype.filter.call(dash.querySelectorAll('.wisdom-card'), function (c) { return /QUANTUM MOON/.test(c.textContent); })[0];
  dash.insertBefore(card, qCard || null);

  function wheel(cv, a, starts, day, L, sIdx) {
    var x = cv.getContext('2d'), cx = 115, cy = 115, TAU = Math.PI * 2, at = function (deg) { return (deg - 90) * Math.PI / 180; };
    x.clearRect(0, 0, 230, 230);
    for (var i = 0; i < 72; i++) {                       // lunar ring, brightness = illumination
      var e = i * 5, ill = (1 - Math.cos(e * Math.PI / 180)) / 2;
      x.strokeStyle = 'rgba(255,236,180,' + (0.12 + ill * 0.85) + ')'; x.lineWidth = 12;
      x.beginPath(); x.arc(cx, cy, 100, at(e), at(e + 5.4)); x.stroke();
    }
    starts.slice(-8).forEach(function (d) {              // moon phase at each bleed start
      var e = astro(d.getTime() + 12 * 36e5).elong, p = at(e);
      x.fillStyle = '#ff3385'; x.beginPath(); x.arc(cx + 100 * Math.cos(p), cy + 100 * Math.sin(p), 4.5, 0, TAU); x.fill();
    });
    var mp = at(a.elong);                                // moon today
    x.fillStyle = '#fff'; x.shadowColor = '#fff'; x.shadowBlur = 12; x.beginPath(); x.arc(cx + 100 * Math.cos(mp), cy + 100 * Math.sin(mp), 6, 0, TAU); x.fill(); x.shadowBlur = 0;
    if (L) {                                             // personal cycle ring
      for (var d = 1; d <= L; d++) {
        x.strokeStyle = SEASONS[seasonFor(d, L)].c; x.globalAlpha = d === day ? 1 : 0.55; x.lineWidth = 12;
        x.beginPath(); x.arc(cx, cy, 78, at((d - 1) / L * 360), at(d / L * 360) + 0.01); x.stroke();
      }
      x.globalAlpha = 1;
      var cp = at((Math.min(day, L) - 0.5) / L * 360);
      x.fillStyle = '#fff'; x.beginPath(); x.arc(cx + 78 * Math.cos(cp), cy + 78 * Math.sin(cp), 5, 0, TAU); x.fill();
      x.fillStyle = '#fdfbff'; x.font = '22px Cinzel,serif'; x.textAlign = 'center'; x.fillText('Day ' + day, cx, cy + 4);
      x.font = '10px Cinzel,serif'; x.fillStyle = SEASONS[sIdx].c; x.fillText(SEASONS[sIdx].n.toUpperCase(), cx, cy + 22);
    } else {
      x.fillStyle = '#e6ccff'; x.font = '11px Cinzel,serif'; x.textAlign = 'center';
      x.fillText('MARK FLOW DAYS', cx, cy - 2); x.fillText('TO BEGIN YOUR WHEEL', cx, cy + 14);
    }
  }

  function update() {
    var now = new Date(), a = astro(now.getTime()), starts = periodStarts(), stats = document.getElementById('cyStats'), msg = document.getElementById('cyMsg');
    var gaps = []; for (var i = 1; i < starts.length; i++) gaps.push(Math.round((starts[i] - starts[i - 1]) / DAY));
    gaps = gaps.filter(function (g) { return g >= 15 && g <= 60; }).slice(-6);
    var L = gaps.length ? Math.round(gaps.reduce(function (s, g) { return s + g; }, 0) / gaps.length) : 0;
    var last = starts[starts.length - 1], day = last ? Math.round((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - last) / DAY) + 1 : 0;
    var sIdx = L && day ? seasonFor(Math.min(day, L), L) : 0;
    wheel(document.getElementById('cyWheel'), a, starts, L ? day : 0, L, sIdx);
    var h = '<b>Moon today</b> ' + moonEmo(a.elong) + ' ' + (a.elong / 360 * 29.53).toFixed(1) + ' days old<br>';
    if (!starts.length) { stats.innerHTML = h + 'Press <b>MARK MOON FLOW</b> on the days you bleed. Two or more cycles unlock predictions.'; msg.textContent = 'Your wheel begins with the first day you mark.'; return; }
    h += '<b>Last bleed began</b> ' + last.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + moonEmo(astro(last.getTime() + 12 * 36e5).elong) + '<br>';
    if (L) {
      var next = new Date(last.getTime() + L * DAY), late = Math.round((now - next) / DAY);
      h += '<b>Average cycle</b> ' + L + ' days (' + gaps.length + ' logged)<br><b>Next expected</b> ' + next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + moonEmo(astro(next.getTime() + 12 * 36e5).elong) + (late > 0 ? ' (' + late + 'd past)' : '');
      msg.textContent = SEASONS[sIdx].n + '. ' + SEASONS[sIdx].t;
    } else { h += 'Log one more cycle to see your average and seasons.'; msg.textContent = 'One more logged bleed and your inner seasons appear.'; }
    var nw = 0, fl = 0, mid = 0;
    starts.slice(-8).forEach(function (d) { var e = astro(d.getTime() + 12 * 36e5).elong; if (e < 45 || e >= 315) nw++; else if (e >= 135 && e < 225) fl++; else mid++; });
    if (starts.length >= 3) {
      var pat = nw > fl && nw >= mid ? 'closer to the New Moon (a quiet, inward rhythm in lunar lore)' : fl > nw && fl >= mid ? 'closer to the Full Moon (an outward, radiant rhythm in lunar lore)' : 'spread across the Moon’s phases';
      msg.textContent += ' Your last ' + Math.min(8, starts.length) + ' bleeds began ' + pat + '.';
    }
    stats.innerHTML = h;
  }
  var _u = window.updateDash; window.updateDash = function (d) { _u(d); update(); };
  update();
})();
