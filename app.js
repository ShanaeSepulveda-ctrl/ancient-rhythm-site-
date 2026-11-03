// ===== ANCIENT RHYTHM MOON MATH (verified 2027-28 year) =====
const DAY = 86400000;
const ANCHOR = Date.UTC(2027, 2, 20); // Moon 1 starts Sat Mar 20, 2027
const THEMES = ["Seed Moon","Root Moon","Bloom Moon","Sun Moon","Thunder Moon",
  "Harvest Moon","Ember Moon","Hunter Moon","Frost Moon","Long Night Moon",
  "Wolf Moon","Thaw Moon","Renewal Moon"]; // <-- edit these names anytime
const PROMPTS = ["What is beginning in you?","What needs deeper roots?",
  "What is ready to be seen?","Where is your energy brightest?",
  "What truth is rumbling?","What are you gathering in?",
  "What can you release to the fire?","What are you honestly hunting?",
  "What needs protecting?","What rests in the dark with you?",
  "What does your pack need?","What is quietly melting?",
  "What will you carry into the new year?"];

function lenFor(startYear){ const n = startYear + 1;
  return ((n % 4 === 0 && n % 100 !== 0) || n % 400 === 0) ? 366 : 365; }

function moonInfo(date){
  let start = ANCHOR;
  let y = 2027;
  while (date.getTime() >= start + lenFor(y) * DAY){ start += lenFor(y) * DAY; y++; }
  while (date.getTime() < start){ y--; start -= lenFor(y) * DAY; }
  const idx = Math.floor((date.getTime() - start) / DAY); // 0-based day of cycle
  if (idx >= 364) return { dot:true, dotDay: idx - 363,
    cycleStart:new Date(start) };
  const moon = Math.floor(idx / 28) + 1, day = (idx % 28) + 1;
  return { dot:false, moon, day, theme: THEMES[moon-1], prompt: PROMPTS[moon-1],
    moonStart: new Date(start + (moon-1)*28*DAY),
    moonEnd:   new Date(start + moon*28*DAY - DAY) };
}
const fmt = d => d.toLocaleDateString("en-US",
  { weekday:"short", month:"short", day:"numeric", year:"numeric", timeZone:"UTC" });

// ===== SHOW TODAY'S MOON =====
const now = moonInfo(new Date());
if (now.dot){
  document.getElementById("moonName").textContent =
    "🌑 Day Out of Time " + now.dotDay;
  document.getElementById("moonPrompt").textContent =
    "No moon, no schedule. Rest, release, prepare for the new year.";
} else {
  document.getElementById("moonName").textContent =
    "Moon " + now.moon + " of 13 — " + now.theme + " · Day " + now.day + " of 28";
  document.getElementById("moonDates").textContent =
    fmt(now.moonStart) + " → " + fmt(now.moonEnd);
  document.getElementById("moonPrompt").textContent =
    "Reflection: " + now.prompt;
}

// ===== MOON GUIDE AGENT (answers only from the verified map) =====
const log = document.getElementById("chatLog");
function say(who, text){ log.innerHTML += "<p><b>" + who + ":</b> " + text + "</p>"; }
function answer(q){
  q = q.toLowerCase(); const t = moonInfo(new Date());
  if (q.includes("price") || q.includes("cost"))
    return "The Journal is $27 — the gold button above takes you to checkout.";
  if (q.includes("buy") || q.includes("get") || q.includes("journal"))
    return "The 2027–28 Journal (195 pages) is $27, instant PDF. Use the gold button above.";
  if (q.includes("end") && !t.dot)
    return "This moon ends " + fmt(t.moonEnd) + ".";
  if (q.includes("start") || q.includes("begin"))
    return "The Ancient Rhythm year begins at the Spring Equinox. This cycle began " + fmt(t.cycleStart || new Date(ANCHOR)) + ".";
  if (q.includes("moon") || q.includes("today") || q.includes("now"))
    return t.dot ? "We are in a Day Out of Time — outside the 13 moons."
      : "We are in Moon " + t.moon + " (" + t.theme + "), Day " + t.day + " of 28. " + t.prompt;
  if (q.includes("free") || q.includes("guide"))
    return "The free Current Moon Guide is coming to this page soon — check back at the next moon change.";
  return "I can answer about the current moon, moon dates, and the Journal. Try: 'What moon are we in?'";
}
document.getElementById("chatSend").onclick = () => {
  const box = document.getElementById("chatInput");
  if (!box.value.trim()) return;
  say("You", box.value); say("Moon Guide", answer(box.value)); box.value = "";
};
say("Moon Guide", "Welcome. Ask me what moon we're in.");
