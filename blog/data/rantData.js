const rantData = {
  site: {
    title: "Rant OS",
    tagline: "Opinion in conversation. Evidence as receipts."
  },

  // Categories (used by category pages)
  categories: [
    { id: "agriculture",  name: "Agriculture",  emoji: "🌱" },
    { id: "climate",      name: "Climate",      emoji: "🌎" },
    { id: "economics",    name: "Economics",    emoji: "💰" },
    { id: "food-access",  name: "Food Access",  emoji: "🏪" },
    { id: "food",         name: "Food",         emoji: "🍎" },
    { id: "food-system",  name: "Food System",  emoji: "🍉" },
    { id: "science",      name: "Science",      emoji: "🧪" },
  ],

  // Launcher layout (exact configuration you asked for)
  launcherApps: [
    { type: "category", id: "agriculture" },
    { type: "category", id: "climate" },
    { type: "category", id: "economics" },

    { type: "category", id: "food-access" },
    { type: "category", id: "food" },
    { type: "category", id: "food-system" },

    { type: "link", emoji: "🏠", label: "Home", href: "../home/index.html" },
    { type: "spacer" },
    { type: "link", emoji: "✉️", label: "Contact", href: "../contact/index.html" },
  ],

  // Topics list per category (your existing system)
  topics: {
    "food-system": [
      { id: "big-produce", title: "Big Produce vs Flavor", blurb: "Why food looks better and tastes worse.", updated: "2026-02-24" }
    ],
    "climate": [],
    "science": [],
    "agriculture": [],
    "economics": [],
    "food-access": [],
    "food": []
  },

  // Threads keyed as "categoryId/threadId"
  threads: {
    "food-system/big-produce": {
      title: "Big Produce vs Flavor",
      messages: [
        {
          claim: "Produce keeps getting bigger but flavor is getting worse.",
          evidence: "Breeding priorities often favor yield and shelf life over flavor.",
          citation: "Add your APA citation here.",
          sourceUrl: ""
        }
      ]
    }
  }
};
