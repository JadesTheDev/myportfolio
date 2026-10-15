/* SDC355 Project 2.9 — temporary coursework controls. */
document.addEventListener("DOMContentLoaded", () => {
  // Loop: generate the About page skill list from a JavaScript array.
  const skillList = document.querySelector("#technical-skills");
  if (skillList) {
    const skills = ["HTML", "CSS", "JavaScript", "Python", "C#", "SQL", "Git", "GitHub"];
    for (const skill of skills) {
      const item = document.createElement("li");
      item.textContent = skill;
      skillList.appendChild(item);
    }
  }

  // Conditional: count the project cards actually present on the Projects page.
  const university = document.querySelector("#university-resources");
  const personal = document.querySelector("#personal-projects");
  if (university && personal) {
    const projectCount = document.querySelectorAll(".project-card").length;
    if (projectCount < 3) {
      university.hidden = false;
      personal.hidden = false;
    } else {
      university.hidden = true;
      personal.hidden = false;
    }
  }

  // Dark mode is the default; unchecked enables temporary light mode.
  const toggle = document.querySelector("#dark-mode-toggle");
  if (toggle) {
    // Remember theme preference across page navigation.
    let darkMode = true;
    try { darkMode = localStorage.getItem("sdc355-dark-mode") !== "false"; } catch (_) {}
    toggle.checked = darkMode;
    document.body.classList.toggle("course-light", !darkMode);
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("course-light", !toggle.checked);
      try { localStorage.setItem("sdc355-dark-mode", String(toggle.checked)); } catch (_) {}
    });
  }
});
