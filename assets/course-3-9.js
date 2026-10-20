/* SDC355 Project 3.9: DOM creation and selector updates. */
document.addEventListener("DOMContentLoaded", () => {
  // Dynamically create a useful, unobtrusive introduction on the home page.
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const heading = hero.querySelector("h1");
  const paragraph = document.createElement("p");
  paragraph.className = "course-dom-note";
  paragraph.textContent = "Explore my projects, coursework, and the systems I'm building.";
  if (heading) heading.insertAdjacentElement("afterend", paragraph);

  // Select and modify two existing DOM elements without replacing their content.
  const primaryAction = document.querySelector(".hero .button-primary");
  if (primaryAction) primaryAction.style.borderRadius = "999px";
  const navigation = document.querySelector(".site-nav");
  if (navigation) navigation.classList.add("course-dom-navigation");
});
