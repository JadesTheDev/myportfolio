/* SDC355 Project 4.8 — work-in-progress welcome modal. */
document.addEventListener("DOMContentLoaded", () => {
  const backdrop = document.getElementById("course-progress-modal");
  const closeButton = document.getElementById("course-modal-close");
  if (!backdrop || !closeButton) return;

  // Show the modal when the home page loads, replacing the old name prompt.
  backdrop.hidden = false;
  closeButton.focus();

  // Allow the visitor to dismiss the overlay with the Close button.
  closeButton.addEventListener("click", () => {
    backdrop.hidden = true;
  });
});
