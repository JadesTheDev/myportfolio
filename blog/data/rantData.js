const rantData = {
  site: {
    title: "Rant OS",
    tagline: "Opinion in conversation. Evidence as receipts."
  },

  categories: [
    { id: "food-system", name: "Food System", emoji: "🧅" },
    { id: "climate", name: "Climate", emoji: "🌎" },
    { id: "science", name: "Science", emoji: "🧪" }
  ],

  topics: {
    "food-system": [
      {
        id: "big-produce",
        title: "Big Produce vs Flavor",
        blurb: "Why food looks better and tastes worse.",
        updated: "2026-02-24"
      }
    ]
  },

  threads: {
    "food-system/big-produce": {
      title: "Big Produce vs Flavor",
      messages: [
        {
          claim: "Produce keeps getting bigger, but flavor keeps getting worse.",
          evidence:
            "Breeding and supply-chain priorities often favor yield, uniformity, and shelf-life over flavor.",
          citation: "Add APA citation here.",
          sourceUrl: ""
        },
        {
          claim: "If flavor is expensive, it becomes a luxury—and that’s a policy problem, not a taste problem.",
          evidence:
            "Food quality and access are shaped by distribution systems, pricing, and neighborhood retail environments.",
          citation: "Add APA citation here.",
          sourceUrl: ""
        }
      ]
    }
  }
};
