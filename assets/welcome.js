/*
 * SDC355 - Personalized Welcome
 * Uses a cookie to remember a visitor's name for 2 minutes.
 * Visitors can choose whether to save their name.
 */
document.addEventListener("DOMContentLoaded", () => {
  const greeting = document.getElementById("visitor-welcome");
  const nameForm = document.getElementById("visitor-name-form");
  const nameInput = document.getElementById("visitor-name");
  const rememberCheckbox = document.getElementById("remember-visitor");
  const nameDialog = document.getElementById("visitor-name-dialog");
  if (!greeting || !nameForm || !nameInput || !rememberCheckbox || !nameDialog) return;

  const cookieName = "visitorName";
  function getCookie(name) {
    const prefix = `${name}=`;
    const cookie = document.cookie.split("; ").find((item) => item.startsWith(prefix));
    if (!cookie) return null;
    try { return decodeURIComponent(cookie.slice(prefix.length)); }
    catch { return null; }
  }
  function setCookie(name, value) {
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=120; path=/myportfolio/; SameSite=Lax`;
  }
  function deleteCookie(name) {
    document.cookie = `${name}=; max-age=0; path=/myportfolio/; SameSite=Lax`;
  }
  function showGreeting(name) {
    greeting.textContent = `Welcomes You, ${name}`;
  }
  const savedName = getCookie(cookieName);
  if (savedName && savedName.trim()) {
    showGreeting(savedName.slice(0, 60));
    return;
  }
  nameDialog.hidden = false;
  nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const visitorName = nameInput.value.trim().slice(0, 60) || "Visitor";
    showGreeting(visitorName);
    if (rememberCheckbox.checked) setCookie(cookieName, visitorName);
    else deleteCookie(cookieName);
    nameDialog.hidden = true;
  });
});
