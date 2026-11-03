# Jade Powell Portfolio

Personal software development portfolio featuring current application work, web development projects, and programming coursework.

## Live Site

- GitHub Pages: https://jadesthedev.github.io/myportfolio/

## Structure

- `home/` — landing page and featured work
- `projects/` — project portfolio
- `about/` — background, focus areas, and skills
- `blog/` — Rant OS experimental blog interface
- `contact/` — contact form
- `assets/` — shared images and site-wide stylesheet

## Tech

The main portfolio is intentionally lightweight and uses semantic HTML and shared responsive CSS. The blog is a separate interactive experiment with its own CSS and JavaScript.

## Contact Form

The contact page submits to Formspree using a standard HTML POST action, enhanced by vanilla JavaScript for validation and in-page sending, success, and error feedback. Formspree sends notifications to the verified recipient configured in its dashboard. No email credentials are stored in this repository.

## Local Development

No build step is required. Serve the repository with any local static server, or open the pages directly in a browser. Relative internal links are used so the site is portable between local development and GitHub Pages.

## SDC355 Project 5.9 — Creating Scalable Foundations

The Projects page uses vanilla JavaScript objects and an array to describe three project cards (Island Survival Simulator, Academic Projects, and Trailer Hunt). Each object includes a title, short summary, image URL, and repository URL, along with display metadata.

On page load, `assets/course-5-9.js` checks `sessionStorage` for saved project data. If present, it restores the array using `JSON.parse()`; otherwise, it saves the default array using `JSON.stringify()` and `sessionStorage.setItem()`. JavaScript then creates the cards with DOM methods and inserts them into their original page sections.

### Languages and libraries

- HTML5, CSS3, and JavaScript (ES6+)
- Browser DOM, `sessionStorage`, and JSON APIs
- No external JavaScript framework or build dependencies
- Formspree for the existing Contact form

### Running locally

Serve the repository using a local static server (or XAMPP), then open `projects/index.html`. GitHub Pages serves the published site. Browser storage requires a compatible browser and may be unavailable in restricted browsing contexts; the default cards still render when storage is blocked.
