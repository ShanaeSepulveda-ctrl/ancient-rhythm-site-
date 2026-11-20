/* The Ancient Rhythm · awaken-module.js  (load AFTER moon-engine.js and cycle-module.js)
   Four interactive practices: Body Compass (pattern atlas), Sky Now (moonrise/moonset + arc),
   Lunar Breath (pace follows the phase), Daily Quest (curiosity streak). Data stays on the device. */
(function () {
  'use strict';
  if (!window.__astro) return;
  var astro = window.__astro.astro, RAD = Math.PI / 180, DAY = 864e5;
  var PN = ['New', 'Wax Cres', '1st Qtr', 'Wax Gib', 'Full', 'Wan Gib', 'Last Qtr', 'Wan Cres'];
  var EMO = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
  var pIdx = function (e) { return Math.floor(((e + 22.5) % 360) / 45); };
  var jd = function (t) { return t / DAY + 2440587.5; };
  var store = function (k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || 'null'); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } };
  var selDate = function () { var d = new Date(typeof selectedDate === 'string' ? selectedDate : Date.now()); return isNaN(d) ? new Date() : d; };
  var noon = function (d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12).getTime(); };

  var dash = document.getElementById('oracleDash');
  var card = document.createElement('div'); card.className = 'wisdom-card'; card.style.borderLeftColor = 'var(--amethyst)';
  card.innerHTML =
    '<span class="wisdom-label">AWAKEN · BODY, SKY &amp; BREATH</span>' +
    '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px" id="awTabs"></div>' +
    '<div id="awBody"></div>';
  var qCard = Array.prototype.filter.call(dash.querySelectorAll('.wisdom-card'), function (c) { return /QUANTUM MOON/.test(c.textContent); })[0];
  dash.insertBefore(card, qCard || null);
  var css = document.createElement('style');
  css.textContent = '.aw-tab.on{background:var(--gold);color:var(--space)}.aw-row{display:flex;gap:5px;justify-content:center;margin:4px 0}' +
    '.aw-dot{width:38px;height:38px;border-radius:50%;border:1px solid rgba(230,204,255,.3);background:transparent;font-size:1.1rem;cursor:pointer;color:#fff}' +
    '.aw-dot.on{background:var(--aura);border-color:var(--gold);box-shadow:0 0 12px var(--aura)}.aw-lbl{font-family:Cinzel,serif;font-size:.55rem;letter-spacing:2px;color:var(--gold);text-align:center;margin-top:8px}';
  document.head.appendChild(css);

  var tab = 'body', tabs = [['body', '🧭 BODY'], ['sky', '🌌 SKY NOW'], ['breath', '🌬 BREATH'], ['quest', '✨ QUEST']];
  var tabsEl = document.getElementById('awTabs'), bodyEl = document.getElementById('awBody');
  tabs.forEach(function (t) {
    var b = document.createElement('button'); b.className = 'eng-btn aw-tab'; b.style.marginTop = 0; b.textContent = t[1];
    b.onclick = function () { tab = t[0]; stopBreath(); draw(); }; b.dataset.t = t[0]; tabsEl.appendChild(b);
  });

  /* ---------- BODY COMPASS ---------- */
  var FACES = { e: ['😴','🥱','🙂','😊','⚡'], m: ['😔','😕','😐','🙂','🥰'], b: ['😣','😬','😌','😊','🌿'] };
  var LBL = { e: 'ENERGY', m: 'MOOD', b: 'BODY EASE' };
  function bodyTab() {
    var d = selDate(), k = d.toDateString(), all = store('ar_compass') || {}, cur = all[k] || {};
    var h = '<div class="eng-cap" style="margin-top:0">How are you, honestly, in this moment? Tap one in each row. Over time the Atlas shows how your body moves with the Moon.</div>';
    ['e', 'm', 'b'].forEach(function (f) {
      h += '<div class="aw-lbl">' + LBL[f] + '</div><div class="aw-row">' + FACES[f].map(function (ic, i) { return '<button class="aw-dot' + (cur[f] === i + 1 ? ' on' : '') + '" data-f="' + f + '" data-v="' + (i + 1) + '">' + ic + '</button>'; }).join('') + '</div>';
    });
    h += '<div class="aw-lbl" style="margin-top:14px">YOUR PATTERN ATLAS · ENERGY &amp; MOOD BY MOON PHASE</div><canvas class="q" id="awAtlas" width="300" height="150" style="display:block;margin:6px auto"></canvas><div class="eng-cap" id="awInsight" style="text-align:center"></div>';
    bodyEl.innerHTML = h;
    bodyEl.querySelectorAll('.aw-dot').forEach(function (b) {
      b.onclick = function () {
        var a2 = store('ar_compass') || {}, e = a2[k] || {}; e[b.dataset.f] = +b.dataset.v; e.p = pIdx(astro(noon(d)).elong); a2[k] = e; store('ar_compass', a2); bodyTab();
      };
    });
    atlas(all);
  }
  function atlas(all) {
    var cv = document.getElementById('awAtlas'), x = cv.getContext('2d'), sum = [], n = [], i;
    for (i = 0; i < 8; i++) { sum[i] = { e: 0, m: 0 }; n[i] = { e: 0, m: 0 }; }
    Object.keys(all).forEach(function (k) { var r = all[k]; if (r.p == null) return; ['e', 'm'].forEach(function (f) { if (r[f]) { sum[r.p][f] += r[f]; n[r.p][f]++; } }); });
    var total = Object.keys(all).length, best = -1, bv = 0;
    for (i = 0; i < 8; i++) {
      var bx = 10 + i * 36;
      [['e', '#ffd700', 0], ['m', '#df80ff', 13]].forEach(function (s) {
        var v = n[i][s[0]] ? sum[i][s[0]] / n[i][s[0]] : 0, hgt = v / 5 * 95;
        x.fillStyle = s[1]; x.globalAlpha = v ? 0.9 : 0.12; x.fillRect(bx + s[2], 105 - (v ? hgt : 4), 11, v ? hgt : 4);
        if (s[0] === 'e' && v > bv) { bv = v; best = i; }
      });
      x.globalAlpha = 1; x.font = '14px sans-serif'; x.textAlign = 'center'; x.fillText(EMO[i], bx + 12, 124);
      x.font = '8px Cinzel,serif'; x.fillStyle = '#9fa'; x.fillStyle = '#e6ccff'; x.fillText(PN[i], bx + 12, 140);
    }
    x.font = '9px Cinzel,serif'; x.textAlign = 'left'; x.fillStyle = '#ffd700'; x.fillText('■ energy', 8, 10); x.fillStyle = '#df80ff'; x.fillText('■ mood', 62, 10);
    document.getElementById('awInsight').textContent = total < 7 ? total + ' of 7 check-ins so far. Keep going and your personal pattern will emerge.' :
      'Across ' + total + ' check-ins, your energy tends to peak around the ' + EMO[best] + ' ' + PN[best] + ' Moon. Notice it, plan around it, and see if it holds.';
  }

  /* ---------- SKY NOW (moonrise / moonset) ---------- */
  var loc = store('ar_loc');
  function moonEq(t) {
    var T = (jd(t) - 2451545) / 36525, a = astro(t), F = (93.272095 + 483202.0175233 * T) * RAD, lon = a.lon * RAD, lat = 5.128 * Math.sin(F) * RAD, eps = (23.4393 - 0.013 * T) * RAD;
    return { ra: Math.atan2(Math.sin(lon) * Math.cos(eps) - Math.tan(lat) * Math.sin(eps), Math.cos(lon)), dec: Math.asin(Math.sin(lat) * Math.cos(eps) + Math.cos(lat) * Math.sin(eps) * Math.sin(lon)), dist: a.dist };
  }
  function altaz(t, la, lo) {
    var q = moonEq(t), H = (280.46061837 + 360.98564736629 * (jd(t) - 2451545)) * RAD + lo * RAD - q.ra, p = la * RAD;
    var alt = Math.asin(Math.sin(p) * Math.sin(q.dec) + Math.cos(p) * Math.cos(q.dec) * Math.cos(H)) / RAD;
    var az = (Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(p) - Math.tan(q.dec) * Math.cos(p)) / RAD + 180 + 360) % 360;
    return { alt: alt, az: az, h0: 0.7275 * Math.asin(6378.14 / q.dist) / RAD - 0.5667 };
  }
  var DIRS = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  function skyTab() {
    var h = '<div class="eng-cap" style="margin-top:0">Go outside and meet the Moon. Share your location (used only in this browser) to see when she rises and sets where you stand.</div>' +
      '<div style="text-align:center"><button class="eng-btn" id="awLoc">📍 ' + (loc ? 'REFRESH MY SKY' : 'FIND MY SKY') + '</button></div><div id="awSky"></div>';
    bodyEl.innerHTML = h;
    var go = function () { if (loc) renderSky(); };
    document.getElementById('awLoc').onclick = function () {
      if (!navigator.geolocation) { document.getElementById('awSky').innerHTML = '<div class="eng-cap">Location is not available in this browser.</div>'; return; }
      navigator.geolocation.getCurrentPosition(function (p) { loc = { la: p.coords.latitude, lo: p.coords.longitude }; store('ar_loc', loc); go(); },
        function () { document.getElementById('awSky').innerHTML = '<div class="eng-cap">Location permission was declined. You can enable it in your browser settings.</div>'; });
    };
    go();
  }
  function renderSky() {
    var d = selDate(), t0 = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(), rise = null, set = null, i, prev = altaz(t0, loc.la, loc.lo), samples = [];
    for (i = 1; i <= 144; i++) {
      var t = t0 + i * 6e5, c = altaz(t, loc.la, loc.lo); samples.push(c.alt);
      var up0 = prev.alt - prev.h0, up1 = c.alt - c.h0;
      if (up0 < 0 && up1 >= 0 && !rise) rise = refine(t - 6e5, t, true); if (up0 >= 0 && up1 < 0 && !set) set = refine(t - 6e5, t, false);
      prev = c;
    }
    var now = Date.now(), n = altaz(now, loc.la, loc.lo), tf = function (t) { return t ? new Date(t).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '—'; };
    var h = '<div class="eng-row" style="margin-top:10px"><div class="eng-stat"><b>Moonrise</b> ' + tf(rise) + '<br><b>Moonset</b> ' + tf(set) + '<br><b>Right now</b> ' + (n.alt > n.h0 ? 'up, ' + n.alt.toFixed(0) + '° high toward ' + DIRS[Math.round(n.az / 22.5) % 16] : 'below the horizon') + '</div>' +
      '<canvas class="q" id="awArc" width="230" height="110"></canvas></div><div class="eng-cap">Calculated for your coordinates (typically within about 10 minutes). Weather, hills and buildings change what you can actually see.</div>';
    document.getElementById('awSky').innerHTML = h;
    var x = document.getElementById('awArc').getContext('2d'), base = 80, sc = 0.7;
    x.strokeStyle = 'rgba(230,204,255,.4)'; x.beginPath(); x.moveTo(0, base); x.lineTo(230, base); x.stroke();
    x.strokeStyle = '#ffd700'; x.lineWidth = 2; x.beginPath();
    samples.forEach(function (a, j) { var X = j / 143 * 230, Y = base - a * sc; j ? x.lineTo(X, Y) : x.moveTo(X, Y); }); x.stroke();
    x.fillStyle = '#e6ccff'; x.font = '9px Cinzel,serif'; ['12a', '6a', '12p', '6p'].forEach(function (l, j) { x.fillText(l, j * 57 + 2, 104); });
    if (new Date(now).toDateString() === d.toDateString()) {
      var nx = (now - t0) / DAY * 230; x.fillStyle = '#fff'; x.beginPath(); x.arc(nx, base - n.alt * sc, 5, 0, 7); x.fill();
    }
  }
  function refine(a, b, rising) {
    for (var k = 0; k < 14; k++) { var m = (a + b) / 2, c = altaz(m, loc.la, loc.lo), up = c.alt - c.h0 >= 0; if (up === rising) b = m; else a = m; }
    return (a + b) / 2;
  }

  /* ---------- LUNAR BREATH ---------- */
  var breathRaf = 0, breathOn = false;
  function stopBreath() { breathOn = false; cancelAnimationFrame(breathRaf); }
  function pattern(idx) {  // [inhale, hold, exhale, hold-out] in seconds
    if (idx === 0) return { p: [4, 7, 8, 0], n: 'New Moon · 4-7-8: a long, quiet exhale to settle into the dark', };
    if (idx === 4) return { p: [4, 4, 4, 4], n: 'Full Moon · box breath: steady and expansive' };
    return idx < 4 ? { p: [5, 2, 4, 0], n: 'Waxing · a longer inhale to gather energy' } : { p: [4, 2, 6, 0], n: 'Waning · a longer exhale to release' };
  }
  function breathTab() {
    var idx = pIdx(astro(Date.now()).elong), pt = pattern(idx);
    bodyEl.innerHTML = '<div class="eng-cap" style="margin-top:0;text-align:center">' + EMO[idx] + ' ' + pt.n + '</div>' +
      '<canvas class="q" id="awBreath" width="240" height="240" style="display:block;margin:8px auto"></canvas><div style="text-align:center"><button class="eng-btn" id="awGo">BEGIN · 6 BREATHS</button></div>';
    var cv = document.getElementById('awBreath'), x = cv.getContext('2d'); drawBreath(x, 0.3, 'Ready');
    document.getElementById('awGo').onclick = function () {
      if (breathOn) { stopBreath(); this.textContent = 'BEGIN · 6 BREATHS'; return; }
      breathOn = true; this.textContent = 'STOP'; var btn = this, t0 = performance.now(), cyc = pt.p[0] + pt.p[1] + pt.p[2] + pt.p[3], total = cyc * 6 * 1000;
      (function frame(now) {
        if (!breathOn) return; var el = now - t0;
        if (el > total) { breathOn = false; btn.textContent = 'BEGIN · 6 BREATHS'; drawBreath(x, 0.3, 'Well done'); return; }
        var s = (el / 1000) % cyc, a = pt.p, sz, lbl;
        if (s < a[0]) { sz = 0.3 + 0.7 * s / a[0]; lbl = 'Inhale'; }
        else if (s < a[0] + a[1]) { sz = 1; lbl = 'Hold'; }
        else if (s < a[0] + a[1] + a[2]) { sz = 1 - 0.7 * (s - a[0] - a[1]) / a[2]; lbl = 'Exhale'; }
        else { sz = 0.3; lbl = 'Rest'; }
        drawBreath(x, sz, lbl); breathRaf = requestAnimationFrame(frame);
      })(performance.now());
    };
  }
  function drawBreath(x, sz, lbl) {
    x.clearRect(0, 0, 240, 240); var r = 24 + sz * 84, g = x.createRadialGradient(120, 120, r * .2, 120, 120, r * 1.3);
    g.addColorStop(0, 'rgba(255,236,180,.95)'); g.addColorStop(.7, 'rgba(223,128,255,.55)'); g.addColorStop(1, 'rgba(223,128,255,0)');
    x.fillStyle = g; x.beginPath(); x.arc(120, 120, r * 1.3, 0, 7); x.fill();
    x.fillStyle = '#1a0b2e'; x.font = '15px Cinzel,serif'; x.textAlign = 'center'; x.fillText(lbl.toUpperCase(), 120, 125);
  }

  /* ---------- DAILY QUEST ---------- */
  var QUESTS = [
    'Find the Moon (even in daylight) and notice which direction she is in.', 'Put your bare feet on soil or grass for two minutes. What do you feel first?',
    'Watch the sky for five minutes after sunset. Count the first three stars or planets.', 'Drink a glass of water slowly. Where in your body do you feel it land?',
    'Notice your shadow at midday. Which way does it point, and why?', 'Listen for the farthest sound you can hear. Then the nearest.',
    'Name three living things within sight and what they need to survive.', 'Place a hand on your belly and take ten slow breaths. What is your body asking for?',
    'Look at the Moon’s dark patches. Those are ancient lava plains (maria), and you are seeing the same face humans always have.', 'Eat one thing today with full attention to taste and texture.',
    'Step outside before sunrise or after sunset and feel the temperature change on your skin.', 'Find something older than you (a tree, a stone) and spend a minute with it.',
    'Stretch like an animal waking up. Let your body choose the shape.', 'Tonight, turn off one light and notice how your eyes adapt over the next ten minutes.'
  ];
  function questTab() {
    var d = selDate(), k = d.toDateString(), doy = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / DAY), done = store('ar_quest') || {}, q = QUESTS[doy % QUESTS.length];
    var streak = 0, c = new Date(); if (!done[c.toDateString()]) c = new Date(c.getTime() - DAY); while (done[c.toDateString()]) { streak++; c = new Date(c.getTime() - DAY); }
    bodyEl.innerHTML = '<div class="aw-lbl" style="margin-top:0">TODAY’S INVITATION</div><div class="wisdom-text" style="text-align:center;margin:10px 0">' + q + '</div>' +
      '<div style="text-align:center"><button class="eng-btn" id="awDone">' + (done[k] ? '✓ COMPLETED' : 'I DID IT') + '</button></div>' +
      '<div class="eng-cap" style="text-align:center">🔥 ' + streak + '-day streak · ' + Object.keys(done).length + ' quests completed. Small noticing, repeated daily, is how a relationship with the natural world returns.</div>';
    document.getElementById('awDone').onclick = function () { done[k] = !done[k]; if (!done[k]) delete done[k]; store('ar_quest', done); questTab(); };
  }

  function draw() {
    tabsEl.querySelectorAll('.aw-tab').forEach(function (b) { b.classList.toggle('on', b.dataset.t === tab); });
    ({ body: bodyTab, sky: skyTab, breath: breathTab, quest: questTab })[tab]();
  }
  var _u = window.updateDash; window.updateDash = function (d) { _u(d); if (tab !== 'breath') draw(); };
  draw();
})();
