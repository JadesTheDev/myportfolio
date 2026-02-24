(function () {
  "use strict";

  function $(id) { return document.getElementById(id); }

  function getParams() {
    return new URLSearchParams(window.location.search);
  }

  function getCategoryById(catId) {
    return (rantData.categories || []).find(c => c.id === catId) || null;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ===== Phone time (real) =====
  function updatePhoneTime() {
    const el = $("phone-time");
    if (!el) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    el.textContent = time;
  }

  updatePhoneTime();
  setInterval(updatePhoneTime, 30000);

  // ---------- Page: index.html (launcher) ----------
  function renderLauncher() {
    const grid = $("categoryGrid");
    if (!grid) return;

    const titleEl = $("siteTitle");
    const tagEl = $("siteTagline");

    if (titleEl) titleEl.textContent = rantData.site?.title || "Rant OS";
    if (tagEl) tagEl.textContent = rantData.site?.tagline || "";

    const cats = rantData.categories || [];
    grid.innerHTML = cats.map(c => {
      const name = escapeHtml(c.name);
      const emoji = escapeHtml(c.emoji || "📁");
      return `
        <a class="card" href="pages/category.html?cat=${encodeURIComponent(c.id)}">
          <div class="emoji" aria-hidden="true">${emoji}</div>
          <div class="cardTitle">${name}</div>
        </a>
      `;
    }).join("");
  }

  // ---------- Page: category.html (topic list) ----------
  function renderCategory() {
    const list = $("topicList");
    if (!list) return;

    const params = getParams();
    const catId = params.get("cat");
    const cat = getCategoryById(catId);

    if (!cat) {
      const titleEl = $("categoryTitle");
      const subEl = $("categorySubtitle");
      if (titleEl) titleEl.textContent = "Category not found";
      if (subEl) subEl.textContent = "Check the link and try again.";
      list.innerHTML = `<div class="empty">No topics to show.</div>`;
      return;
    }

    const titleEl = $("categoryTitle");
    const subEl = $("categorySubtitle");
    if (titleEl) titleEl.textContent = `${cat.emoji || "📁"} ${cat.name}`;
    if (subEl) subEl.textContent = "Pick a topic to open the thread.";

    const topics = (rantData.topics && rantData.topics[catId]) ? rantData.topics[catId] : [];
    if (!topics.length) {
      list.innerHTML = `<div class="empty">No topics yet. Add one in <code>rantData.js</code>.</div>`;
      return;
    }

    list.innerHTML = topics.map(t => {
      const title = escapeHtml(t.title);
      const blurb = escapeHtml(t.blurb || "");
      const updated = escapeHtml(t.updated || "");
      return `
        <a class="rowItem" href="thread.html?cat=${encodeURIComponent(catId)}&thread=${encodeURIComponent(t.id)}">
          <div class="rowMain">
            <div class="rowTitle">${title}</div>
            <div class="rowBlurb muted">${blurb}</div>
          </div>
          <div class="rowMeta muted">${updated}</div>
        </a>
      `;
    }).join("");
  }

  // ---------- Page: thread.html (chat) ----------
  function renderThread() {
    const chat = $("chat");
    if (!chat) return;

    const params = getParams();
    const catId = params.get("cat");
    const threadId = params.get("thread");

    const cat = getCategoryById(catId);
    const key = `${catId}/${threadId}`;
    const thread = (rantData.threads && rantData.threads[key]) ? rantData.threads[key] : null;

    const back = $("backToCategory");
    if (back && catId) back.href = `category.html?cat=${encodeURIComponent(catId)}`;

    if (!cat || !thread) {
      const titleEl = $("threadTitle");
      if (titleEl) titleEl.textContent = "Thread not found";
      chat.innerHTML = `<div class="empty">Missing data for <code>${escapeHtml(key)}</code>.</div>`;
      return;
    }

    const titleEl = $("threadTitle");
    if (titleEl) titleEl.textContent = thread.title || "Thread";

    const msgs = thread.messages || [];
    chat.innerHTML = msgs.map(m => {
      const claim = escapeHtml(m.claim || "");
      const evidence = escapeHtml(m.evidence || "");
      const citation = escapeHtml(m.citation || "");
      const sourceUrl = (m.sourceUrl || "").trim();

      const sourceLink = sourceUrl
        ? `<a class="source" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener">Open source</a>`
        : "";

      return `
        <div class="pair">
          <div class="bubble claim">${claim}</div>
          <div class="bubble receipt">
            <div class="evidence">${evidence}</div>
            <div class="cite muted">${citation}</div>
            ${sourceLink}
          </div>
        </div>
      `;
    }).join("");
  }

  // Run the right renderer automatically
  renderLauncher();
  renderCategory();
  renderThread();
})();
