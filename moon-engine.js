/* The Ancient Rhythm · moon-engine.js  (load AFTER your main script, just before </body>)
   1. Fixes the "stuck on January" bug (opens on today, rolls over at midnight)
   2. Computes real new/full moons, moon signs & lunar days for ANY year (2024-2036)
   3. Adds NASA live layer (SVS Dial-A-Moon image + data, APOD) and Quantum Moon visuals */
(function () {
  'use strict';
  var NASA_KEY = 'DEMO_KEY';              // get a free key at https://api.nasa.gov and paste it here
  var SVS_IDS = { 2026: 5587 };           // NASA SVS "Moon Phase and Libration" id per year. Add 2027 when NASA posts it.
  var RAD = Math.PI / 180, SYN = 29.530588, DAY = 864e5;
  var nrm = function (a) { return ((a % 360) + 360) % 360; };
  var jd = function (t) { return t / DAY + 2440587.5; };
  var NAMES = ['New Moon','Waxing Crescent','First Quarter','Waxing Gibbous','Full Moon','Waning Gibbous','Last Quarter','Waning Crescent'];
  var EMO = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
  var SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
  var GLYPH = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
  var SG = SIGNS.map(function (s, i) { return s + ' ' + GLYPH[i]; });

  /* ---------- astronomy (Meeus-style series; phase times typically within ~30 minutes) ---------- */
  function astro(t) {
    var T = (jd(t) - 2451545) / 36525, s = function (x) { return Math.sin(x * RAD); }, c = function (x) { return Math.cos(x * RAD); };
    var L = 218.3164477 + 481267.88123421 * T, D = 297.8501921 + 445267.1114034 * T, M = 357.5291092 + 35999.0502909 * T,
        Mp = 134.9633964 + 477198.8675055 * T, F = 93.272095 + 483202.0175233 * T;
    var lon = nrm(L + 6.289 * s(Mp) + 1.274 * s(2 * D - Mp) + 0.658 * s(2 * D) + 0.214 * s(2 * Mp) - 0.186 * s(M) - 0.114 * s(2 * F));
    var dist = 385001 - 20905 * c(Mp) - 3699 * c(2 * D - Mp) - 2956 * c(2 * D) - 570 * c(2 * Mp);
    var sun = nrm(280.46646 + 36000.76983 * T + 1.914602 * s(M) + 0.019993 * s(2 * M));
    var elong = nrm(lon - sun);
    return { lon: lon, sun: sun, dist: dist, elong: elong, illum: (1 - Math.cos(elong * RAD)) / 2 };
  }
  function nextPhase(start, target) {
    var d = function (t) { return nrm(astro(t).elong - target + 180) - 180; }, t = start, p = d(t);
    for (var i = 0; i < 400; i++) {
      var n = t + 3 * 36e5, q = d(n);
      if (p < 0 && q >= 0) { var a = t, b = n; for (var k = 0; k < 22; k++) { var m = (a + b) / 2; if (d(m) < 0) a = m; else b = m; } return (a + b) / 2; }
      t = n; p = q;
    }
    return null;
  }
  var fmt = function (t) { return new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); };
  var noonOf = function (d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12).getTime(); };
  function series(target) {
    var out = [], t = Date.UTC(2024, 0, 1), end = Date.UTC(2037, 0, 1);
    while (t < end) { var x = nextPhase(t, target); if (!x) break; out.push(x); t = x + 20 * DAY; }
    return out;
  }

  /* ---------- regenerate the moon date tables for every year (mutates your arrays in place) ---------- */
  var FM = ['Wolf','Snow','Worm','Pink','Flower','Strawberry','Buck','Sturgeon','Harvest',"Hunter's",'Beaver','Cold'];
  var GEN_F = {
    Worm: 'Awakening. The earth softens and the first life stirs beneath the thaw. Release the dead weight of winter and let what is ready to grow begin.',
    Harvest: 'Gathering. The fields are full and the light turns golden. Count what you have grown, give thanks, and set aside what no longer nourishes you.'
  };
  var GEN_N = {
    Aquarius: 'Visionary. New Moon in Aquarius. The old rules loosen. Break the mold and detach from who you were expected to be. Plant a seed for the collective future.',
    Leo: 'Crown. New Moon in Leo. The heart begins a new song. Drop the mask, set an intention for joy, and let your light be seen without apology.'
  };
  var fulls = series(180), news = series(0);
  FULL_MOONS_ARRAY.length = 0; NEW_MOONS_ARRAY.length = 0; REFERENCE_NEW_MOONS.length = 0;
  fulls.forEach(function (t) {
    var d = fmt(t), mo = new Date(t).getMonth(), nm = FM[mo], a = astro(t);
    FULL_MOONS_ARRAY.push({ d: d, z: SG[Math.floor(a.lon / 30)] });
    if (!FULL_MOON_DATA[d]) {
      var any = Object.values(FULL_MOON_DATA).filter(function (e) { return e.n.indexOf(nm) === 0; })[0];
      var clean = any && !/eclipse/i.test(any.n + any.w);
      FULL_MOON_DATA[d] = { n: nm + ' Moon', w: clean ? any.w : (GEN_F[nm] || (any && any.w) || 'The moon is full. Stand in her light and name what has ripened.'), r: any ? any.r : '1. Stand beneath the moon. 2. Breathe slowly. 3. Name what is complete. 4. Say: I am illuminated.' };
    }
  });
  news.forEach(function (t) {
    var d = fmt(t), sign = SIGNS[Math.floor(astro(t).lon / 30)];
    NEW_MOONS_ARRAY.push(d); REFERENCE_NEW_MOONS.push(d);
    if (!NEW_MOON_DATA[d]) {
      var any = Object.values(NEW_MOON_DATA).filter(function (e) { return e.s === sign; })[0];
      var clean = any && !/eclipse/i.test(any.w);
      NEW_MOON_DATA[d] = { s: sign, w: clean ? any.w : (GEN_N[sign] || (any && any.w) || 'The dark moon. Plant an intention in the silence.'), r: any ? any.r : '1. Sit in the dark. 2. Breathe. 3. Whisper your intention. 4. Say: I am new.' };
    }
  });

  /* ---------- accurate replacement for getCelestialData ---------- */
  var PIV = [[0, 'Mar 20'], [90, 'Jun 20'], [180, 'Sep 23'], [270, 'Dec 21']];
  window.getCelestialData = function (date) {
    try {
      var dFull = fmt(date.getTime()), dShort = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      var a = astro(noonOf(date));
      var zod = SG[Math.floor(a.lon / 30)], el = ZOD_ELEMENTS[zod] || 'EARTH', sunZod = SIGNS[Math.floor(a.sun / 30)];
      var isFull = FULL_MOONS_ARRAY.some(function (m) { return m.d === dFull; }), isNew = NEW_MOONS_ARRAY.indexOf(dFull) > -1;
      var waxing = a.elong < 180, idx = Math.floor(((a.elong + 22.5) % 360) / 45);
      if (isNew) idx = 0; else if (isFull) idx = 4; else { if (idx === 0) idx = waxing ? 1 : 7; if (idx === 4) idx = waxing ? 3 : 5; }
      var phase = NAMES[idx], ico = EMO[idx];
      var tDay = getLunarDayAnchor(date) || (Math.floor(a.elong / 360 * SYN) + 1); if (isNew) tDay = 1;
      // exact equinox / solstice day from the Sun's true longitude
      var ds = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(), s0 = astro(ds).sun, span = nrm(astro(ds + DAY).sun - s0), pivotData = null;
      PIV.forEach(function (p) { if (nrm(p[0] - s0) < span) pivotData = PIVOT_DATA[p[1]]; });
      var isEvent = date.getFullYear() === 2026 ? CELESTIAL_EVENTS[dShort] : null; // retrograde/eclipse list is 2026-only
      var fm = FULL_MOON_DATA[dFull], nm = NEW_MOON_DATA[dFull], whisper, ritual, affirm;
      if (pivotData) { whisper = pivotData.w; ritual = pivotData.r; affirm = 'I am balanced. I am whole.'; }
      else if (isFull && fm) { whisper = fm.w; ritual = fm.r; affirm = 'I am illuminated.'; }
      else if (isNew && nm) { whisper = nm.w; ritual = nm.r; affirm = 'I am new.'; }
      else { var c = getDynamicContent(phase, zod, date.getDate()); whisper = c.whisper; ritual = c.ritual; affirm = getAffirmation(el); }
      var shadow = isNew ? (SHADOW_WORK[zod.split(' ')[0]] || 'What is hidden?') : '';
      return { phase: phase, ico: ico, zod: zod, sunZod: sunZod, tDay: tDay, el: el, elColor: ELEMENTS[el], dStr: dShort, year: date.getFullYear(),
               isFull: isFull, isNew: isNew, isPivot: pivotData, isEvent: isEvent, archetype: isFull ? fm : null, whisper: whisper, ritual: ritual, shadow: shadow, affirm: affirm };
    } catch (e) { console.log('Celestial calc error', e); return { phase: 'Moon', ico: '🌑', zod: 'Aries ♈', sunZod: 'Aries', tDay: 1, el: 'FIRE', elColor: '#fff', dStr: '', year: 2026, isFull: false, isNew: false, isPivot: null, isEvent: null, archetype: null, whisper: 'Quiet.', ritual: 'Breathe.', shadow: '', affirm: '' }; }
  };

  /* ---------- NASA + Quantum panels ---------- */
  var css = document.createElement('style');
  css.textContent = '.eng-row{display:flex;gap:14px;align-items:center;flex-wrap:wrap;justify-content:center}' +
    '.eng-stat{font-family:Quicksand,sans-serif;font-size:.72rem;line-height:1.7;text-align:left;color:#ddd}.eng-stat b{color:var(--gold);font-weight:500}' +
    '.eng-btn{background:transparent;border:1px solid var(--gold);color:var(--gold);border-radius:14px;padding:6px 12px;font-family:Cinzel,serif;font-size:.55rem;cursor:pointer;margin-top:8px}' +
    '.eng-cap{font-size:.62rem;opacity:.75;margin-top:8px;line-height:1.5;font-style:italic;text-align:left}canvas.q{background:rgba(0,0,0,.35);border-radius:14px;max-width:100%}';
  document.head.appendChild(css);
  var frag = document.createElement('div');
  frag.innerHTML =
    '<div class="wisdom-card" style="border-left-color:var(--moon-glow)"><span class="wisdom-label">NASA LIVE · LUNAR OBSERVATORY</span><div class="eng-row">' +
    '<div id="nasaMoon" style="width:150px;height:150px;border-radius:50%;overflow:hidden;box-shadow:0 0 28px var(--aura);background:#000"></div><div class="eng-stat" id="nasaStats"></div></div><div class="eng-cap" id="nasaSrc"></div></div>' +
    '<div class="wisdom-card" style="border-left-color:var(--phase)"><span class="wisdom-label">QUANTUM MOON ✦ THE PHASE AS A QUBIT</span><div class="eng-row">' +
    '<canvas class="q" id="qBloch" width="190" height="190"></canvas><canvas class="q" id="qSlit" width="300" height="190"></canvas></div>' +
    '<div class="eng-stat" id="qRead" style="text-align:center;margin-top:8px"></div>' +
    '<div style="text-align:center"><button class="eng-btn" id="qObs">👁 OBSERVE WHICH SLIT</button></div>' +
    '<div class="eng-cap">Left: the lunar phase mapped onto a Bloch sphere, a map physicists use for a two-state quantum system. The probability P = sin²(θ/2) matches the moon’s illuminated fraction exactly (an analogy, not a claim that the moon is quantum). Right: a double-slit experiment, one photon per dot. Interference fringes appear only while the path is unknown; press Observe and they collapse into two bands. Photon rate follows the moon’s brightness; fringe spacing follows its distance.</div></div>' +
    '<div class="wisdom-card" id="apodCard" style="display:none;border-left-color:var(--zodiac)"><span class="wisdom-label">NASA · ASTRONOMY PICTURE OF THE DAY</span><div id="apodBody"></div></div>';
  var dash = document.getElementById('oracleDash'), anchor = dash.querySelector('.wisdom-card');
  while (frag.firstChild) dash.insertBefore(frag.firstChild, anchor);

  var Q = { elong: 0, illum: 0, dist: 384400, observe: false, dots: 0 };
  var slit = document.getElementById('qSlit'), sx = slit.getContext('2d'), bl = document.getElementById('qBloch'), bx = bl.getContext('2d');
  document.getElementById('qObs').onclick = function () { Q.observe = !Q.observe; this.textContent = Q.observe ? '〰 RESTORE SUPERPOSITION' : '👁 OBSERVE WHICH SLIT'; clearSlit(); };
  function clearSlit() { Q.dots = 0; sx.clearRect(0, 0, 300, 190); drawSlits(); }
  function drawSlits() {
    sx.fillStyle = 'rgba(230,204,255,.6)'; sx.fillRect(0, 34, 128, 3); sx.fillRect(142, 34, 18, 3); sx.fillRect(174, 34, 126, 3);
    sx.fillStyle = 'rgba(230,204,255,.25)'; sx.fillRect(0, 150, 300, 1);
  }
  function drawBloch(ts) {
    var cx = 95, cy = 95, r = 68, th = (Q.elong <= 180 ? Q.elong : 360 - Q.elong) * RAD, ph = (Q.elong <= 180 ? 0 : Math.PI) + ts / 4000;
    bx.clearRect(0, 0, 190, 190);
    bx.strokeStyle = 'rgba(230,204,255,.35)'; bx.lineWidth = 1;
    bx.beginPath(); bx.arc(cx, cy, r, 0, 7); bx.stroke();
    bx.beginPath(); bx.ellipse(cx, cy, r, r * .3, 0, 0, 7); bx.stroke();
    bx.beginPath(); bx.moveTo(cx, cy - r - 6); bx.lineTo(cx, cy + r + 6); bx.stroke();
    var x = Math.sin(th) * Math.cos(ph), y = Math.sin(th) * Math.sin(ph), z = Math.cos(th);
    var px = cx + r * x, py = cy - r * (z * .95 + y * .3);
    bx.strokeStyle = '#ffd700'; bx.lineWidth = 2; bx.beginPath(); bx.moveTo(cx, cy); bx.lineTo(px, py); bx.stroke();
    var g = bx.createRadialGradient(px, py, 0, px, py, 12); g.addColorStop(0, '#fff'); g.addColorStop(1, 'rgba(255,215,0,0)');
    bx.fillStyle = g; bx.beginPath(); bx.arc(px, py, 12, 0, 7); bx.fill();
    bx.fillStyle = '#e6ccff'; bx.font = '10px Cinzel,serif'; bx.textAlign = 'center';
    bx.fillText('|NEW⟩', cx, 11); bx.fillText('|FULL⟩', cx, 188);
    requestAnimationFrame(drawBloch);
  }
  function slitTick() {
    var N = 2 + Math.round(Q.illum * 14), k = 9 + (406700 - Q.dist) / 50300 * 9;
    for (var i = 0; i < N; i++) {
      for (var tries = 0; tries < 60; tries++) {
        var x = Math.random() * 2 - 1, I;
        if (Q.observe) I = .5 * (Math.exp(-Math.pow(x - .32, 2) / .02) + Math.exp(-Math.pow(x + .32, 2) / .02));
        else I = Math.pow(Math.cos(k * x * .5), 2) * Math.exp(-x * x * 2.4);
        if (Math.random() < I) {
          sx.fillStyle = 'rgba(' + (Q.observe ? '255,107,107' : '223,128,255') + ',' + (0.35 + Q.illum * .55) + ')';
          sx.fillRect(150 + x * 140, 40 + Math.random() * 108, 1.6, 1.6); Q.dots++; break;
        }
      }
    }
    if (Q.dots > 7000) clearSlit();
  }
  setInterval(slitTick, 40); drawSlits(); requestAnimationFrame(drawBloch);

  /* NASA SVS image + hourly data (CORS-dependent data falls back gracefully) */
  var infoCache = {};
  function svsBase(id) { return 'https://svs.gsfc.nasa.gov/vis/a000000/a00' + (Math.floor(id / 100) * 100) + '/a00' + id + '/'; }
  function pick(o, re) { for (var k in o) if (re.test(k)) return o[k]; }
  var seq = 0;
  function cosmos(date) {
    var my = ++seq, isToday = date.toDateString() === new Date().toDateString(), t = isToday ? Date.now() : noonOf(date), a = astro(t);
    Q.elong = a.elong; Q.illum = a.illum; Q.dist = a.dist; clearSlit();
    document.getElementById('qRead').innerHTML = 'θ = <b>' + a.elong.toFixed(1) + '°</b> &nbsp;·&nbsp; P(full) = sin²(θ/2) = <b>' + (a.illum * 100).toFixed(1) + '%</b>';
    var calc = { dist: a.dist, ill: a.illum * 100, age: a.elong / 360 * SYN, diam: 2 * Math.atan(1737.4 / a.dist) / RAD * 3600 };
    var stats = document.getElementById('nasaStats'), src = document.getElementById('nasaSrc'), box = document.getElementById('nasaMoon');
    var show = function (o, from) {
      stats.innerHTML = '<b>Illuminated</b> ' + o.ill.toFixed(1) + '%<br><b>Moon age</b> ' + o.age.toFixed(1) + ' days<br><b>Distance</b> ' + Math.round(o.dist).toLocaleString() + ' km<br><b>Angular size</b> ' + (o.diam / 60).toFixed(2) + ' arcmin' +
        (o.libLon != null ? '<br><b>Libration</b> ' + o.libLon.toFixed(1) + '°, ' + o.libLat.toFixed(1) + '°' : '') + '<br><b>Light travel</b> ' + (o.dist / 299792.458).toFixed(3) + ' s';
      src.textContent = from;
    };
    show(calc, 'Values calculated locally from lunar & solar series. Image: NASA/GSFC Scientific Visualization Studio, LRO data.');
    var y = new Date(t).getUTCFullYear(), id = SVS_IDS[y], frame = Math.floor((t - Date.UTC(y, 0, 1)) / 36e5) + 1;
    if (!id) { box.innerHTML = '<div style="padding:50px 10px;font-size:2.5rem">' + EMO[Math.floor(((a.elong + 22.5) % 360) / 45)] + '</div>'; src.textContent = 'NASA has not published a ' + y + ' Dial-A-Moon set yet. Showing locally calculated values.'; return; }
    var img = new Image(); img.alt = 'NASA Dial-A-Moon'; img.style.cssText = 'width:100%;height:100%;object-fit:cover';
    img.onload = function () { if (my === seq) { box.innerHTML = ''; box.appendChild(img); } };
    img.onerror = function () { if (my === seq) box.innerHTML = '<div style="padding:50px 10px;font-size:2.5rem">' + EMO[Math.floor(((a.elong + 22.5) % 360) / 45)] + '</div>'; };
    img.src = svsBase(id) + 'frames/730x730_1x1_30p/moon.' + String(frame).padStart(4, '0') + '.jpg';
    var url = svsBase(id) + 'mooninfo_' + y + '.json';
    (infoCache[y] || (infoCache[y] = fetch(url).then(function (r) { if (!r.ok) throw 0; return r.json(); }))).then(function (j) {
      if (my !== seq) return;
      var e = Array.isArray(j) ? j[frame - 1] : null; if (!e) return;
      var ph = parseFloat(pick(e, /^phase/)), age = parseFloat(pick(e, /^age/)), di = parseFloat(pick(e, /^dist/)), dm = parseFloat(pick(e, /^diam/));
      var ll = parseFloat(pick(e, /earth.*lon|elon/i)), lb = parseFloat(pick(e, /earth.*lat|elat/i));
      if (isNaN(di)) return;
      show({ ill: isNaN(ph) ? calc.ill : ph, age: isNaN(age) ? calc.age : age, dist: di, diam: isNaN(dm) ? calc.diam : dm, libLon: isNaN(ll) ? null : ll, libLat: isNaN(lb) ? null : lb },
        'Live from NASA/GSFC Scientific Visualization Studio, Moon Phase and Libration ' + y + ' (hourly, LRO-based). Frame ' + frame + ' of the year.');
    }).catch(function () { infoCache[y] = null; });
  }
  var _upd = window.updateDash; window.updateDash = function (d) { _upd(d); cosmos(d); };

  /* APOD */
  fetch('https://api.nasa.gov/planetary/apod?api_key=' + NASA_KEY).then(function (r) { return r.json(); }).then(function (j) {
    if (!j || !j.title) return;
    var b = document.getElementById('apodBody'), media = j.media_type === 'image' ? '<img src="' + (j.url) + '" style="width:100%;border-radius:14px;margin-top:6px" alt="">' : '<a class="explore-btn" href="' + j.url + '" target="_blank" rel="noopener">WATCH ↗</a>';
    b.innerHTML = '<div class="wisdom-text" style="font-size:1.05rem">' + j.title.replace(/</g, '&lt;') + '</div>' + media + '<div class="eng-cap">' + (j.copyright ? '© ' + j.copyright.replace(/</g, '&lt;') + ' · ' : '') + (j.date || '') + ' · NASA APOD</div>';
    document.getElementById('apodCard').style.display = 'block';
  }).catch(function () {});

  /* ---------- today-aware navigation (the January fix) ---------- */
  window.changeMonth = function (n) { activeD = new Date(activeD.getFullYear(), activeD.getMonth() + n, 1); render(); };
  function goToday() { var n = new Date(); activeD = new Date(n); selectedDate = n.toDateString(); render(); updateDash(n); }
  var nb = document.createElement('button'); nb.className = 'nav-btn'; nb.textContent = '☾ TODAY'; nb.onclick = goToday;
  document.querySelector('.nav-container').appendChild(nb);
  var lastDay = new Date().toDateString();
  function tick() { var n = new Date(); if (n.toDateString() !== lastDay) { var wasToday = selectedDate === lastDay; lastDay = n.toDateString(); if (wasToday) goToday(); else render(); } }
  setInterval(tick, 60000); document.addEventListener('visibilitychange', function () { if (!document.hidden) tick(); });

  window.__astro = { astro: astro, nextPhase: nextPhase };   // handy for testing in the console
  goToday();
})();
