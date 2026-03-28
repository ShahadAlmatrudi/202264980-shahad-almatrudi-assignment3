document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1) Reveal on scroll
  // =========================
  const revealEls = document.querySelectorAll(".reveal-on-scroll");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));

  // =========================
  // 2) Theme toggle + localStorage
  // =========================
  const toggleBtn = document.getElementById("theme-toggle");
  const toggleIcon = toggleBtn?.querySelector(".theme-toggle__icon");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("theme-dark");
    if (toggleIcon) toggleIcon.textContent = "☀️";
  }

  toggleBtn?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("theme-dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (toggleIcon) {
      toggleIcon.textContent = isDark ? "☀️" : "🌙";
    }
  });

  // =========================
  // 3) Live project search filter
  // =========================
  const searchInput = document.getElementById("project-search");
  const projectCards = document.querySelectorAll(".project-card");
  const searchFeedback = document.getElementById("project-search-feedback");
  const emptyState = document.getElementById("projects-empty-state");

  function filterProjects() {
    if (!searchInput) return;

    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const title = card.dataset.title?.toLowerCase() || "";
      const tags = card.dataset.tags?.toLowerCase() || "";
      const matches = title.includes(query) || tags.includes(query);

      if (matches) {
        card.classList.remove("is-hidden");
        visibleCount++;
      } else {
        card.classList.add("is-hidden");
      }
    });

    if (query === "") {
      if (searchFeedback) {
        searchFeedback.textContent = "Showing all projects.";
      }
    } else if (visibleCount > 0) {
      if (searchFeedback) {
        searchFeedback.textContent = `Found ${visibleCount} project${visibleCount > 1 ? "s" : ""} matching "${query}".`;
      }
    } else {
      if (searchFeedback) {
        searchFeedback.textContent = `No projects matched "${query}".`;
      }
    }

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  }

  searchInput?.addEventListener("input", filterProjects);

  // =========================
  // 4) Contact form validation + feedback
  // =========================
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  function showStatus(message, type) {
    if (!statusEl) return;

    statusEl.textContent = message;
    statusEl.classList.remove("success", "error");

    if (type) {
      statusEl.classList.add(type);
    }
  }

  function clearInputErrors() {
    [nameInput, emailInput, messageInput].forEach((input) => {
      input?.classList.remove("input-error");
    });
  }

  function markError(input) {
    input?.classList.add("input-error");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    clearInputErrors();

    const name = nameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const message = messageInput?.value.trim() || "";

    if (!name || !email || !message) {
      if (!name) markError(nameInput);
      if (!email) markError(emailInput);
      if (!message) markError(messageInput);

      showStatus("Please fill in all fields before sending.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      markError(emailInput);
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    if (message.length < 10) {
      markError(messageInput);
      showStatus("Message should be at least 10 characters long.", "error");
      return;
    }

    showStatus(
      `Thanks, ${name}! Your message is ready (no backend in this project).`,
      "success"
    );

    form.reset();
    clearInputErrors();
  });
});