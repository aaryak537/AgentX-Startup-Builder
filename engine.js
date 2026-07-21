window.AgentX = (() => {

  const IDEA_KEY = "agentx_idea";
  const STARTUP_KEY = "agentx_startup";
  const PROGRESS_KEY = "agentx_progress";

  const DEFAULT_IDEA = "I want to start a bakery.";
  const VERSION = "AgentX AI Engine v1.0";

  function hashString(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return () => {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    };
  }

  function makeRng(seedStr) {
    const seedFn = hashString(seedStr);
    let s = seedFn() * 1e9;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  function pick(rng, arr) {
    return arr[Math.floor(rng() * arr.length)];
  }

  function range(rng, min, max) {
    return Math.floor(min + rng() * (max - min));
  }

  /* ---------------------------- categories ---------------------------- */
  // order matters: more specific domain keywords are checked before the
  // generic "tech" bucket, so e.g. "AI healthcare app" lands in health, not tech
  const CATEGORY_ORDER = ["food", "health", "fashion", "fintech", "education", "travel", "eco", "tech", "generic"];

  const CATEGORIES = {
    food: {
      keywords: ["bakery", "cafe", "café", "food", "restaurant", "kitchen", "snack", "coffee", "bake", "meal", "tiffin", "catering"],
      icon: "🥐",
      palette: ["#F2994A", "#EB5757", "#FFF3E0", "#4A2E1E", "#F2C94C"],
      prefixes: ["Sunrise", "Golden", "Harvest", "Rustic", "Corner", "Homely", "Heritage", "Wholesome"],
      suffixes: ["Bakery", "Kitchen", "Eatery", "Foods", "Table", "Kitchens"],
      competitorPool: ["FreshCrumb", "BreadHouse & Co", "Urban Oven", "LocalLoaf", "The Daily Knead"],
      marketLabel: "Global bakery & food market",
      marketRange: [40, 90],
      cagr: [4.5, 9.5],
      productList: ["Signature baked goods & desserts", "Made-to-order custom cakes", "Daily fresh bread & pastries", "Healthy & organic ingredient options"],
    },
    tech: {
      keywords: ["app", "ai", "saas", "software", "platform", "tech", "automation", "tool", "startup", "system"],
      icon: "🤖",
      palette: ["#4F8CFF", "#8B5CF6", "#0B1120", "#34D399", "#EDF1F9"],
      prefixes: ["Nimbus", "Vertex", "Quanta", "Flux", "Nexa", "Orbit", "Zenith", "Pulse"],
      suffixes: ["Labs", "AI", "Systems", "Works", "Studio", "Cloud"],
      competitorPool: ["Northstar AI", "CoreStack", "Loopwise", "BrightPath Tech", "DataForge"],
      marketLabel: "Global SaaS & AI tooling market",
      marketRange: [90, 260],
      cagr: [12, 24],
      productList: ["AI-powered core product engine", "Team collaboration workspace", "Usage analytics & insights dashboard", "Enterprise-grade integrations"],
    },
    health: {
      keywords: ["health", "medical", "clinic", "fitness", "wellness", "hospital", "therapy", "diagnos", "care"],
      icon: "🩺",
      palette: ["#2FBFA0", "#1E6F5C", "#EAF7F3", "#0B3B36", "#7CE0C6"],
      prefixes: ["Vital", "Pulse", "Wellness", "CarePoint", "Northline", "PureHeal", "Restore"],
      suffixes: ["Health", "Care", "Clinic", "Wellness", "Medix"],
      competitorPool: ["CareFirst Health", "VitalCircle", "MediSpring", "WellPath Clinics", "PureCare Group"],
      marketLabel: "Global digital health market",
      marketRange: [110, 300],
      cagr: [10, 19],
      productList: ["Personalised care & treatment plans", "Remote consultation platform", "Preventive wellness programs", "Patient record & analytics system"],
    },
    fashion: {
      keywords: ["fashion", "clothing", "apparel", "boutique", "wear", "style", "textile", "garment"],
      icon: "🧵",
      palette: ["#D97757", "#2B2B2B", "#F4F1EA", "#B08968", "#8A6D5C"],
      prefixes: ["Loom", "Muse", "Atelier", "Verve", "Weft", "Solene", "Drift"],
      suffixes: ["Studio", "Apparel", "Collective", "Threads", "Co."],
      competitorPool: ["Studio Weft", "Maison Verve", "Loomcraft", "Atelier North", "Threadline"],
      marketLabel: "Global apparel & fashion market",
      marketRange: [60, 180],
      cagr: [6, 12],
      productList: ["Signature seasonal collections", "Made-to-measure customisation", "Sustainable fabric sourcing", "Direct-to-consumer online store"],
    },
    fintech: {
      keywords: ["fintech", "finance", "bank", "payment", "invest", "lending", "wallet", "insurance"],
      icon: "💳",
      palette: ["#3B82F6", "#111827", "#E5E7EB", "#22C55E", "#1D4ED8"],
      prefixes: ["Ledger", "Northbridge", "Vault", "Capitalis", "Pennywise", "Zenpay"],
      suffixes: ["Finance", "Pay", "Capital", "Wallet", "Money"],
      competitorPool: ["Ledgerly", "PayNorth", "Vaultify", "Capitalis Group", "ZenPay"],
      marketLabel: "Global fintech services market",
      marketRange: [150, 400],
      cagr: [11, 20],
      productList: ["Secure digital payments engine", "Automated financial planning", "Real-time fraud detection", "Embedded lending & credit tools"],
    },
    education: {
      keywords: ["education", "learning", "school", "course", "student", "tutor", "edtech", "academy"],
      icon: "🎓",
      palette: ["#6366F1", "#F59E0B", "#EEF2FF", "#312E81", "#A5B4FC"],
      prefixes: ["Brightpath", "Scholar", "Northlight", "Wayfind", "Academix", "Lumen"],
      suffixes: ["Academy", "Learning", "Edu", "Institute", "Classroom"],
      competitorPool: ["Scholarly", "BrightPath Edu", "LearnNorth", "Academix Labs", "WayfindEdu"],
      marketLabel: "Global online education market",
      marketRange: [80, 250],
      cagr: [9, 17],
      productList: ["Personalised learning paths", "Live & recorded tutoring", "Progress tracking dashboard", "Certification & assessments"],
    },
    travel: {
      keywords: ["travel", "trip", "tour", "hotel", "booking", "vacation", "journey", "stay"],
      icon: "🧭",
      palette: ["#0EA5E9", "#F97316", "#E0F2FE", "#0C4A6E", "#38BDF8"],
      prefixes: ["Wanderlane", "Compass", "Northtrail", "Voyage", "Driftly", "Basecamp"],
      suffixes: ["Travel", "Trips", "Journeys", "Getaways", "Trails"],
      competitorPool: ["Compass Trips", "Wanderlane Co", "TrailBase", "Driftly Travel", "Northbound Journeys"],
      marketLabel: "Global online travel market",
      marketRange: [200, 500],
      cagr: [7, 14],
      productList: ["AI-curated itinerary builder", "Verified stays & experiences", "Price-drop trip alerts", "In-trip concierge support"],
    },
    eco: {
      keywords: ["eco", "sustainab", "green", "solar", "recycl", "climate", "ev ", "electric vehicle", "clean energy"],
      icon: "🌱",
      palette: ["#22C55E", "#065F46", "#ECFDF5", "#14532D", "#4ADE80"],
      prefixes: ["Evergreen", "Terra", "Northleaf", "Renew", "Verdant", "Solstice"],
      suffixes: ["Energy", "Eco", "Greenworks", "Sustainable", "Earth Co"],
      competitorPool: ["Terraform Energy", "Evergreen Labs", "Renew Collective", "Verdant Grid", "SolsticePower"],
      marketLabel: "Global clean-tech & sustainability market",
      marketRange: [150, 420],
      cagr: [13, 22],
      productList: ["Clean energy infrastructure", "Carbon footprint tracking", "Sustainable supply partnerships", "Community impact reporting"],
    },
    generic: {
      keywords: [],
      icon: "🚀",
      palette: ["#4F8CFF", "#8B5CF6", "#0B1120", "#34D399", "#EDF1F9"],
      prefixes: ["Northstar", "Vantage", "Brightline", "Horizon", "Founders", "Nova"],
      suffixes: ["Ventures", "Co", "Group", "Studio", "Collective"],
      competitorPool: ["Northstar Ventures", "Brightline Co", "Vantage Group", "Horizon Studio", "Nova Collective"],
      marketLabel: "Addressable global market",
      marketRange: [50, 200],
      cagr: [6, 16],
      productList: ["Core product experience", "Customer onboarding flow", "Growth & retention loop", "Scalable operations backbone"],
    },
  };

  function detectCategory(idea) {
    const lower = idea.toLowerCase();
    for (const key of CATEGORY_ORDER) {
      const cat = CATEGORIES[key];
      if (cat.keywords.some((kw) => lower.includes(kw))) return key;
    }
    return "generic";
  }

  function toTitleWord(str) {
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function extractSubjectWord(idea, catDef) {
    // try to find a meaningful noun-ish word from the idea itself for flavor
    const stop = new Set(["i", "want", "to", "start", "a", "an", "the", "for", "of", "my", "with", "that", "and", "build", "create", "launch", "app", "company", "startup"]);
    const words = idea.replace(/[^a-zA-Z\s]/g, "").split(/\s+/).filter((w) => w.length > 3 && !stop.has(w.toLowerCase()));
    return words.length ? toTitleWord(words[words.length - 1]) : null;
  }

  function generateStartup(idea) {
    const category = detectCategory(idea);
    const startupId =
"AGX-" + Date.now().toString().slice(-6);
    const cat = CATEGORIES[category];
    const rng = makeRng(idea + "::" + category);

    const prefix = pick(rng, cat.prefixes);
    const suffix = pick(rng, cat.suffixes);
    const name = `${prefix} ${suffix}`;
    const initials = (prefix[0] + suffix[0]).toUpperCase();

    const taglines = [
      `Fresh ideas. Real results. Made with ${prefix}.`,
      `Built for people who expect more.`,
      `Where ${cat.icon} meets everyday life.`,
      `Small idea. Big ambition.`,
    ];
    const tagline = pick(rng, taglines);

    const marketSize = range(rng, cat.marketRange[0], cat.marketRange[1]);
    const cagr = (cat.cagr[0] + rng() * (cat.cagr[1] - cat.cagr[0])).toFixed(1);

    const investment = range(rng, 60, 220) * 1000;
    const revenueY1 = Math.round(investment * (1.6 + rng() * 1.2));
    const netProfitY1 = Math.round(revenueY1 * (0.28 + rng() * 0.14));
    const roi = Math.round((netProfitY1 / investment) * 100);

    const revenueForecast = [1, 2, 3, 4].map((q) => Math.round((revenueY1 / 4) * (0.55 + q * 0.18)));
    const profitForecast = revenueForecast.map((r) => Math.round(r * (0.24 + rng() * 0.12)));

    const costBreakdown = {
      "Equipment & Setup": range(rng, 28, 38),
      "Rent & Operations": range(rng, 18, 26),
      "Raw Materials / COGS": range(rng, 20, 28),
      "Marketing": range(rng, 10, 16),
    };
    const costTotal = Object.values(costBreakdown).reduce((a, b) => a + b, 0);
    const costKeys = Object.keys(costBreakdown);
    costKeys.forEach((k) => (costBreakdown[k] = Math.round((costBreakdown[k] / costTotal) * 100)));
    // normalize so percentages always sum to exactly 100 (rounding can drift by 1-2%)
    const drift = 100 - costKeys.reduce((a, k) => a + costBreakdown[k], 0);
    costBreakdown[costKeys[0]] += drift;

    const competitors = [...cat.competitorPool].sort(() => rng() - 0.5).slice(0, 3).map((c) => ({
      name: c,
      tag: pick(rng, ["Strong Brand", "Wide Reach", "Affordable", "Local Favorite", "Premium Positioning"]),
    }));

    const score = range(rng, 78, 97);
    const launchReadiness = range(rng, 70, 96);

    const subjectWord = extractSubjectWord(idea, cat);

    const businessPlan = {
      executiveSummary: `${name} aims to become a leading name in the ${cat.marketLabel.toLowerCase()} by offering high-quality, thoughtfully designed products and experiences${subjectWord ? ` centered around ${subjectWord.toLowerCase()}` : ""}. The venture focuses on consistent quality, customer trust, and a scalable operating model built for long-term growth.`,
      marketOpportunity: `The ${cat.marketLabel.toLowerCase()} is valued at roughly $${marketSize}B and is growing steadily, driven by rising demand for premium, accessible, and well-positioned offerings in this space. ${name} is positioned to capture a focused share of this opportunity through a differentiated, customer-first approach.`,
      marketGrowthText: `Market Growth CAGR ${cagr}%`,
      productList: cat.productList,
    };

    const deliverables = [
      { name: "Market Research", type: "PDF", meta: "24 Pages", color: "red" },
      { name: "Business Plan", type: "PDF", meta: "28 Pages", color: "red" },
      { name: "Financial Forecast", type: "XLS", meta: "12 Sheets", color: "green" },
      { name: "Marketing Strategy", type: "PDF", meta: "18 Pages", color: "red" },
      { name: "Social Media Pack", type: "ZIP", meta: "50+ Designs", color: "purple" },
      { name: "Pitch Deck", type: "PPT", meta: "20 Slides", color: "amber" },
      { name: "Website Files", type: "DOC", meta: "Complete Code", color: "blue" },
      { name: "Logo Assets", type: "PNG", meta: "Full Pack", color: "teal" },
    ];
const brandingAgent = {

logo:
`${name} logo with ${cat.icon} icon, premium startup identity`,

colors:
cat.palette,

brandVoice:
"Modern, trustworthy, customer-focused",

};

const marketingAgent = {

strategy:[
"Social media marketing",
"Local partnership campaigns",
"Influencer collaborations",
"Festival offers"
],

targetAudience:
"Young customers and local communities"

};


const socialAgent = {

posts:[
`Welcome to ${name}! Fresh ideas delivered 🚀`,
`Experience quality products made with passion ❤️`,
`${name} is redefining the ${category} industry`
]

};


const swotAgent = {

strengths:[
"Unique customer experience",
"Strong branding",
"Scalable business model"
],

weaknesses:[
"Initial investment requirement",
"Market competition"
],

opportunities:[
"Online expansion",
"Digital marketing growth"
],

threats:[
"Large competitors",
"Changing customer trends"
]

};
return {

  startupId,

  engineVersion: VERSION,

  idea,

  category,

  icon: cat.icon,

  palette: cat.palette,

  name,

  initials,

  tagline,

  marketLabel: cat.marketLabel,
      marketSize,
      cagr,
      competitors,
      financial: {
        investment,
        revenueY1,
        netProfitY1,
        roi,
        revenueForecast,
        profitForecast,
        costBreakdown,
      },
      score,
      launchReadiness,
      businessPlan,
      deliverables,
      branding: brandingAgent,

marketing: marketingAgent,

socialMedia: socialAgent,

swot: swotAgent,

agents:[
{
name:"Market Research Agent",
status:"Completed"
},
{
name:"Branding Agent",
status:"Completed"
},
{
name:"Finance Agent",
status:"Completed"
},
{
name:"Marketing Agent",
status:"Completed"
},
{
name:"Social Media Agent",
status:"Completed"
}
],
      generatedAt: Date.now(),
    };
  }

  /* --------------------------- persistence ----------------------------- */
  function saveIdea(idea) {
    localStorage.setItem(IDEA_KEY, idea);
    const startup = generateStartup(idea);
    localStorage.setItem(STARTUP_KEY, JSON.stringify(startup));
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({}));
    return startup;
  }

  function loadStartup() {
    try {
      const raw = localStorage.getItem(STARTUP_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* fall through */ }
    // nothing generated yet — fall back to a demo idea so pages never look broken
    const idea = localStorage.getItem(IDEA_KEY) || DEFAULT_IDEA;
    return saveIdea(idea);
  }

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function setProgress(progressObj) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressObj));
  }

  function fmtMoney(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  /* ------------------------- shared topbar meta ------------------------- */
  function paintTopbarMeta(startup) {
    document.querySelectorAll("[data-startup-name]").forEach((el) => (el.textContent = startup.name));
    document.querySelectorAll("[data-startup-idea]").forEach((el) => (el.textContent = `“${startup.idea}”`));
    document.querySelectorAll("[data-startup-initials]").forEach((el) => (el.textContent = startup.initials));
  }

return {
    detectCategory,
    generateStartup,
    saveIdea,
    loadStartup,
    getProgress,
    setProgress,
    fmtMoney,
    paintTopbarMeta,
    CATEGORIES,
  };
})();
/*async generateStartup(prompt){

const aiResponse =
await fetch("/api/generate",{
method:"POST",
body:
JSON.stringify({
prompt
})
});

return await aiResponse.json();

} */