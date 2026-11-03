/* SDC355 Project 5.9 — reusable project objects, JSON, sessionStorage, and DOM rendering. */
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("dynamic-projects");
    if (!container) return;

    // Three project objects contain titles, summaries, image URLs, and repository links.
    const projects = [
        {
            title: "Island Survival Simulator",
            summary: "A playable survival simulation centered on managing hunger, thirst, energy, shelter, fire, and illness across ten days.",
            imageUrl: "../assets/island-preview.png",
            imageAlt: "An island with palm trees rendered in colored ASCII characters",
            repositoryUrl: "https://github.com/JadesTheDev/academic_projects",
            actionUrl: "./Island%20Survival%20Simulator.zip",
            actionLabel: "Download build ↓",
            download: true,
            tags: ["C#", "Game Logic", "Simulation"],
            className: ""
        },
        {
            title: "Academic Projects",
            summary: "Browse my coursework, assignments, source code, and demos by course.",
            imageUrl: "../assets/academic-preview.png",
            imageAlt: "Academic project directory organized by course",
            repositoryUrl: "https://github.com/JadesTheDev/academic_projects",
            actionUrl: "https://jadesthedev.github.io/academic_projects/",
            actionLabel: "Browse academic projects ↗",
            tags: ["Python", "C#", "SQL", "Web"],
            eyebrow: "Coursework archive",
            className: "academic-card"
        },
        {
            title: "Trailer Hunt",
            summary: "A trailer-search project for my future tiny house, with listing filters, favorites, and links to search multiple marketplaces.",
            imageUrl: "../assets/trailer-hunt-thumbnail.png",
            imageAlt: "Trailer Hunt emblem with a cargo trailer beneath a crescent moon.",
            repositoryUrl: "https://github.com/JadesTheDev/Trailer-Hunt",
            actionUrl: "https://jadesthedev.github.io/Trailer-Hunt/",
            actionLabel: "Visit website ↗",
            tags: ["Python", "JavaScript", "Search Tools"],
            className: "trailer-card"
        }
    ];

    // Store serialized objects for this browser tab's session.
    const storageKey = "sdc355-projects-5-9";
    let savedProjects = projects;
    try {
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length >= 3 && parsed.every(item => item && typeof item.title === "string")) {
                savedProjects = parsed;
            }
        } else {
            sessionStorage.setItem(storageKey, JSON.stringify(projects));
        }
    } catch (error) {
        // Storage may be blocked; keep rendering the in-memory objects.
        console.warn("Project session storage unavailable:", error);
    }

    // Build project cards using safe DOM APIs instead of HTML string injection.
    for (const project of savedProjects) {
        const article = document.createElement("article");
        article.className = ["project-card", project.className].filter(Boolean).join(" ");

        const media = document.createElement("div");
        media.className = "project-media";
        const image = document.createElement("img");
        image.src = project.imageUrl;
        image.alt = project.imageAlt || project.title;
        image.loading = "lazy";
        media.appendChild(image);

        const body = document.createElement("div");
        body.className = "project-body";
        if (project.eyebrow) {
            const eyebrow = document.createElement("p");
            eyebrow.className = "eyebrow";
            eyebrow.textContent = project.eyebrow;
            body.appendChild(eyebrow);
        }
        const heading = document.createElement("h3");
        heading.textContent = project.title;
        const summary = document.createElement("p");
        summary.textContent = project.summary;
        const tags = document.createElement("div");
        tags.className = "tags";
        for (const label of project.tags || []) {
            const tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = label;
            tags.appendChild(tag);
        }
        const actions = document.createElement("div");
        actions.className = "project-actions";
        const link = document.createElement("a");
        link.className = "card-primary-link";
        link.href = project.actionUrl;
        link.textContent = project.actionLabel;
        if (project.download) {
            link.download = "";
        } else {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
        actions.appendChild(link);
        body.append(heading, summary, tags, actions);
        article.append(media, body);
        container.appendChild(article);
    }
});
