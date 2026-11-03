// ===== ANCIENT RHYTHM MOON MATH =====
const DAY = 86400000;
const ANCHOR = Date.UTC(2027, 2, 20); // Moon 1 begins Sat, Mar 20, 2027

const MOONS = [
  {
    name: "Seed Moon",
    essence: "The Seed Moon arrives with the Spring Equinox, when life has not yet been asked to prove itself in bloom. Its wisdom is germination: the sacred intelligence of beginning quietly, before there is visible evidence that the new life will succeed.",
    light: "It brings renewal, courage, curiosity, and the willingness to let an old identity end so something truer can begin.",
    shadow: "Its shadow is forcing growth—comparing a seed to a flower, scattering energy across too many beginnings, or demanding certainty before taking the first faithful step.",
    prompt: "What is asking to begin in me before I can prove it will succeed?",
    ritual: "Hold a seed, stone, or small object that represents one beginning. Speak the beginning aloud—not as a promise to perform, but as something you are willing to tend. Place the object somewhere you will see it throughout the moon, and give the beginning one small, real act of care.",
    garden: "Watch for the earliest pollinators and leave early flowers standing when you can. Prepare the soil gently, but do not strip away every stem and leaf; life is still sheltering there.",
    affirmation: "I do not have to bloom today to be alive with beginning."
  },
  {
    name: "Root Moon",
    essence: "The Root Moon turns attention downward—to the body, the home, nourishment, ancestry, and the unseen ground that makes visible growth possible. It asks not how high you can reach, but how honestly you are rooted.",
    light: "It brings steadiness, belonging, nourishment, and the patience to build a foundation that can hold the life you say you want.",
    shadow: "Its shadow is mistaking control for safety, clinging to familiar ground after it has stopped nourishing you, or neglecting basic needs while chasing spiritual heights.",
    prompt: "What kind of ground am I asking my life to grow from?",
    ritual: "Stand barefoot on the earth if you can. Feel your weight fully supported. Name three things your body genuinely needs this moon, then tend one corner of your home as an act of devotion rather than productivity.",
    garden: "Feed the soil before demanding more from it. Notice moisture, texture, and life beneath the surface. Native roots are quietly building the habitat that later blooms will depend upon.",
    affirmation: "My roots are not a cage; they are how I rise."
  },
  {
    name: "Bloom Moon",
    essence: "The Bloom Moon is the moon of opening. A blossom does not apologize for its color or hide its fragrance until it feels worthy. Yet blooming is also discernment: not every visitor who is attracted to beauty is meant to receive all of you.",
    light: "It brings expression, pleasure, creativity, attraction, and the courage to be witnessed in your fullness.",
    shadow: "Its shadow is performing for approval, opening to everyone, or confusing attention with nourishment. Visibility without boundaries can leave the bloom exhausted.",
    prompt: "Where am I ready to be seen without shrinking—or performing?",
    ritual: "Place a flower where you will encounter it often. Beneath it, write one gift you usually minimize. During this moon, share one true creative expression without explaining or apologizing for it.",
    garden: "Notice which flowers draw bees and butterflies. Beauty here is ecological relationship, not decoration. Plant for a succession of blooms so pollinators are fed across the season, and avoid pesticides that turn invitation into harm.",
    affirmation: "My beauty is not a request for permission."
  },
  {
    name: "Sun Moon",
    essence: "The Sun Moon carries the Summer Solstice and the longest light. It illuminates what has been growing, what has become undeniable, and what now requires shade, limits, or honest change. Peak light reveals both vitality and exhaustion.",
    light: "It brings clarity, vitality, leadership, celebration, and the courage to stand in the truth of your own life.",
    shadow: "Its shadow is overexposure—burning through your reserves, proving worth through output, or believing rest means you were never radiant at all.",
    prompt: "What has the light made impossible for me to ignore?",
    ritual: "At sunrise or sunset, write one truth the light has revealed. Then deliberately choose one form of shade: a boundary, an afternoon of rest, a no, or an earlier ending to the day. Let discernment be part of your radiance.",
    garden: "Water deeply rather than constantly. Add mulch to protect roots, and offer pollinators a shallow dish of water with stones where they can land safely.",
    affirmation: "I can shine without burning myself away."
  },
  {
    name: "Thunder Moon",
    essence: "The Thunder Moon belongs to high-summer storms: pressure gathers, the air changes, and something honest breaks through. Anger, grief, desire, and truth may all arrive as weather—powerful information, but not weather you must obey blindly.",
    light: "It brings honesty, emotional courage, movement, and the clearing that can follow a long-held silence.",
    shadow: "Its shadow is reactivity: sending words like lightning, fearing your own intensity, or suppressing the storm until it erupts sideways.",
    prompt: "What truth has been rumbling beneath my politeness?",
    ritual: "Write the unsent letter. Say everything without censoring it. Then pause; tear it, bury it, dissolve it in water, or safely burn it when conditions permit. Move the energy through your body with walking, shaking, drumming, or breath before making any decision.",
    garden: "After rain, notice where water gathers and where it runs away. Support tall plants before the next storm and preserve sheltered corners where pollinators can wait out the weather.",
    affirmation: "My intensity is information, not a defect."
  },
  {
    name: "Harvest Moon",
    essence: "The Harvest Moon asks for discernment. Not everything planted has ripened, and not everything ripe must be kept. This is a moon of gratitude, honest assessment, completion, and sharing what has truly matured.",
    light: "It brings gratitude, provision, completion, and the satisfaction of recognizing your own labor without diminishing it.",
    shadow: "Its shadow is scarcity—hoarding, harvesting too soon, overworking to prove the season mattered, or measuring your worth only by visible yield.",
    prompt: "What has actually ripened, and what deserves more time instead of judgment?",
    ritual: "Prepare or share a seasonal food. Name your harvest in two columns: what can be seen, and what changed invisibly within you. Offer one thing—time, food, knowledge, beauty—without turning generosity into self-abandonment.",
    garden: "Collect seeds from strong plants, but leave some seed heads and late blooms for birds, bees, and the garden’s continuing story. A harvest can feed more than the gardener.",
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
    ritual: "Hold something warm in both hands. Make two lists: what I will protect, and what I will release. Then physically cover or shelter one vulnerable thing—a plant, a plan, your evening, your heart—as a symbolic act of care.",
    garden: "Leave stems, leaves, and seed heads standing whenever possible. They are winter homes and future food. Notice the date of hard frosts and what survives in sheltered places.",
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
    ritual: "Send one honest voice message to a trusted person: not a performance, not a crisis—just your real location. Sing, hum, chant, or read aloud afterward and let your own voice return to your body.",
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
    essence: "The Renewal Moon is the year’s final turning: not a frantic ending, but integration. Across thirteen moons you have seeded, rooted, bloomed, burned brightly, weathered storms, harvested, released, rested, called out, thawed, and changed. This moon asks what wisdom is now embodied.",
    light: "It brings forgiveness, integration, perspective, and readiness to cross the threshold without dragging every old story by name.",
    shadow: "Its shadow is rushing closure, repeating a familiar cycle just because it is familiar, or believing renewal requires becoming someone unrecognizable.",
    prompt: "What have I learned with my body—not only my mind—during this year?",
    ritual: "Write one word for each of the thirteen moons. Read them as a story. Then write two lists: wisdom I carry forward, and weight I leave outside the new year. Keep the first where you can find it; release the second before the Days Out of Time.",
    garden: "Save the seeds that taught you the most. Record what thrived, what struggled, and what surprised you. Leave room in next year’s plan for volunteers and unexpected teachers.",
    affirmation: "I cross into the new year carrying wisdom, not every weight."
  }
];

function lenFor(startYear) {
  const next = startYear + 1;
  return ((next % 4 === 0 && next % 100 !== 0) || next % 400 === 0) ? 366 : 365;
}

function moonInfo(date) {
  const d = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  let start = ANCHOR;
  let year = 2027;

  while (d >= start + lenFor(year) * DAY) {
    start += lenFor(year) * DAY;
    year++;
  }

  while (d < start) {
    year--;
    start -= lenFor(year) * DAY;
  }

  const idx = Math.floor((d - start) / DAY);
  const cycleStart = new Date(start);

  if (idx >= 364) {
    return {
      dot: true,
      dotDay: idx - 363,
      cycleStart,
      dotDate: new Date(start + idx * DAY)
    };
  }

  const moon = Math.floor(idx / 28) + 1;
  const day = (idx % 28) + 1;

  return {
    dot: false,
    moon,
    day,
    cycleStart,
    wisdom: MOONS[moon - 1],
    moonStart: new Date(start + (moon - 1) * 28 * DAY),
    moonEnd: new Date(start + moon * 28 * DAY - DAY)
  };
}

const fmt = d => d.toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC"
});

function cycleMovement(day) {
  if (day <= 7) return "The Opening · Days 1–7 · Listen, notice, and let the intention form.";
  if (day <= 14) return "The Blossoming · Days 8–14 · Tend what has begun and give it shape.";
  if (day <= 21) return "The Radiance · Days 15–21 · Notice what the fullness of the cycle reveals.";
  return "The Releasing · Days 22–28 · Integrate, forgive, complete, and prepare to let go.";
}

function seasonalNote(moon) {
  if (moon === 1) return "This moon is anchored by the Spring Equinox, the threshold where the Ancient Rhythm year begins.";
  if (moon === 4) return "This moon carries the Summer Solstice, the peak of the year’s light.";
  if (moon === 7) return "This moon carries the Autumn Equinox, where light and darkness meet before the turn inward.";
  if (moon === 10) return "This moon carries the Winter Solstice, the deepest darkness and the first promise of returning light.";
  if (moon === 13) return "This is the final moon before the Days Out of Time and the turning of a new Ancient Rhythm year.";
  return "";
}

// ===== FILL THE PAGE =====
const now = moonInfo(new Date());

if (now.dot) {
  document.getElementById("moonName").textContent = "Day Out of Time " + now.dotDay;
  document.getElementById("moonDates").textContent = fmt(now.dotDate);
  document.getElementById("moonCycle").textContent =
    "Outside the 13 moons · A threshold between stories";
  document.getElementById("moonPrompt").textContent =
    "What can be released before the new year asks anything new of me?";
  document.getElementById("moonThemeHeading").textContent = "Time Between Stories";
  document.getElementById("moonEssence").textContent =
    "The Days Out of Time belong to no moon. They are a pause between the year that has completed and the year not yet begun—a space for forgiveness, rest, emptying, and listening.";
  document.getElementById("moonLight").textContent =
    "They offer release from measurement, achievement, and the demand to become.";
  document.getElementById("moonShadow").textContent =
    "Their shadow is rushing across the threshold while still carrying every unfinished story as an identity.";
  document.getElementById("moonAffirmation").textContent =
    "I am allowed to stand between stories.";
  document.getElementById("moonRitual").textContent =
    "Do less on purpose. Name what the completed year taught you, forgive what can be forgiven, and leave one symbolic object, message, or burden behind before the new cycle begins.";
  document.getElementById("moonGarden").textContent =
    "Walk the land without correcting it. Notice what winter, dormancy, seeds, and shelter are teaching about the necessity of pause.";
} else {
  const w = now.wisdom;

  document.getElementById("moonName").textContent =
    "Moon " + now.moon + " of 13 · " + w.name;
  document.getElementById("moonDates").textContent =
    fmt(now.moonStart) + " → " + fmt(now.moonEnd) + " · Day " + now.day + " of 28";
  document.getElementById("moonCycle").textContent = cycleMovement(now.day);
  document.getElementById("moonPrompt").textContent = w.prompt;
  document.getElementById("moonThemeHeading").textContent = w.name;
  document.getElementById("moonEssence").textContent = w.essence;
  document.getElementById("moonLight").textContent = w.light;
  document.getElementById("moonShadow").textContent = w.shadow;
  document.getElementById("moonAffirmation").textContent = w.affirmation;
  document.getElementById("moonRitual").textContent = w.ritual;
  document.getElementById("moonGarden").textContent = w.garden;
}

// ===== MOON GUIDE =====
const log = document.getElementById("chatLog");

function say(who, text) {
  log.innerHTML += "<p><b>" + who + ":</b> " + text + "</p>";
  log.lastElementChild.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function answer(rawQuestion) {
  const q = rawQuestion.toLowerCase();
  const t = moonInfo(new Date());

  if (q.includes("price") || q.includes("cost") || q.includes("how much")) {
    return "The journal is $27. You are welcome simply to receive the wisdom here; pricing is only here because you asked directly.";
  }

  if (q.includes("journal") || q.includes("buy") || q.includes("purchase") || q.includes("order")) {
    return "The journal is the private, written companion to this experience—a place to record intentions, patterns, releases, and discoveries across all 13 moons. If you feel drawn to explore it, the gentle invitation is near the bottom of this page. There is no need to decide anything now.";
  }

  if (
    (q.includes("calendar") && (q.includes("differ") || q.includes("vs") || q.includes("versus"))) ||
    q.includes("revamped calendar")
  ) {
    return "The revamped calendar is the complete map: all 13 moons, dates, equinoxes, solstices, and Days Out of Time. This companion is the daily doorway: today’s moon, its wisdom, ritual, garden teaching, and reflection. The journal is the private place where you record what the cycle is changing in you.";
  }

  if (t.dot) {
    if (q.includes("ritual") || q.includes("practice")) {
      return "For a Day Out of Time, do less on purpose. Name what the completed year taught you, forgive what can be forgiven, and leave one symbolic burden outside the new year.";
    }
    if (q.includes("affirm")) {
      return "Carry this sentence: “I am allowed to stand between stories.”";
    }
    if (q.includes("release") || q.includes("let go")) {
      return "Release is the teaching of this threshold. Ask what belongs to the completed year and does not need to be carried as an identity into the next one.";
    }
    return "We are in Day Out of Time " + t.dotDay + ", outside the 13 moons. This is a threshold for rest, forgiveness, release, and listening before the new Ancient Rhythm year turns at the Spring Equinox.";
  }

  const w = t.wisdom;

  if (q.includes("wisdom") && (q.includes("ritual") || q.includes("practice"))) {
    return w.name + " teaches this: " + w.essence + " Its ritual is this: " + w.ritual;
  }

  if (q.includes("ritual") || q.includes("practice") || q.includes("ceremony")) {
    return "A ritual for " + w.name + ": " + w.ritual;
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

  if (q.includes("year") && (q.includes("start") || q.includes("begin") || q.includes("turn"))) {
    return "The Ancient Rhythm year turns at the Spring Equinox. This cycle began " + fmt(t.cycleStart) + ".";
  }

  if (q.includes("intention") || q.includes("begin") || q.includes("goal") || q.includes("start something")) {
    return "Within " + w.name + ", begin from its light: " + w.light + " Let the reflection be your compass: " + w.prompt;
  }

  if (q.includes("wisdom") || q.includes("teach") || q.includes("meaning") || q.includes("essence") || q.includes("about this moon")) {
    const season = seasonalNote(t.moon);
    return w.name + " teaches this: " + w.essence + (season ? " " + season : "");
  }

  if (q.includes("equinox") || q.includes("solstice") || q.includes("season")) {
    const season = seasonalNote(t.moon);
    return season || "This moon is not the one carrying an equinox or solstice in the Ancient Rhythm year. Its teaching is found in its own movement: " + w.essence;
  }

  if (q.includes("end") || q.includes("next moon")) {
    return w.name + " completes on " + fmt(t.moonEnd) + ". The next Ancient Rhythm moon begins the following day.";
  }

  if (q.includes("phase") || q.includes("quarter") || q.includes("week")) {
    return "Ancient Rhythm follows the movement inside each 28-day cycle rather than claiming an exact astronomical moon phase. Right now we are in " + cycleMovement(t.day);
  }

  if (q.includes("prompt") || q.includes("reflect") || q.includes("write")) {
    return "Write with this question from " + w.name + ": " + w.prompt;
  }

  if (q.includes("light")) {
    return "The light of " + w.name + ": " + w.light;
  }

  if (q.includes("moon") || q.includes("today") || q.includes("now") || q.includes("current")) {
    return "We are in Moon " + t.moon + " of 13, the " + w.name + ", on Day " +
      t.day + " of 28. It runs " + fmt(t.moonStart) + " through " + fmt(t.moonEnd) +
      ". " + cycleMovement(t.day) + " Its central reflection is: " + w.prompt;
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Welcome. We are living inside the " + w.name + ". You might ask me for its wisdom, a ritual, an affirmation, a garden teaching, or what may be asking for release.";
  }

  if (q.includes("thank")) {
    return "You are welcome. Move gently, and let the cycle teach at its own pace. ☾";
  }

  return "I can offer this moon’s wisdom, light, shadow, ritual, affirmation, garden teaching, dates, or reflection. You might ask: “Teach me this moon,” “Give me a ritual,” or “What wants release?”";
}

function askGuide(text) {
  const question = text.trim();
  if (!question) return;
  say("You", question);
  say("Moon Guide", answer(question));
}

document.getElementById("chatSend").onclick = () => {
  const box = document.getElementById("chatInput");
  askGuide(box.value);
  box.value = "";
};

document.getElementById("chatInput").addEventListener("keydown", event => {
  if (event.key === "Enter") document.getElementById("chatSend").click();
});

document.querySelectorAll(".ask-chip").forEach(button => {
  button.addEventListener("click", () => askGuide(button.dataset.question));
});

say(
  "Moon Guide",
  "Welcome. Ask me to teach you this moon, offer a ritual, speak an affirmation, or explore what may be ready to release."
);
