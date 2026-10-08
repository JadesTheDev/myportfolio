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
