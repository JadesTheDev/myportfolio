// SDC355 1.10: Ask for a visitor's name and personalize the page.
// This is a browser prompt, not an account sign-in or database request.
document.addEventListener("DOMContentLoaded", () => {
  const greeting = document.getElementById("visitor-welcome");
  if (!greeting) return;

  const answer = window.prompt("Welcome! What is your name?");
  const visitorName = answer && answer.trim() ? answer.trim().slice(0, 60) : "Visitor";
  // textContent displays user input safely without parsing HTML.
  greeting.textContent = `Welcomes You, ${visitorName}`;
});
