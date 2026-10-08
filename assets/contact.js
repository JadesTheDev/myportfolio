/* -------------------------------
   Contact form submission and feedback
   ------------------------------- */
(() => {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector("#contact-status");
  let sending = false;

  /* -------------------------------
     Preselect the inquiry from Support page links
     ------------------------------- */
  const inquiry = form.elements.namedItem("inquiry_type");
  const inquiryTypes = {
    sponsorship: "Project sponsorship",
    investment: "Investment or partnership",
  };
  const requestedType = new URLSearchParams(window.location.search).get("inquiry");
  if (Object.hasOwn(inquiryTypes, requestedType)) {
    inquiry.value = inquiryTypes[requestedType];
    // Keep this choice when the form resets after a successful submission.
    for (const option of inquiry.options) {
      option.defaultSelected = option.value === inquiry.value;
    }
  }

  form.addEventListener("input", (event) => {
    if (typeof event.target.setCustomValidity === "function") {
      event.target.setCustomValidity("");
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;
    for (const name of ["name", "message"]) {
      const field = form.elements.namedItem(name);
      field.setCustomValidity(field.value.trim() ? "" : "Please fill out this field.");
    }
    if (!form.reportValidity()) return;

    sending = true;
    button.disabled = true;
    button.textContent = "Sending…";
    form.setAttribute("aria-busy", "true");
    status.dataset.state = "sending";
    status.textContent = "Sending your message…";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const details = Array.isArray(data.errors)
          ? data.errors
              .map((error) => error.message)
              .filter(Boolean)
              .join(" ")
          : "";
        throw new Error(
          details ||
            (response.status === 429
              ? "Too many requests. Please wait a moment and try again."
              : "Your message could not be sent. Please try again later."),
        );
      }
      form.reset();
      status.dataset.state = "success";
      status.textContent = "Thanks! Your message was submitted successfully.";
    } catch (error) {
      status.dataset.state = "error";
      status.textContent =
        error.name === "AbortError"
          ? "The request timed out, so we could not confirm submission. Your message is still here; try again later."
          : error instanceof TypeError
            ? "We could not confirm submission. Check your connection and try again. Your message is still here."
            : error.message;
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      button.textContent = "Send message";
      form.removeAttribute("aria-busy");
    }
  });
})();
