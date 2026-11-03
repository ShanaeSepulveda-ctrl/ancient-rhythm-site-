// ===== ANCIENT RHYTHM: VERIFIED CYCLE MATH =====
const DAY = 86400000;
const ANCHOR = Date.UTC(2027, 2, 20); // Moon 1 begins Sat, Mar 20, 2027

const MOONS = [
  {
    name: "Seed Moon",
    essence: "The Seed Moon arrives with the Spring Equinox, when life has not yet been asked to prove itself in bloom. Its wisdom is germination: the sacred intelligence of beginning quietly, before there is visible evidence that the new life will succeed.",
    light: "It brings renewal, courage, curiosity, and the willingness to let an old identity end so something truer can begin.",
    shadow: "Its shadow is forcing growth: comparing a seed to a flower, scattering energy across too many beginnings, or demanding certainty before taking the first faithful step.",
    prompt: "What is asking to begin in me before I can prove it will succeed?",
    ritual: "Hold a seed, stone, or small object that represents one beginning. Speak the beginning aloud, not as a promise to perform, but as something you are willing to tend. Give it one small, real act of care.",
    garden: "Watch for the earliest pollinators and leave early flowers standing when you can. Prepare the soil gently, but do not strip away every stem and leaf; life is still sheltering there.",
    affirmation: "I do not have to bloom today to be alive with beginning."
  },
  {
    name: "Root Moon",
    essence: "The Root Moon turns attention downward: to the body, the home, nourishment, ancestry, and the unseen ground that makes visible growth possible. It asks not how high you can reach, but how honestly you are rooted.",
    light: "It brings steadiness, belonging, nourishment, and the patience to build a foundation that can hold the life you say you want.",
    shadow: "Its shadow is mistaking control for safety, clinging to familiar ground after it has stopped nourishing you, or neglecting basic needs while chasing spiritual heights.",
    prompt: "What kind of ground am I asking my life to grow from?",
    ritual: "Stand barefoot on the earth if you can. Feel your weight fully supported. Name three things your body genuinely needs this moon, then tend one corner of your home as devotion rather than productivity.",
    garden: "Feed the soil before demanding more from it. Notice moisture, texture, and life beneath the surface. Native roots are quietly building the habitat later blooms will depend upon.",
    affirmation: "My roots are not a cage; they are how I rise."
  },
  {
    name: "Bloom Moon",
    essence: "The Bloom Moon is the moon of opening. A blossom does not apologize for its color or hide its fragrance until it feels worthy. Yet blooming is also discernment: not every visitor attracted to beauty is meant to receive all of you.",
    light: "It brings expression, pleasure, creativity, attraction, and the courage to be witnessed in your fullness.",
    shadow: "Its shadow is performing for approval, opening to everyone, or confusing attention with nourishment. Visibility without boundaries can leave the bloom exhausted.",
    prompt: "Where am I ready to be seen without shrinking or performing?",
    ritual: "Place a flower where you will encounter it often. Beneath it, write one gift you usually minimize. During this moon, share one true creative expression without explaining or apologizing for it.",
    garden: "Notice which flowers draw bees and butterflies. Beauty here is ecological relationship, not decoration. Plant for a succession of blooms so pollinators are fed across the season, and avoid pesticides that turn invitation into harm.",
    affirmation: "My beauty is not a request for permission."
  },
  {
    name: "Sun Moon",
    essence: "The Sun Moon carries the Summer Solstice and the longest light. It illuminates what has been growing, what has become undeniable, and what now requires shade, limits, or honest change. Peak light reveals both vitality and exhaustion.",
    light: "It brings clarity, vitality, leadership, celebration, and the courage to stand in the truth of your own life.",
    shadow: "Its shadow is overexposure: burning through your reserves, proving worth through output, or believing rest means you were never radiant at all.",
    prompt: "What has the light made impossible for me to ignore?",
    ritual: "At sunrise or sunset, write one truth the light has revealed. Then deliberately choose one form of shade: a boundary, an afternoon of rest, a no, or an earlier ending to the day.",
    garden: "Water deeply rather than constantly. Add mulch to protect roots, and offer pollinators a shallow dish of water with stones where they can land safely.",
    affirmation: "I can shine without burning myself away."
  },
  {
    name: "Thunder Moon",
    essence: "The Thunder Moon belongs to high-summer storms: pressure gathers, the air changes, and something honest breaks through. Anger, grief, desire, and truth may arrive as weather: powerful information, but not weather you must obey blindly.",
    light: "It brings honesty, emotional courage, movement, and the clearing that can follow a long-held silence.",
    shadow: "Its shadow is reactivity: sending words like lightning, fearing your own intensity, or suppressing the storm until it erupts sideways.",
    prompt: "What truth has been rumbling beneath my politeness?",
    ritual: "Write the unsent letter. Say everything without censoring it. Then pause; tear it, bury it, dissolve it in water, or safely burn it when conditions permit. Move the energy through walking, shaking, drumming, or breath before deciding anything.",
    garden: "After rain, notice where water gathers and where it runs away. Support tall plants before the next storm and preserve sheltered corners where pollinators can wait out the weather.",
    affirmation: "My intensity is information, not a defect."
  },
  {
    name: "Harvest Moon",
    essence: "The Harvest Moon asks for discernment. Not everything planted has ripened, and not everything ripe must be kept. This is a moon of gratitude, honest assessment, completion, and sharing what has truly matured.",
    light: "It brings gratitude, provision, completion, and the satisfaction of recognizing your own labor without diminishing it.",
    shadow: "Its shadow is scarcity: hoarding, harvesting too soon, overworking to prove the season mattered, or measuring your worth only by visible yield.",
    prompt: "What has actually ripened, and what deserves more time instead of judgment?",
    ritual: "Prepare or share a seasonal food. Name your harvest in two columns: what can be seen, and what changed invisibly within you. Offer one thing without turning generosity into self-abandonment.",
    garden: "Collect seeds from strong plants, but leave some seed heads and late blooms for birds, bees, and the garden's continuing story. A harvest can feed more than the gardener.",
    affirmation: "I receive what is ripe and release the need to force the rest."
  },
  {
    name: "Ember Moon",
    essence: "The Ember Moon crosses the Autumn Equinox, where light and darkness briefly meet in balance before the year turns inward. An ember is not a failed fire; it is warmth preserved, memory held, and devotion without constant consumption.",
    light: "It brings balance, gratitude, ancestral remembrance, reciprocity, and the ability to tend what matters without tending everything.",
    shadow: "Its shadow is nostalgia, carrying every old flame, or dimming yourself because the season of intensity has passed.",
    prompt: "What deserves to be tended now, and what fire is honestly complete?",
    ritual: "Light a candle at dusk. Name one lesson, ancestor, teacher, or former version of yourself you want to honor. Sit with equal attention to what the light has given you and what the coming darkness may teach.",
    garden: "Plant bulbs or cover crops as an act of faith if your climate allows. Leave seed heads standing, build a small brush shelter, and let the garden become habitat rather than something that must look tidy.",
    affirmation: "I can carry warmth without carrying everything."
  },
  {
    name: "Hunter Moon",
    essence: "The Hunter Moon is about instinct and real nourishment. It is not a call to become predatory; it is a call to track honestly. As the year cools, this moon asks what you are truly hungry for and whether your daily pursuits can actually feed it.",
    light: "It brings focus, self-trust, preparation, and the courage to pursue what is nourishing rather than merely available.",
    shadow: "Its shadow is scarcity, comparison, restless chasing, or pursuing substitutes while avoiding the deeper hunger beneath them.",
    prompt: "What am I truly hungry for beneath the substitutes I keep chasing?",
    ritual: "Choose one desire and quietly track it for a day. Notice when it appears, what triggers it, and what actually satisfies it. End the day by preparing one simple form of real nourishment.",
    garden: "Observe what the land is still offering and what it is withdrawing. Store seeds carefully, protect habitat, and notice animal movement without needing to control the wildness you witness.",
    affirmation: "I trust my instincts to lead me toward real nourishment."
  },
  {
    name: "Frost Moon",
    essence: "The Frost Moon brings the first hard clarity. Frost ends what is tender and outlived, reveals the structure beneath the leaves, and asks us to protect what is still vulnerable. It is not cruelty; it is seasonal honesty.",
    light: "It brings boundaries, preservation, focus, and relief from pretending that every living thing requires the same season of care.",
    shadow: "Its shadow is emotional freezing: cutting off too quickly, becoming hard in the name of clarity, or believing that because warmth is less visible, it has disappeared.",
    prompt: "What needs protection now, and what is honestly complete?",
    ritual: "Hold something warm in both hands. Make two lists: what I will protect, and what I will release. Then physically cover or shelter one vulnerable thing: a plant, a plan, your evening, or your heart.",
    garden: "Leave stems, leaves, and seed heads standing whenever possible. They are winter homes and future food. Notice hard frosts and what survives in sheltered places.",
    affirmation: "Cold can clarify me without closing my heart."
  },
  {
    name: "Long Night Moon",
    essence: "The Long Night Moon carries the Winter Solstice and the deepest darkness of the Ancient Rhythm year. Its wisdom is gestation. Some things cannot be understood, healed, or born in full light; they need privacy, silence, warmth, and time.",
    light: "It brings rest, intuition, dreaming, hope, and trust in invisible transformation.",
    shadow: "Its shadow is despair, isolation, or demanding answers from a season meant for incubation. Darkness is not automatically emptiness.",
    prompt: "What is gestating in me that cannot be hurried into the light?",
    ritual: "Sit with one candle in an otherwise dark room. Let the silence last longer than feels efficient. Place paper beside your bed afterward and record any dream, image, or sentence that remains by morning.",
    garden: "Honor the dormant garden. Plan by season and moon rather than urgency. Leave winter habitat undisturbed and notice how much life persists without visible productivity.",
    affirmation: "The dark is not empty; it is where I am being remade."
  },
  {
    name: "Wolf Moon",
    essence: "The Wolf Moon speaks of voice, kinship, and surviving winter through connection. A howl is both location and invitation: I am here. Who else is here? It asks where you have been enduring silently when belonging could help carry the season.",
    light: "It brings loyalty, support, honest communication, and the relief of being known.",
    shadow: "Its shadow is swallowing your needs to preserve peace, isolating until loneliness feels like identity, or allowing belonging to demand sameness.",
    prompt: "Where do I need to call for support instead of enduring alone?",
    ritual: "Send one honest voice message to a trusted person: not a performance, not a crisis, just your real location. Sing, hum, chant, or read aloud afterward and let your own voice return to your body.",
    garden: "Look for tracks, winter birds, and signs of relationship across the land. Plan pollinator plantings as communities rather than isolated flowers; resilience grows through connection.",
    affirmation: "My voice belongs in the circle of my life."
  },
  {
    name: "Thaw Moon",
    essence: "The Thaw Moon is tenderness returning unevenly. Ice loosens, water begins to move, and feelings that were frozen for survival may arrive all at once. Thaw is hopeful, but it is not the same as solid ground.",
    light: "It brings softening, forgiveness, emotional movement, and the first evidence that winter did not have the final word.",
    shadow: "Its shadow is flooding: trying to process everything immediately, forcing spring, or mistaking temporary warmth for complete transformation.",
    prompt: "What in me is beginning to soften, and how can I let it move safely?",
    ritual: "Wash your hands slowly in warm water. Name one grief and one hope as the water moves over your skin. Let both exist without requiring either to win. Follow the ritual with gentleness, food, and rest.",
    garden: "Watch where meltwater travels. Avoid compacting wet soil, check overwintering habitat, and begin choosing seeds without demanding that the garden hurry.",
    affirmation: "I can soften without losing my shape."
  },
  {
    name: "Renewal Moon",
    essence: "The Renewal Moon is the year's final turning: not a frantic ending, but integration. Across thirteen moons you have seeded, rooted, bloomed, burned brightly, weathered storms, harvested, released, rested, called out, thawed, and changed. This moon asks what wisdom is now embodied.",
    light: "It brings forgiveness, integration, perspective, and readiness to cross the threshold without dragging every old story by name.",
    shadow: "Its shadow is rushing closure, repeating a familiar cycle just because it is familiar, or believing renewal requires becoming someone unrecognizable.",
    prompt: "What have I learned with my body, not only my mind, during this year?",
    ritual: "Write one word for each of the thirteen moons. Read them as a story. Then write two lists: wisdom I carry forward, and weight I leave outside the new year. Keep the first; release the second before the Days Out of Time.",
    garden: "Save the seeds that taught you the most. Record what thrived, what struggled, and what surprised you. Leave room in next year's plan for volunteers and unexpected teachers.",
    affirmation: "I cross into the new year carrying wisdom, not every weight."
  }
];

const DOT_WISDOM = {
  name: "Days Out of Time",
  essence: "The Days Out of Time belong to no moon. They are a pause between the year that has completed and the year not yet begun: a space for forgiveness, rest, emptying, and listening.",
  light: "They offer release from measurement, achievement, and the demand to become.",
  shadow: "Their shadow is rushing across the threshold while still carrying every unfinished story as an identity.",
  prompt: "What can be released before the new year asks anything new of me?",
  ritual: "Do less on purpose. Name what the completed year taught you, forgive what can be forgiven, and leave one symbolic object, message, or burden behind before the new cycle begins.",
  garden: "Walk the land without correcting it. Notice what winter, dormancy, seeds, and shelter are teaching about the necessity of pause.",
  affirmation: "I am allowed to stand between stories."
};

function cycleLengthForStartYear(startYear) {
  const nextYear = startYear + 1;
  const isLeap = (nextYear % 4 === 0 && nextYear % 100 !== 0) || nextYear % 400 === 0;
  return isLeap ? 366 : 365;
}

function cycleInfo(date) {
  const dayStamp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  let start = ANCHOR;
  let startYear = 2027;

  while (dayStamp >= start + cycleLengthForStartYear(startYear) * DAY) {
    start += cycleLengthForStartYear(startYear) * DAY;
    startYear += 1;
  }

  while (dayStamp < start) {
    startYear -= 1;
    start -= cycleLengthForStartYear(startYear) * DAY;
  }

  const length = cycleLengthForStartYear(startYear);
  const index = Math.floor((dayStamp - start) / DAY);
  const base = { start, startYear, length, cycleStart: new Date(start) };

  if (index >= 364) {
    return {
      ...base,
      dot: true,
      dotDay: index - 363,
      wisdom: DOT_WISDOM,
      moonStart: new Date(start + index * DAY),
      moonEnd: new Date(start + index * DAY)
    };
  }

  const moon = Math.floor(index / 28) + 1;
  const day = (index % 28) + 1;

  return {
    ...base,
    dot: false,
    moon,
    day,
    wisdom: MOONS[moon - 1],
    moonStart: new Date(start + (moon - 1) * 28 * DAY),
    moonEnd: new Date(start + moon * 28 * DAY - DAY)
  };
}

const CURRENT = cycleInfo(new Date());
const ORDER = [...MOONS.map((_, index) => "M" + (index + 1)), "DOT"];

let selectedKey = CURRENT.dot ? "DOT" : "M" + CURRENT.moon;
let activeView = "today";
let wisdomMode = "essence";
let gardenMode = "observe";
let completedSteps = new Set();
let currentCard = null;
let lastCardLabel = "";
let breathRunning = false;
let breathTimers = [];
let breathRounds = 0;

const el = id => document.getElementById(id);
const fmt = date => date.toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC"
});
const fmtShort = date => date.toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC"
});

function infoForKey(key) {
  if (key === "DOT") {
    const moonStart = new Date(CURRENT.start + 364 * DAY);
    const moonEnd = new Date(CURRENT.start + (CURRENT.length - 1) * DAY);
    return {
      key,
      dot: true,
      isToday: CURRENT.dot,
      wisdom: DOT_WISDOM,
      moonStart,
      moonEnd
    };
  }

  const moon = Number(key.slice(1));
  return {
    key,
    dot: false,
    moon,
    isToday: !CURRENT.dot && CURRENT.moon === moon,
    wisdom: MOONS[moon - 1],
    moonStart: new Date(CURRENT.start + (moon - 1) * 28 * DAY),
    moonEnd: new Date(CURRENT.start + moon * 28 * DAY - DAY)
  };
}

function selectedInfo() {
  return infoForKey(selectedKey);
}

function cycleMovement(day) {
  if (day <= 7) return "The Opening · Days 1–7 · Listen, notice, and let the intention form.";
  if (day <= 14) return "The Blossoming · Days 8–14 · Tend what has begun and give it shape.";
  if (day <= 21) return "The Radiance · Days 15–21 · Notice what the fullness of the cycle reveals.";
  return "The Releasing · Days 22–28 · Integrate, forgive, complete, and prepare to let go.";
}

function seasonalNote(info) {
  if (info.dot) return "A threshold outside the moons, just before the new year turns at the Spring Equinox.";
  if (info.moon === 1) return "This moon is anchored by the Spring Equinox, where the Ancient Rhythm year begins.";
  if (info.moon === 4) return "This moon carries the Summer Solstice, the peak of the year's light.";
  if (info.moon === 7) return "This moon carries the Autumn Equinox, where light and darkness meet before the turn inward.";
  if (info.moon === 10) return "This moon carries the Winter Solstice, the deepest darkness and the first promise of returning light.";
  if (info.moon === 13) return "This is the final moon before the Days Out of Time.";
  return "";
}

function buildWheel() {
  const wheel = el("moonWheel");

  MOONS.forEach((moon, index) => {
    const angle = (-90 + index * (360 / 13)) * Math.PI / 180;
    const x = 50 + 39.5 * Math.cos(angle);
    const y = 50 + 39.5 * Math.sin(angle);
    const button = document.createElement("button");

    button.type = "button";
    button.className = "moon-node";
    button.dataset.key = "M" + (index + 1);
    button.style.left = x + "%";
    button.style.top = y + "%";
    button.textContent = String(index + 1);
    button.title = (index + 1) + ". " + moon.name;
    button.setAttribute("aria-label", "Explore Moon " + (index + 1) + ", " + moon.name);
    button.addEventListener("click", () => selectKey(button.dataset.key));

    wheel.appendChild(button);
  });
}

function renderChrome() {
  const info = selectedInfo();

  document.querySelectorAll(".moon-node").forEach(node => {
    node.classList.toggle("is-selected", node.dataset.key === selectedKey);
    node.classList.toggle("is-today", !CURRENT.dot && node.dataset.key === "M" + CURRENT.moon);
  });

  el("dotStar").classList.toggle("is-selected", selectedKey === "DOT");

  if (info.dot) {
    el("coreSymbol").textContent = "✦";
    el("coreDay").textContent = "Between moons";
    el("coreName").textContent = "Days Out of Time";
  } else if (info.isToday) {
    el("coreSymbol").textContent = "☾";
    el("coreDay").textContent = "Day " + CURRENT.day + " of 28";
    el("coreName").textContent = info.wisdom.name;
  } else {
    el("coreSymbol").textContent = "☾";
    el("coreDay").textContent = "Moon " + info.moon + " of 13";
    el("coreName").textContent = info.wisdom.name;
  }

  document.querySelectorAll("[data-view]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.view === activeView);
  });
}

function setOracle({ kicker, title, dates, body, actions }) {
  const panel = el("oraclePanel");
  panel.classList.remove("is-changing");
  void panel.offsetWidth;
  panel.classList.add("is-changing");

  el("oracleKicker").textContent = kicker;
  el("oracleTitle").textContent = title;
  el("oracleDates").textContent = dates || "";
  el("oracleBody").innerHTML = body || "";
  el("oracleActions").innerHTML = actions || "";

  panel.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", () => handleAction(button.dataset.action, button));
  });
}

function actionButton(action, label, primary = false, extra = "") {
  return `<button type="button" class="action-button${primary ? " primary" : ""}" data-action="${action}" ${extra}>${label}</button>`;
}

function render() {
  renderChrome();

  if (activeView === "today") renderToday();
  if (activeView === "wisdom") renderWisdom();
  if (activeView === "ritual") renderPractice();
  if (activeView === "breath") renderBreath();
  if (activeView === "garden") renderGarden();
  if (activeView === "card") renderCard();
  if (activeView === "calendar") renderCalendar();
  if (activeView === "journal") renderJournal();
}

function renderToday() {
  const info = selectedInfo();
  const w = info.wisdom;
  const dates = info.dot
    ? fmt(info.moonStart) + (CURRENT.length > 365 ? " → " + fmt(info.moonEnd) : "")
    : fmt(info.moonStart) + " → " + fmt(info.moonEnd) + (info.isToday ? " · Day " + CURRENT.day + " of 28" : "");

  const movement = info.dot
    ? "Outside the 13 moons · A threshold between stories"
    : info.isToday
      ? cycleMovement(CURRENT.day)
      : "One of thirteen 28-day cycles in the Ancient Rhythm year.";

  setOracle({
    kicker: info.isToday ? "You are here now" : "Exploring the wheel",
    title: w.name,
    dates,
    body: `
      <p class="whisper">${movement}</p>
      <p class="large-text">${w.essence}</p>
      ${seasonalNote(info) ? `<p class="whisper">${seasonalNote(info)}</p>` : ""}
      <p class="script-line">${w.prompt}</p>
    `,
    actions:
      actionButton("view-wisdom", "Enter the Wisdom", true) +
      actionButton("view-ritual", "Begin a Practice") +
      actionButton("view-card", "Reveal a Card")
  });
}

function renderWisdom() {
  const info = selectedInfo();
  const w = info.wisdom;
  const modes = [
    ["essence", "Essence"],
    ["light", "Light"],
    ["shadow", "Shadow"],
    ["reflection", "Reflection"],
    ["affirmation", "Affirmation"]
  ];

  let content = "";
  if (wisdomMode === "essence") content = `<p class="large-text">${w.essence}</p>`;
  if (wisdomMode === "light") content = `<p class="large-text">${w.light}</p>`;
  if (wisdomMode === "shadow") content = `<p class="large-text">${w.shadow}</p>`;
  if (wisdomMode === "reflection") content = `<p class="script-line">${w.prompt}</p>`;
  if (wisdomMode === "affirmation") content = `<p class="script-line">${w.affirmation}</p>`;

  setOracle({
    kicker: "The wisdom",
    title: w.name,
    dates: fmtShort(info.moonStart) + " → " + fmtShort(info.moonEnd),
    body: `
      <div class="mode-row">
        ${modes.map(([mode, label]) => `<button type="button" class="mode-button${wisdomMode === mode ? " is-active" : ""}" data-action="wisdom-mode" data-mode="${mode}">${label}</button>`).join("")}
      </div>
      ${content}
    `,
    actions:
      actionButton("view-ritual", "Turn Wisdom into Practice", true) +
      actionButton("open-guide", "Ask the Guide")
  });
}

function practiceSteps(info) {
  const w = info.wisdom;
  return [
    ["Arrive", "Place your feet on the ground. Let your shoulders soften and take three unhurried breaths."],
    ["Listen", w.ritual],
    ["Speak", w.prompt],
    ["Tend", "Choose one visible act of care: " + w.garden],
    ["Close", w.affirmation]
  ];
}

function renderPractice() {
  const info = selectedInfo();
  const w = info.wisdom;
  const steps = practiceSteps(info);
  const candles = steps.map((_, index) =>
    `<span class="candle${completedSteps.has(index) ? " is-lit" : ""}">♨</span>`
  ).join("");

  setOracle({
    kicker: "Sacred practice",
    title: "Move Through the Ritual",
    dates: w.name,
    body: `
      <p>Touch each moment as you complete it. The candles brighten as the practice becomes embodied, not merely read.</p>
      <div class="candle-row">${candles}</div>
      <p class="whisper">${completedSteps.size} of ${steps.length} moments complete</p>
      <div class="practice-steps">
        ${steps.map(([label, text], index) => `
          <button type="button" class="practice-step${completedSteps.has(index) ? " is-done" : ""}" data-action="toggle-step" data-step="${index}">
            <span class="step-orb">${completedSteps.has(index) ? "✦" : "○"}</span>
            <span><strong>${label}.</strong> ${text}</span>
          </button>
        `).join("")}
      </div>
    `,
    actions:
      actionButton("view-breath", "Breathe with This Moon", true) +
      actionButton("view-wisdom", "Return to Wisdom")
  });
}

function renderBreath() {
  setOracle({
    kicker: "Sacred practice",
    title: "Breathe Inside This Moon",
    dates: selectedInfo().wisdom.name,
    body: `
      <div class="breath-orb" id="breathOrb"><span id="breathText">Begin</span></div>
      <p id="breathStatus">Three slow rounds: breathe in for four, hold softly for two, release for six.</p>
      <p class="whisper">${selectedInfo().wisdom.affirmation}</p>
    `,
    actions:
      actionButton(breathRunning ? "stop-breath" : "start-breath", breathRunning ? "Stop" : "Begin Breathing", true) +
      actionButton("view-ritual", "Return to Practice")
  });
}

function renderGarden() {
  const info = selectedInfo();
  const w = info.wisdom;
  const teachings = {
    observe: "Spend five quiet minutes noticing who is already living, feeding, sheltering, or traveling through this place. Let attention come before intervention.",
    protect: "Leave or create one small refuge: stems standing, leaves resting, a brush corner, still water, or a patch you choose not to tidy.",
    nourish: "Feed a relationship rather than forcing an outcome: soil life, a sequence of flowers, safe water, saved seed, or habitat that continues after you leave."
  };

  setOracle({
    kicker: "Tend the living world",
    title: w.name + " in the Garden",
    dates: fmtShort(info.moonStart) + " → " + fmtShort(info.moonEnd),
    body: `
      <p class="large-text">${w.garden}</p>
      <div class="mode-row">
        <button type="button" class="mode-button${gardenMode === "observe" ? " is-active" : ""}" data-action="garden-mode" data-mode="observe">Observe</button>
        <button type="button" class="mode-button${gardenMode === "protect" ? " is-active" : ""}" data-action="garden-mode" data-mode="protect">Protect</button>
        <button type="button" class="mode-button${gardenMode === "nourish" ? " is-active" : ""}" data-action="garden-mode" data-mode="nourish">Nourish</button>
      </div>
      <p>${teachings[gardenMode]}</p>
    `,
    actions: actionButton("view-today", "Return to Today’s Moon", true)
  });
}

function drawCard() {
  const w = selectedInfo().wisdom;
  const cards = [
    ["The Light", w.light],
    ["The Shadow", w.shadow],
    ["The Reflection", w.prompt],
    ["The Affirmation", w.affirmation],
    ["The Garden", w.garden]
  ];

  let next = cards[Math.floor(Math.random() * cards.length)];
  if (cards.length > 1) {
    while (next[0] === lastCardLabel) {
      next = cards[Math.floor(Math.random() * cards.length)];
    }
  }

  currentCard = next;
  lastCardLabel = next[0];
}

function renderCard() {
  if (!currentCard) drawCard();

  setOracle({
    kicker: "An oracle reveal",
    title: currentCard[0],
    dates: selectedInfo().wisdom.name,
    body: `<p class="script-line">${currentCard[1]}</p>`,
    actions:
      actionButton("draw-card", "Reveal Another", true) +
      actionButton("view-wisdom", "Enter the Wisdom")
  });
}

function renderCalendar() {
  setOracle({
    kicker: "Two doors, one rhythm",
    title: "The Calendar Is the Map",
    dates: "This companion is the doorway",
    body: `
      <p><strong>The revamped calendar</strong> holds the complete Ancient Rhythm year: all thirteen moons, dates, equinoxes, solstices, Days Out of Time, and the larger pattern of time. It answers, “When?”</p>
      <p><strong>This Moon Wheel</strong> is the daily companion: the moon you are in, its wisdom, ritual, garden teaching, and reflection. It answers, “How do I live inside this cycle?”</p>
      <p class="whisper">Ancient Rhythm moons are 28-day sacred calendar cycles anchored to the equinoxes, not exact astronomical moon-phase predictions.</p>
    `,
    actions: `<a class="action-button primary" href="YOUR-CALENDAR-LINK-HERE" target="_blank" rel="noopener">Open the Full Calendar</a>` +
      actionButton("view-today", "Return to the Wheel")
  });
}

function renderJournal() {
  setOracle({
    kicker: "When you are ready",
    title: "Walk the Whole Year by Hand",
    dates: "A quiet invitation, never a countdown",
    body: `
      <p>The journal is the private, written companion to this experience: a place to record intentions, patterns, releases, and discoveries across all thirteen moons.</p>
      <p>There is no pressure to decide anything. The invitation is simply here when the practice feels like yours.</p>
    `,
    actions: `<a class="action-button primary" href="YOUR-GUMROAD-LINK-HERE" target="_blank" rel="noopener">Explore the Journal</a>` +
      actionButton("view-today", "Return to the Wheel")
  });
}

function stopBreath() {
  breathRunning = false;
  breathTimers.forEach(timer => clearTimeout(timer));
  breathTimers = [];
}

function later(callback, delay) {
  const timer = setTimeout(callback, delay);
  breathTimers.push(timer);
}

function startBreath() {
  stopBreath();
  breathRunning = true;
  breathRounds = 0;
  renderBreath();

  const runRound = () => {
    if (!breathRunning) return;

    const orb = el("breathOrb");
    const text = el("breathText");
    const status = el("breathStatus");
    if (!orb || !text || !status) {
      stopBreath();
      return;
    }

    orb.className = "breath-orb is-in";
    text.textContent = "Breathe in";
    status.textContent = "Round " + (breathRounds + 1) + " of 3 · In for four";

    later(() => {
      if (!breathRunning) return;
      orb.className = "breath-orb is-hold";
      text.textContent = "Hold softly";
      status.textContent = "Round " + (breathRounds + 1) + " of 3 · Hold for two";

      later(() => {
        if (!breathRunning) return;
        orb.className = "breath-orb is-out";
        text.textContent = "Release";
        status.textContent = "Round " + (breathRounds + 1) + " of 3 · Out for six";

        later(() => {
          if (!breathRunning) return;
          breathRounds += 1;

          if (breathRounds >= 3) {
            breathRunning = false;
            orb.className = "breath-orb";
            text.textContent = "Complete";
            status.textContent = "Three rounds complete. Notice what has changed in your body.";
            renderChrome();
            const actions = el("oracleActions");
            if (actions) {
              actions.innerHTML =
                actionButton("start-breath", "Breathe Again", true) +
                actionButton("view-ritual", "Return to Practice");
              actions.querySelectorAll("[data-action]").forEach(button => {
                button.addEventListener("click", () => handleAction(button.dataset.action, button));
              });
            }
            return;
          }

          runRound();
        }, 6000);
      }, 2000);
    }, 4000);
  };

  runRound();
}

function setView(view) {
  if (view !== "breath") stopBreath();
  activeView = view;
  render();
}

function selectKey(key) {
  stopBreath();
  selectedKey = key;
  completedSteps = new Set();
  currentCard = null;
  lastCardLabel = "";
  render();
}

function returnToToday() {
  selectedKey = CURRENT.dot ? "DOT" : "M" + CURRENT.moon;
  activeView = "today";
  completedSteps = new Set();
  currentCard = null;
  lastCardLabel = "";
  stopBreath();
  render();
}

function moveSelection(direction) {
  const index = ORDER.indexOf(selectedKey);
  const nextIndex = (index + direction + ORDER.length) % ORDER.length;
  selectKey(ORDER[nextIndex]);
}

function handleAction(action, button) {
  if (action === "view-today") setView("today");
  if (action === "view-wisdom") setView("wisdom");
  if (action === "view-ritual") setView("ritual");
  if (action === "view-breath") setView("breath");
  if (action === "view-garden") setView("garden");
  if (action === "view-card") setView("card");
  if (action === "view-calendar") setView("calendar");
  if (action === "view-journal") setView("journal");
  if (action === "wisdom-mode") {
    wisdomMode = button.dataset.mode;
    renderWisdom();
  }
  if (action === "garden-mode") {
    gardenMode = button.dataset.mode;
    renderGarden();
  }
  if (action === "toggle-step") {
    const step = Number(button.dataset.step);
    if (completedSteps.has(step)) completedSteps.delete(step);
    else completedSteps.add(step);
    renderPractice();
  }
  if (action === "start-breath") startBreath();
  if (action === "stop-breath") {
    stopBreath();
    renderBreath();
  }
  if (action === "draw-card") {
    drawCard();
    renderCard();
  }
  if (action === "open-guide") openGuideDrawer();
  if (action === "return-today") returnToToday();
}

// ===== MOON GUIDE =====
function guideInfoFor(question) {
  const asksForToday = question.includes("today") || question.includes("current") || question.includes("now");
  if (asksForToday) {
    return {
      dot: CURRENT.dot,
      moon: CURRENT.moon,
      day: CURRENT.day,
      wisdom: CURRENT.wisdom,
      moonStart: CURRENT.moonStart,
      moonEnd: CURRENT.moonEnd
    };
  }
  return selectedInfo();
}

function answerGuide(rawQuestion) {
  const q = rawQuestion.toLowerCase();
  const info = guideInfoFor(q);
  const w = info.wisdom;

  if (q.includes("price") || q.includes("cost") || q.includes("how much")) {
    return "The journal is $27. I am answering with the price only because you asked for it directly; you are welcome to simply receive the wisdom here.";
  }

  if (q.includes("journal") || q.includes("buy") || q.includes("purchase") || q.includes("order")) {
    return "The journal is the private, written companion to this Moon Wheel: a place to record intentions, patterns, releases, and discoveries across all thirteen moons. The quiet invitation lives under Journal at the top of the page, whenever you want it.";
  }

  if (q.includes("calendar") && (q.includes("differ") || q.includes("vs") || q.includes("versus"))) {
    return "The revamped calendar is the complete map: all thirteen moons, dates, equinoxes, solstices, and Days Out of Time. This Moon Wheel is the daily doorway: today's moon, its wisdom, ritual, garden teaching, and reflection.";
  }

  if (q.includes("ritual") || q.includes("practice") || q.includes("ceremony")) {
    return "A practice for " + w.name + ": " + w.ritual;
  }

  if (q.includes("affirm") || q.includes("mantra")) {
    return "Carry this from " + w.name + ": “" + w.affirmation + "”";
  }

  if (q.includes("garden") || q.includes("pollinator") || q.includes("earth") || q.includes("plant")) {
    return w.name + " in the garden: " + w.garden;
  }

  if (q.includes("release") || q.includes("let go") || q.includes("shadow")) {
    return "The shadow teaching of " + w.name + " is this: " + w.shadow + " Its reflection asks: " + w.prompt;
  }

  if (q.includes("wisdom") || q.includes("teach") || q.includes("meaning") || q.includes("essence")) {
    return w.name + " teaches this: " + w.essence;
  }

  if (q.includes("prompt") || q.includes("reflect") || q.includes("write")) {
    return "Write with this question from " + w.name + ": " + w.prompt;
  }

  if (q.includes("end") || q.includes("next moon")) {
    return w.name + " completes on " + fmt(info.moonEnd) + ". The next cycle begins the following day.";
  }

  if (q.includes("today") || q.includes("current") || q.includes("now") || q.includes("moon")) {
    if (CURRENT.dot) {
      return "Today is Day Out of Time " + CURRENT.dotDay + ", outside the thirteen moons. Its teaching is rest, forgiveness, release, and listening between stories.";
    }
    return "Today we are in Moon " + CURRENT.moon + " of 13, the " + CURRENT.wisdom.name + ", on Day " + CURRENT.day + " of 28. It runs " + fmt(CURRENT.moonStart) + " through " + fmt(CURRENT.moonEnd) + ". Its reflection is: " + CURRENT.wisdom.prompt;
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Welcome. You are exploring the " + w.name + ". Ask me for its wisdom, ritual, affirmation, garden teaching, or what may be ready to release.";
  }

  if (q.includes("thank")) {
    return "You are welcome. Move gently, and let the cycle teach at its own pace. ☾";
  }

  return "I can offer this moon's wisdom, light, shadow, ritual, affirmation, garden teaching, dates, or reflection. Try: “Teach me this moon,” “Give me a ritual,” or “What wants release?”";
}

function addChatMessage(who, text) {
  const log = el("chatLog");
  const paragraph = document.createElement("p");
  const label = document.createElement("b");
  label.textContent = who + ": ";
  paragraph.appendChild(label);
  paragraph.appendChild(document.createTextNode(text));
  log.appendChild(paragraph);
  paragraph.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function askGuide(text) {
  const question = text.trim();
  if (!question) return;
  addChatMessage("You", question);
  addChatMessage("Moon Guide", answerGuide(question));
}

function openGuideDrawer() {
  el("guideDrawer").classList.add("is-open");
  el("guideDrawer").setAttribute("aria-hidden", "false");
  el("drawerScrim").classList.add("is-open");
  setTimeout(() => el("chatInput").focus(), 250);
}

function closeGuideDrawer() {
  el("guideDrawer").classList.remove("is-open");
  el("guideDrawer").setAttribute("aria-hidden", "true");
  el("drawerScrim").classList.remove("is-open");
}

// ===== EVENTS =====
document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

el("prevMoon").addEventListener("click", () => moveSelection(-1));
el("nextMoon").addEventListener("click", () => moveSelection(1));
el("returnToday").addEventListener("click", returnToToday);
el("moonCore").addEventListener("click", returnToToday);
el("dotStar").addEventListener("click", () => selectKey("DOT"));
el("openCalendar").addEventListener("click", () => setView("calendar"));
el("openJournal").addEventListener("click", () => setView("journal"));
el("brandHome").addEventListener("click", event => {
  event.preventDefault();
  returnToToday();
});
el("openGuide").addEventListener("click", openGuideDrawer);
el("closeGuide").addEventListener("click", closeGuideDrawer);
el("drawerScrim").addEventListener("click", closeGuideDrawer);

document.querySelectorAll(".guide-chips button").forEach(button => {
  button.addEventListener("click", () => askGuide(button.dataset.question));
});

el("chatForm").addEventListener("submit", event => {
  event.preventDefault();
  askGuide(el("chatInput").value);
  el("chatInput").value = "";
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeGuideDrawer();
  if (event.key === "ArrowLeft" && !el("guideDrawer").classList.contains("is-open")) moveSelection(-1);
  if (event.key === "ArrowRight" && !el("guideDrawer").classList.contains("is-open")) moveSelection(1);
});

buildWheel();
render();
addChatMessage("Moon Guide", "Welcome. Ask me to teach you this moon, offer a ritual, speak an affirmation, or explore what may be ready to release.");
