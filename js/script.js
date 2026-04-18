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
  // 2) Theme toggle
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
  // 3) Visitor Name (SAFE FIX)
  // =========================
  const visitorNameInput = document.getElementById("visitor-name");
  const welcomeMsg = document.getElementById("welcome-msg");

  if (visitorNameInput && welcomeMsg) {

    const savedName = localStorage.getItem("visitorName");

    if (savedName) {
      welcomeMsg.textContent = `Welcome back, ${savedName}!`;
      visitorNameInput.value = savedName;
    }

    visitorNameInput.addEventListener("input", () => {
      const name = visitorNameInput.value.trim();

      if (name === "") {
        localStorage.removeItem("visitorName");
        welcomeMsg.textContent = "";
        return;
      }

      localStorage.setItem("visitorName", name);
      welcomeMsg.textContent = `Hello, ${name}!`;
    });
  }

  // =========================
  // 4) Project Filter
  // =========================
  const searchInput = document.getElementById("project-search");
  const projectsList = document.getElementById("projects-list");
  const searchFeedback = document.getElementById("project-search-feedback");
  const emptyState = document.getElementById("projects-empty-state");

  function getProjectCards() {
    return projectsList ? Array.from(projectsList.querySelectorAll(".project-card")) : [];
  }

  function filterProjects() {
    if (!searchInput) return;

    const query = searchInput.value.trim().toLowerCase();
    const cards = getProjectCards();

    let visible = 0;

    cards.forEach(card => {
      const title = card.dataset.title?.toLowerCase() || "";
      const tags = card.dataset.tags?.toLowerCase() || "";

      const match = title.includes(query) || tags.includes(query);

      card.classList.toggle("is-hidden", !match);

      if (match) visible++;
    });

    if (searchFeedback) {
      if (query === "") {
        searchFeedback.textContent = "Showing all projects.";
      } else if (visible > 0) {
        searchFeedback.textContent = `Found ${visible} project(s).`;
      } else {
        searchFeedback.textContent = "No projects found.";
      }
    }

    if (emptyState) {
      emptyState.hidden = visible !== 0;
    }
  }

  searchInput?.addEventListener("input", filterProjects);

  // =========================
  // 5) Sorting
  // =========================
  const sortSelect = document.getElementById("sort-projects");
  const originalCards = getProjectCards();

  sortSelect?.addEventListener("change", () => {
    if (!projectsList) return;

    let cards = getProjectCards();

    if (sortSelect.value === "az") {
      cards.sort((a, b) =>
        a.dataset.title.localeCompare(b.dataset.title)
      );
    } else if (sortSelect.value === "za") {
      cards.sort((a, b) =>
        b.dataset.title.localeCompare(a.dataset.title)
      );
    } else {
      cards = [...originalCards];
    }

    projectsList.innerHTML = "";
    cards.forEach(c => projectsList.appendChild(c));

    filterProjects();
  });

  // =========================
  // 6) Contact Form
  // =========================
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.textContent = "Message sent successfully!";
    statusEl.classList.add("success");
    form.reset();
  });

  // =========================
  // 7) GitHub API
  // =========================
  
const githubContainer = document.getElementById("github-projects");
const apiError = document.getElementById("api-error");

async function loadRepos() {
  if (!githubContainer) return;

  githubContainer.innerHTML =
    "<p class='project-search-feedback'>Loading repositories...</p>";

  try {
    const res = await fetch(
      "https://api.github.com/users/ShahadAlmatrudi/repos?per_page=4"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch repositories.");
    }

    const data = await res.json();

    githubContainer.innerHTML = data
      .map((repo) => {
        return `
          <article class="project-card">
            <div class="project-body">
              <p class="project-kicker">GitHub Repository</p>

              <h3 class="project-name">${repo.name}</h3>

              <p class="project-sub">
                ${repo.description ? repo.description : "No description available for this repository."}
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

    if (apiError) {
      apiError.hidden = true;
    }
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
});