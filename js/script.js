document.addEventListener("DOMContentLoaded", () => {
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

  const toggleBtn = document.getElementById("theme-toggle");
  const toggleIcon = toggleBtn?.querySelector(".theme-toggle__icon");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("theme-dark");
    if (toggleIcon) toggleIcon.textContent = "☀️";
  }

  toggleBtn?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("theme-dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (toggleIcon) toggleIcon.textContent = isDark ? "☀️" : "🌙";
  });

  const searchInput = document.getElementById("project-search");
  const projectsList = document.getElementById("projects-list");
  const searchFeedback = document.getElementById("project-search-feedback");
  const emptyState = document.getElementById("projects-empty-state");

  function getProjectCards() {
    return projectsList
      ? Array.from(projectsList.querySelectorAll(".project-card"))
      : [];
  }

  function filterProjects() {
    if (!searchInput) return;

    const query = searchInput.value.trim().toLowerCase();
    const cards = getProjectCards();
    let visible = 0;

    cards.forEach((card) => {
      const title = card.dataset.title?.toLowerCase() || "";
      const tags = card.dataset.tags?.toLowerCase() || "";
      const match = title.includes(query) || tags.includes(query);

      card.classList.toggle("is-hidden", !match);
      if (match) visible++;
    });

    if (searchFeedback) {
      searchFeedback.textContent =
        query === ""
          ? "Showing all projects."
          : visible > 0
          ? `Found ${visible} project(s).`
          : "No projects found.";
    }

    if (emptyState) emptyState.hidden = visible !== 0;
  }

  searchInput?.addEventListener("input", filterProjects);

  const sortSelect = document.getElementById("sort-projects");
  const originalCards = getProjectCards();

  sortSelect?.addEventListener("change", () => {
    if (!projectsList) return;

    let cards = getProjectCards();

    if (sortSelect.value === "az") {
      cards.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
    } else if (sortSelect.value === "za") {
      cards.sort((a, b) => b.dataset.title.localeCompare(a.dataset.title));
    } else {
      cards = [...originalCards];
    }

    projectsList.innerHTML = "";
    cards.forEach((card) => projectsList.appendChild(card));
    filterProjects();
  });

  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    [nameInput, emailInput, messageInput].forEach((field) =>
      field.classList.remove("input-error")
    );

    statusEl.className = "form-status";
    statusEl.textContent = "";

    let hasError = false;

    if (name.length < 2) {
      nameInput.classList.add("input-error");
      hasError = true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      emailInput.classList.add("input-error");
      hasError = true;
    }

    if (message.length < 10) {
      messageInput.classList.add("input-error");
      hasError = true;
    }

    if (hasError) {
      statusEl.textContent =
        "Please enter a valid name, email, and a message of at least 10 characters.";
      statusEl.classList.add("error");
      return;
    }

    statusEl.textContent = "Message sent successfully!";
    statusEl.classList.add("success");
    form.reset();
  });

  const githubContainer = document.getElementById("github-projects");
  const apiError = document.getElementById("api-error");

  async function loadRepos() {
    if (!githubContainer) return;

    githubContainer.innerHTML =
      "<p class='project-search-feedback'>Loading repositories...</p>";

    try {
      const res = await fetch(
        "https://api.github.com/users/ShahadAlmatrudi/repos?per_page=20&sort=updated"
      );

      if (!res.ok) throw new Error("Failed to fetch repositories.");

      const data = await res.json();
      const filteredRepos = data.filter((repo) => !repo.fork).slice(0, 4);

      githubContainer.innerHTML = filteredRepos
        .map((repo) => {
          return `
            <article class="project-card">
              <div class="project-body">
                <p class="project-kicker">GitHub Repository</p>
                <h3 class="project-name">${repo.name}</h3>
                <p class="project-sub">
                  ${
                    repo.description
                      ? repo.description
                      : "No description available for this repository."
                  }
                </p>
                <div class="project-tags" aria-label="Repository details">
                  <span class="pill">${repo.language || "Not specified"}</span>
                  <span class="pill">⭐ ${repo.stargazers_count}</span>
                </div>
                <div class="project-actions">
                  <a
                    class="pbtn"
                    href="${repo.html_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repo →
                  </a>
                </div>
              </div>
            </article>
          `;
        })
        .join("");

      if (apiError) apiError.hidden = true;
    } catch (error) {
      githubContainer.innerHTML = "";

      if (apiError) {
        apiError.hidden = false;
        apiError.textContent =
          "Failed to load GitHub repositories. Please try again later.";
      }

      console.error("GitHub API error:", error);
    }
  }

  loadRepos();
  filterProjects();

  const projectData = {
    "horse-racing": {
      eyebrow: "JavaFX • MySQL • Pair Project",
      title: "Horse Racing Database System",
      summary:
        "A database-driven desktop system for managing horse racing records, ownership relationships, stable assignments, race operations, and performance reporting.",
      overview:
        "This project combines a JavaFX user interface with a relational MySQL database to manage horses, owners, trainers, stables, tracks, races, and results in a structured and reliable way.",
      features: [
        "Adds new races with validation to ensure the selected track exists before insertion.",
        "Deletes owners safely while preserving horses shared with other owners.",
        "Archives deleted horse information into an old_info table.",
        "Moves horses between stables with validation checks.",
        "Generates trainer winnings summaries and track-level statistics."
      ],
      tech: [
        "Built with JavaFX and FXML.",
        "Used MySQL and JDBC for database connectivity.",
        "Applied SQL joins, aggregate queries, and reporting queries.",
        "Handled delete operations carefully across dependent tables."
      ],
      challenges: [
        "Resolved foreign-key violations during owner deletion.",
        "Handled horses with multiple owners safely.",
        "Solved JavaFX page and controller linking issues.",
        "Fixed connection and privilege problems caused by schema naming."
      ],
      tags: ["Java", "JavaFX", "MySQL", "JDBC", "SQL", "FXML"]
    },

    "route-visualizer": {
      eyebrow: "JavaFX • Desktop App",
      title: "Route Visualizer",
      summary:
        "A JavaFX route visualization application designed with clean architectural separation and maintainable route-processing logic.",
      overview:
        "This project separates user input handling, data access, rendering, and distance calculation into clear responsibilities.",
      features: [
        "Visualizes routes through a dedicated rendering layer.",
        "Draws arrows between stops in route order.",
        "Processes user-entered route information.",
        "Computes Euclidean distance between buildings.",
        "Keeps route drawing separate from visual styling."
      ],
      tech: [
        "Uses a repository layer.",
        "Separates rendering from controller logic.",
        "Uses a distance calculation strategy.",
        "Reflects maintainable object-oriented structure."
      ],
      challenges: [
        "Reduced coupling between classes.",
        "Maintained UI encapsulation.",
        "Improved maintainability by separating responsibilities."
      ],
      tags: ["Java", "JavaFX", "OOP", "SRP", "OCP", "UI Design"]
    },

    "folder-visualizer": {
      eyebrow: "JavaFX • Desktop App",
      title: "Folder Visualizer",
      summary:
        "A JavaFX desktop application that visualizes folder structures and file sizes using tree and bar-chart views.",
      overview:
        "This project models folders and files as a recursive structure and supports multiple visualization modes.",
      features: [
        "Allows users to load a selected folder.",
        "Builds a hierarchical model of folders and files.",
        "Calculates sizes recursively.",
        "Supports Tree View and Bar Chart View.",
        "Displays bar lengths proportionally based on size."
      ],
      tech: [
        "Uses the Composite pattern.",
        "Uses the Strategy pattern.",
        "Separates traversal logic and rendering.",
        "Implements recursive size calculation."
      ],
      challenges: [
        "Designed recursive size calculation.",
        "Kept visualization independent from the file model.",
        "Allowed different viewing modes without changing core logic."
      ],
      tags: [
        "Java",
        "JavaFX",
        "Composite Pattern",
        "Strategy Pattern",
        "Filesystem",
        "Visualization"
      ]
    }
  };

  const modal = document.getElementById("project-modal");
  const modalOverlay = document.getElementById("project-modal-overlay");
  const modalClose = document.getElementById("project-modal-close");

  const modalEyebrow = document.getElementById("project-modal-eyebrow");
  const modalTitle = document.getElementById("project-modal-title");
  const modalSummary = document.getElementById("project-modal-summary");
  const modalOverview = document.getElementById("project-modal-overview");
  const modalFeatures = document.getElementById("project-modal-features");
  const modalTech = document.getElementById("project-modal-tech");
  const modalChallenges = document.getElementById("project-modal-challenges");
  const modalTags = document.getElementById("project-modal-tags");

  function fillList(container, items) {
    if (!container) return;
    container.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  }

  function fillTags(container, items) {
    if (!container) return;
    container.innerHTML = items
      .map((item) => `<span class="pill">${item}</span>`)
      .join("");
  }

  function openProjectModal(projectKey) {
    const project = projectData[projectKey];
    if (!project || !modal) return;

    modalEyebrow.textContent = project.eyebrow;
    modalTitle.textContent = project.title;
    modalSummary.textContent = project.summary;
    modalOverview.textContent = project.overview;

    fillList(modalFeatures, project.features);
    fillList(modalTech, project.tech);
    fillList(modalChallenges, project.challenges);
    fillTags(modalTags, project.tags);

    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      openProjectModal(btn.dataset.project);
    });
  });

  modalClose?.addEventListener("click", closeProjectModal);
  modalOverlay?.addEventListener("click", closeProjectModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) {
      closeProjectModal();
    }
  });

  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (!backToTopBtn) return;

    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});