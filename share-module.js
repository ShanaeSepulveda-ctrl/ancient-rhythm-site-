/* The Ancient Rhythm · share-module.js  (load AFTER awaken-module.js)
   1. "Create Moon Card": a beautiful 1080x1350 image of any day, ready to post or send
   2. "What am I looking at?": plain-language qubit explainer inside the Quantum card */
(function () {
  'use strict';
  if (!window.__astro) return;
  var astro = window.__astro.astro;
  var noon = function (d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12).getTime(); };

  /* ---------- Moon card ---------- */
  function wrap(x, text, cx, y, maxW, lh, maxLines) {
    var words = text.split(' '), line = '', lines = [];
    words.forEach(function (w) { var t = line ? line + ' ' + w : w; if (x.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; });
    if (line) lines.push(line);
    if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] = lines[maxLines - 1].replace(/[\s.,;:!?-]*\S*$/, '') + '…'; }
    lines.forEach(function (l, i) { x.fillText(l, cx, y + i * lh); });
    return y + lines.length * lh;
  }
  function moonDisc(x, cx, cy, R, elong) {
    var g = x.createRadialGradient(cx, cy, R, cx, cy, R * 1.5); g.addColorStop(0, 'rgba(230,204,255,.35)'); g.addColorStop(1, 'rgba(230,204,255,0)');
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R * 1.5, 0, 7); x.fill();
    x.fillStyle = '#1b1f3d'; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fill();
    var waxing = elong < 180, e = waxing ? elong : 360 - elong, k = Math.cos(e * Math.PI / 180), rx = Math.max(R * Math.abs(k), 0.01);
    x.save(); if (!waxing) { x.translate(cx * 2, 0); x.scale(-1, 1); }
    x.beginPath(); x.arc(cx, cy, R, -Math.PI / 2, Math.PI / 2, false);
    x.ellipse(cx, cy, rx, R, 0, Math.PI / 2, k >= 0 ? -Math.PI / 2 : Math.PI * 1.5, k >= 0); x.closePath(); x.clip();
    var m = x.createRadialGradient(cx - R * .2, cy - R * .2, R * .1, cx, cy, R); m.addColorStop(0, '#fbf3d9'); m.addColorStop(1, '#cfc6a4');
    x.fillStyle = m; x.fillRect(0, 0, 2000, 2000);
    x.fillStyle = 'rgba(90,85,70,.28)';
    [[-.3, -.25, .28], [.25, -.35, .2], [.1, .1, .3], [-.35, .25, .18], [.4, .3, .14], [0, -.55, .12]].forEach(function (c) { x.beginPath(); x.arc(cx + c[0] * R, cy + c[1] * R, c[2] * R, 0, 7); x.fill(); });
    x.restore();
  }
  function makeCard() {
    var d = new Date(typeof selectedDate === 'string' ? selectedDate : Date.now()); if (isNaN(d)) d = new Date();
    var data = getCelestialData(d), a = astro(noon(d)), cv = document.createElement('canvas'); cv.width = 1080; cv.height = 1350;
    var x = cv.getContext('2d'), bg = x.createLinearGradient(0, 0, 0, 1350); bg.addColorStop(0, '#1a0b2e'); bg.addColorStop(1, '#020105'); x.fillStyle = bg; x.fillRect(0, 0, 1080, 1350);
    var seed = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate(), rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (var i = 0; i < 160; i++) { x.fillStyle = 'rgba(255,255,255,' + (0.2 + rnd() * 0.7) + ')'; x.beginPath(); x.arc(rnd() * 1080, rnd() * 1350, rnd() * 2.2 + 0.4, 0, 7); x.fill(); }
    x.textAlign = 'center'; x.fillStyle = '#e6ccff'; x.font = '34px Cinzel, Georgia, serif'; x.fillText('THE ANCIENT RHYTHM', 540, 110);
    x.font = '26px Cinzel, Georgia, serif'; x.fillStyle = 'rgba(230,204,255,.7)'; x.fillText(d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(), 540, 160);
    moonDisc(x, 540, 470, 230, a.elong);
    var title = (data.archetype ? data.archetype.n : data.phase).toUpperCase();
    x.fillStyle = '#fff'; x.font = '60px Cinzel, Georgia, serif'; x.fillText(title, 540, 830);
    x.fillStyle = '#ffd700'; x.font = '30px Cinzel, Georgia, serif'; x.fillText('MOON IN ' + data.zod.toUpperCase() + '  ·  LUNAR DAY ' + data.tDay, 540, 885);
    x.fillStyle = '#eee'; x.font = 'italic 36px Georgia, serif'; var y = wrap(x, data.whisper, 540, 965, 840, 52, 5);
    x.fillStyle = 'rgba(230,204,255,.75)'; x.font = '26px Cinzel, Georgia, serif';
    x.fillText((a.illum * 100).toFixed(0) + '% ILLUMINATED  ·  ' + Math.round(a.dist).toLocaleString() + ' KM AWAY', 540, 1230);
    x.font = '22px Quicksand, sans-serif'; x.fillStyle = 'rgba(230,204,255,.55)'; x.fillText(location.hostname ? location.hostname + location.pathname.replace(/index\.html$/, '') : 'ko-fi.com/theancientrhythm', 540, 1290);
    return cv;
  }
  var ov = document.createElement('div');
  ov.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:2000;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;box-sizing:border-box';
  ov.innerHTML = '<div id="mcBox" style="max-height:72vh;display:flex"></div><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">' +
    '<button class="explore-btn" id="mcShare" style="margin:0">SHARE ✨</button><button class="explore-btn" id="mcSave" style="margin:0">SAVE IMAGE</button><button class="nav-btn" id="mcClose" style="flex:none;padding:10px 18px">CLOSE</button></div><div id="mcMsg" style="font-size:.65rem;color:var(--gold);font-family:Cinzel,serif"></div>';
  document.body.appendChild(ov);
  var cur = null, msg = function (t) { document.getElementById('mcMsg').textContent = t; };
  function open() {
    cur = makeCard(); var box = document.getElementById('mcBox'); box.innerHTML = ''; cur.style.cssText = 'max-height:72vh;max-width:100%;border-radius:18px;box-shadow:0 0 40px rgba(157,80,187,.5)'; box.appendChild(cur); msg(''); ov.style.display = 'flex';
  }
  function save() { cur.toBlob(function (b) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'ancient-rhythm-moon-card.png'; document.body.appendChild(a); a.click(); document.body.removeChild(a); msg('Saved to your downloads'); }, 'image/png'); }
  document.getElementById('mcClose').onclick = function () { ov.style.display = 'none'; };
  document.getElementById('mcSave').onclick = save;
  document.getElementById('mcShare').onclick = function () {
    cur.toBlob(function (b) {
      var f = new File([b], 'moon-card.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: 'The Ancient Rhythm', text: 'Today’s moon ☾' }).catch(function () {});
      else { save(); msg('Sharing is not available here, so the image was saved instead.'); }
    }, 'image/png');
  };
  var btn = document.createElement('button'); btn.className = 'sister-btn'; btn.innerHTML = '<span>🖼</span> CREATE MOON CARD <span>🖼</span>'; btn.onclick = open;
  var sis = document.querySelector('.sister-btn'); sis.parentNode.appendChild(btn);

  /* ---------- Qubit explainer ---------- */
  var qc = Array.prototype.filter.call(document.querySelectorAll('#oracleDash .wisdom-card'), function (c) { return /QUANTUM MOON/.test(c.textContent); })[0];
  if (qc) {
    var b2 = document.createElement('button'); b2.className = 'eng-btn'; b2.textContent = '❓ WHAT AM I LOOKING AT?'; b2.style.display = 'block'; b2.style.margin = '10px auto 0';
    var ex = document.createElement('div'); ex.className = 'eng-stat'; ex.style.cssText = 'display:none;margin-top:10px;font-size:.78rem;line-height:1.7;font-family:Quicksand,sans-serif';
    ex.innerHTML =
      '<b>A qubit</b> is the quantum version of a computer bit. A normal bit is 0 or 1. A qubit can be a blend of both at once (a <i>superposition</i>), and when measured it gives 0 or 1 with odds set by the blend.<br><br>' +
      '<b>The sphere on the left</b> (the Bloch sphere) is how physicists draw every possible state of one qubit. Top = definitely 0, bottom = definitely 1, and the lower the point, the higher the chance of 1: <b>P = sin²(θ/2)</b>.<br><br>' +
      '<b>The Moon matches that math.</b> Its lit fraction follows the same formula, where θ is the angle between the Sun and Moon. New Moon sits at the top (0% lit), Full Moon at the bottom (100% lit), and waxing and waning sit on opposite sides.<br><br>' +
      '<b>The honest part:</b> the Moon is not a quantum object. Its brightness is a fixed fact, not odds waiting to be measured. The shared equation is a bridge for learning, not a claim that the Moon is a qubit.<br><br>' +
      '<b>The dots on the right</b> are the real physics lesson. Light is sent one photon at a time through two slits. While the path is unknown, the dots build interference stripes. Press Observe to learn which slit each photon used, and the stripes vanish. Measuring changes what happens.';
    b2.onclick = function () { ex.style.display = ex.style.display === 'none' ? 'block' : 'none'; b2.textContent = ex.style.display === 'none' ? '❓ WHAT AM I LOOKING AT?' : '✕ HIDE EXPLANATION'; };
    qc.appendChild(b2); qc.appendChild(ex);
  }
})();
