/*
 * Jade Powell | SDC355 PA 4.6 | October 28, 2026
 * Tracking Visits: remember the previous visit with a JavaScript cookie.
 * Read the old timestamp before saving the current one.
 */
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("visit-tracking-message");
  if (!output) return;

  const cookieName = "lastVisit";
  const path = location.pathname.startsWith("/myportfolio/")
    ? "/myportfolio/"
    : location.pathname.replace(/[^/]*$/, "") || "/";

  const previousCookie = document.cookie.split("; ")
    .find(part => part.startsWith(cookieName + "="));
  let previousDate = null;
  if (previousCookie) {
    try {
      const parsed = new Date(decodeURIComponent(previousCookie.slice(cookieName.length + 1)));
      if (!Number.isNaN(parsed.getTime())) previousDate = parsed;
    } catch (_) { /* Invalid cookies are treated as first visits. */ }
  }

  if (previousDate) {
    const formatted = previousDate.toLocaleString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
      hour: "numeric", minute: "2-digit", second: "2-digit"
    });
    output.textContent = `Your last visit was ${formatted}\nWelcome back!`;
  } else {
    output.textContent = "This is your first visit! Welcome to Jade's little corner of the cosmos!";
  }

  document.cookie = `${cookieName}=${encodeURIComponent(new Date().toISOString())}; Max-Age=2592000; Path=${path}; SameSite=Lax`;
});
