(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

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

  // ===== phone time =====
  function updatePhoneTime() {
    const el = $("phone-time");
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  updatePhoneTime();
  setInterval(updatePhoneTime, 30000);

  // ===== Launcher =====
  function renderLauncher() {
    const grid = $("categoryGrid");
    if (!grid) return;

    const layout = rantData.launcherApps || [];

    grid.innerHTML = layout.map(item => {
      if (item.type === "spacer") {
        return `<div class="app-spacer" aria-hidden="true"></div>`;
      }

      if (item.type === "link") {
        const emoji = escapeHtml(item.emoji || "🔗");
        const label = escapeHtml(item.label || "Link");
        const href = escapeHtml(item.href || "#");
        return `
          <a class="app" href="${href}" data-label="${label.toLowerCase()}">
            <div class="app-square"><div class="app-emoji" aria-hidden="true">${emoji}</div></div>
            <div class="app-label">${label}</div>
          </a>
        `;
      }

      const cat = getCategoryById(item.id);
      if (!cat) return `<div class="app-spacer" aria-hidden="true"></div>`;

      const emoji = escapeHtml(cat.emoji || "📁");
      const label = escapeHtml(cat.name || "Category");
      const href = `pages/category.html?cat=${encodeURIComponent(cat.id)}`;

      return `
        <a class="app" href="${href}" data-label="${label.toLowerCase()}">
          <div class="app-square"><div class="app-emoji" aria-hidden="true">${emoji}</div></div>
          <div class="app-label">${label}</div>
        </a>
      `;
    }).join("");

    // Hook up search (only on launcher)
    const input = $("launcherSearch");
    const clear = $("searchClear");
    if (!input) return;

    const apps = Array.from(grid.querySelectorAll(".app"));

    function applyFilter() {
      const q = input.value.trim().toLowerCase();
      apps.forEach(a => {
        const label = a.getAttribute("data-label") || "";
        a.style.display = (!q || label.includes(q)) ? "" : "none";
      });
    }

    input.addEventListener("input", applyFilter);

    if (clear) {
      clear.addEventListener("click", () => {
        input.value = "";
        input.focus();
        applyFilter();
      });
    }
  }

  // ===== Category page =====
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

  // ===== Thread page =====
  function renderThread() {
    const chat = $("chat");
    if (!chat) return;

    const params = getParams();
    const catId = params.get("cat");
    const threadId = params.get("thread");
    const key = `${catId}/${threadId}`;

    const thread = (rantData.threads && rantData.threads[key]) ? rantData.threads[key] : null;

    if (!thread) {
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
      return `
        <div class="pair">
          <div class="bubble claim">${claim}</div>
          <div class="bubble receipt">
            <div class="evidence">${evidence}</div>
            <div class="cite muted">${citation}</div>
          </div>
        </div>
      `;
    }).join("");
  }

  renderLauncher();
  renderCategory();
  renderThread();
})();
