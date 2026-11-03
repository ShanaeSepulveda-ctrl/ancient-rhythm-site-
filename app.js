// ===== ANCIENT RHYTHM MOON MATH (verified map) =====
const DAY = 86400000;
const ANCHOR = Date.UTC(2027, 2, 20); // Moon 1 starts Sat Mar 20, 2027
const THEMES = ["Seed Moon","Root Moon","Bloom Moon","Sun Moon","Thunder Moon",
  "Harvest Moon","Ember Moon","Hunter Moon","Frost Moon","Long Night Moon",
  "Wolf Moon","Thaw Moon","Renewal Moon"]; // <-- PLACEHOLDERS: replace with your real moon names
const PROMPTS = ["What is beginning in you?","What needs deeper roots?",
  "What is ready to be seen?","Where is your energy brightest?",
  "What truth is rumbling?","What are you gathering in?",
  "What can you release to the fire?","What are you honestly hunting?",
  "What needs protecting?","What rests in the dark with you?",
  "What does your pack need?","What is quietly melting?",
  "What will you carry into the new year?"];
const PHASES = ["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"];

function lenFor(startYear){ const n = startYear + 1;
  return ((n % 4 === 0 && n % 100 !== 0) || n % 400 === 0) ? 366 : 365; }

function moonInfo(date){
  const d = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  let start = ANCHOR, y = 2027;
  while (d >= start + lenFor(y) * DAY){ start += lenFor(y) * DAY; y++; }
  while (d < start){ y--; start -= lenFor(y) * DAY; }
  const idx = Math.floor((d - start) / DAY);
  const cycleStart = new Date(start);
  if (idx >= 364) return { dot:true, dotDay: idx - 363, cycleStart };
  const moon = Math.floor(idx / 28) + 1, day = (idx % 28) + 1;
  return { dot:false, moon, day, cycleStart,
    theme: THEMES[moon-1], prompt: PROMPTS[moon-1],
    phase: PHASES[Math.min(7, Math.floor((day - 1) / 28 * 8))],
    moonStart: new Date(start + (moon-1)*28*DAY),
    moonEnd:   new Date(start + moon*28*DAY - DAY) };
}
const fmt = d => d.toLocaleDateString("en-US",
  { weekday:"short", month:"short", day:"numeric", year:"numeric", timeZone:"UTC" });

// ===== SHOW TODAY'S MOON =====
const now = moonInfo(new Date());
if (now.dot){
  document.getElementById("moonName").textContent = "🌑 Day Out of Time " + now.dotDay;
  document.getElementById("moonPrompt").textContent =
    "No moon, no schedule. Rest, release, prepare for the new year.";
} else {
  document.getElementById("moonName").textContent =
    now.phase + " Moon " + now.moon + " of 13 — " + now.theme + " · Day " + now.day + " of 28";
  document.getElementById("moonDates").textContent = fmt(now.moonStart) + " → " + fmt(now.moonEnd);
  document.getElementById("moonPrompt").textContent = "✦ Reflection: " + now.prompt;
}

// ===== MOON GUIDE AGENT (answers only from the verified map) =====
const log = document.getElementById("chatLog");
function say(who, text){ log.innerHTML += "<p><b>" + who + ":</b> " + text + "</p>"; }
function answer(q){
  q = q.toLowerCase(); const t = moonInfo(new Date());
  if (q.includes("price") || q.includes("cost") || q.includes("much"))
    return "The Journal is $27 — the gold button above takes you to checkout, and the PDF is delivered instantly.";
  if (q.includes("buy") || q.includes("journal") || q.includes("order"))
    return "The 2027–28 Journal is 195 pages — every moon, ritual, and reflection for the full year. It's $27, instant PDF, from the gold button above.";
  if (q.includes("prompt") || q.includes("reflect") || q.includes("journal prompt"))
    return t.dot ? "Days Out of Time ask nothing of you. Simply release the old year."
      : "This moon's reflection: " + t.prompt;
  if (q.includes("end") || q.includes("next moon"))
    return t.dot ? "The new year turns at the Spring Equinox."
      : "This moon ends " + fmt(t.moonEnd) + " — the next moon begins the following morning.";
  if (q.includes("start") || q.includes("begin") || q.includes("new year"))
    return "The Ancient Rhythm year begins at the Spring Equinox. This cycle began " + fmt(t.cycleStart) + ".";
  if (q.includes("how many") || q.includes("13"))
    return "There are 13 moons of 28 days each — 364 days — plus one or two Days Out of Time that belong to no moon.";
  if (q.includes("out of time"))
    return "Days Out of Time fall after Moon 13, before the new year turns at the Equinox. Time for rest, release, and forgiveness — no moon rules them.";
  if (q.includes("moon") || q.includes("today") || q.includes("now") || q.includes("phase"))
    return t.dot ? "We are in a Day Out of Time — outside the 13 moons entirely."
      : t.phase + " We are in Moon " + t.moon + " (" + t.theme + "), Day " + t.day + " of 28, running " + fmt(t.moonStart) + " to " + fmt(t.moonEnd) + ". " + t.prompt;
  if (q.includes("free") || q.includes("guide"))
    return "The free Current Moon Guide is coming to this page soon — return at the next moon change.";
  if (q.includes("hello") || q.includes("hi") || q.includes("hey"))
    return "Welcome, traveler. Ask me what moon we're in, or what this moon is asking of you.";
  if (q.includes("thank")) return "You are welcome. Live in rhythm. 🌙";
  return "I answer from the Ancient Rhythm calendar itself. Try: 'What moon are we in?', 'When does this moon end?', or 'What is this moon's reflection?'";
}
document.getElementById("chatSend").onclick = () => {
  const box = document.getElementById("chatInput");
  if (!box.value.trim()) return;
  say("You", box.value); say("Moon Guide", answer(box.value)); box.value = "";
};
document.getElementById("chatInput").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("chatSend").click();
});
say("Moon Guide", "✦ Welcome. Ask me what moon we're in.");
