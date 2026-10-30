/* -------------------------------
   Contact form submission and feedback
   ------------------------------- */
(() => {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector("#contact-status");
  let sending = false;

  // SDC355 4.4: save the entered email only when the visitor opts in.
  const emailField = form.elements.namedItem("email");
  const rememberEmail = document.querySelector("#remember-email");
  const cookieStatus = document.querySelector("#email-cookie-status");
  const saveEmailCookie = () => {
    if (!rememberEmail.checked) return;
    const email = emailField.value.trim();
    if (!emailField.validity.valid || !email) {
      cookieStatus.textContent = "Enter a valid email address to save it.";
      return;
    }
    document.cookie = "userEmail=" + encodeURIComponent(email) + "; Max-Age=604800; Path=/; SameSite=Lax; Secure";
    cookieStatus.textContent = "Email saved in a cookie on this device: " + email;
  };
  rememberEmail.addEventListener("change", () => {
    if (rememberEmail.checked) {
      saveEmailCookie();
    } else {
      document.cookie = "userEmail=; Max-Age=0; Path=/; SameSite=Lax; Secure";
      cookieStatus.textContent = "Saved email cookie cleared.";
    }
  });
  emailField.addEventListener("change", saveEmailCookie);


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

    const visitorName = form.elements.namedItem("name").value.trim();
    sending = true;
    button.disabled = true;
    button.textContent = "Sending…";
    form.setAttribute("aria-busy", "true");
    status.dataset.state = "sending";
    status.textContent = "Sending your message…";
    // SDC355 3.9: the sending status stays visible for at least 2.5 seconds.
    const minimumWait = new Promise((resolve) => setTimeout(resolve, 2500));
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
      await minimumWait;
      form.reset();
      status.dataset.state = "success";
      status.textContent = `Thank you, ${visitorName}! Your message has been sent!`;
    } catch (error) {
      await minimumWait;
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
