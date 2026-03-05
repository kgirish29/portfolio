// -----------------------------
// Theme toggle (dark + light)
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearFooterEl = document.getElementById("yearFooter");
  if (yearFooterEl) yearFooterEl.textContent = new Date().getFullYear();

  // Theme init
  const themeToggle = document.getElementById("themeToggle");

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
  }

  const savedTheme = localStorage.getItem("theme");
  setTheme(savedTheme || "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  // -----------------------------
  // Page routing (click nav -> show one page)
  // -----------------------------
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const pages = Array.from(document.querySelectorAll(".page"));

 function showPage(route) {
  navItems.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.route === route)
  );

  pages.forEach((page) => {
    const isTarget = page.dataset.page === route;

    if (isTarget) {
      page.hidden = false;
      requestAnimationFrame(() => page.classList.remove("is-hiding"));
    } else {
      if (!page.hidden) {
        page.classList.add("is-hiding");
        setTimeout(() => {
          page.hidden = true;
        }, 180);
      }
    }
  });

  window.location.hash = route;

  // ✅ force page to start at the top
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

  // allow inline onclick to work
  window.showPage = showPage;

  navItems.forEach((btn) => {
    btn.addEventListener("click", () => showPage(btn.dataset.route));
  });

  const validRoutes = new Set([
    "home",
    "projects",
    "experience",
    "about",
    "resume",
    "contact",
  ]);

  const initial = (window.location.hash || "#home").replace("#", "");
  showPage(validRoutes.has(initial) ? initial : "home");

  window.addEventListener("hashchange", () => {
    const r = (window.location.hash || "#home").replace("#", "");
    showPage(validRoutes.has(r) ? r : "home");
  });

  // -----------------------------
  // Projects data + rendering
  // -----------------------------
  const PROJECTS = [
    {
      id: "capstone-claims",
      label: "BUILD",
      badge: "Featured",
      title: "Automotive Insurance Claims Risk Triage",
      desc: "ML-driven triage to prioritize risky claims with explainability and analyst-friendly review.",
      overview:
        "Designed a risk triage workflow to help insurers prioritize investigations by scoring claim risk and surfacing clear drivers behind the prediction.",
      did: [
        "Prepared structured claim datasets and built a reproducible training + evaluation workflow.",
        "Trained classification models and tuned decision thresholds to support a practical investigation queue.",
        "Added explainability outputs (e.g., feature-attribution style reasoning) to support analyst trust and review.",
      ],
      outcomes: [
        "Provided consistent risk scoring + interpretable drivers for faster claim review.",
        "Produced investigation-ready outputs that support prioritization and triage workflows.",
      ],
      gained: [
        "Stronger end-to-end ML workflow design (data → model → evaluation → decisioning).",
        "Hands-on experience making model outputs explainable and stakeholder-friendly.",
        "Better framing of ML results for operational decision-making.",
      ],
      tags: ["Python", "LightGBM", "scikit-learn", "SHAP", "Streamlit", "ML Evaluation"],
      link1: { text: "Case Study", href: "#" },
      link2: { text: "Repo", href: "#" },
    },
    {
      id: "nyc-taxi",
      label: "ANALYTICS",
      badge: "Featured",
      title: "NYC Taxi Streaming Analytics Pipeline",
      desc: "Large-scale trip analysis to identify demand hotspots and revenue patterns for planning.",
      overview:
        "Analyzed taxi trip records to uncover peak demand zones, time-based patterns, and revenue drivers using SQL-first analytics.",
      did: [
        "Built reusable SQL queries to profile demand by zone, time, and trip characteristics.",
        "Applied performance-aware SQL patterns (aggregations, indexing strategy, efficient joins).",
        "Summarized insights into decision-ready findings for demand planning discussions.",
      ],
      outcomes: [
        "Clear hotspot + timing insights to support operational planning and resource allocation.",
        "Faster iteration through reusable query templates and optimized query patterns.",
      ],
      gained: [
        "Improved SQL optimization instincts for large datasets.",
        "Stronger analytics storytelling: translating queries into clear narratives.",
        "Experience building repeatable analysis workflows.",
      ],
      tags: ["SQL", "Python", "Pandas", "EDA", "Query Optimization"],
      link1: { text: "Report", href: "#" },
      link2: { text: "Repo", href: "#" },
      
    },
    {
      id: "retail-pulse",
      label: "PIPELINE",
      badge: "Featured",
      title: "RetailPulse — Real-Time E-commerce Analytics & Dashboard",
      desc: "Real-time GCP pipeline for clickstream analytics, KPI reporting, and forecasting with a business dashboard.",
      overview:
        "Architected an end-to-end e-commerce analytics stack that simulates realistic user journeys, streams events into BigQuery, transforms data with dbt, and surfaces KPIs + forecasts in Tableau.",
      did: [
        "Built a Python synthetic data generator to simulate journeys like cart abandonment, returns, repeat customers, and out-of-stock events.",
        "Streamed events via Pub/Sub into BigQuery and organized raw vs analytics-ready layers for reliability.",
        "Automated hourly transformations with dbt to support funnel drop-off analysis and product KPI reporting.",
        "Added a daily retraining BigQuery ML workflow to generate a rolling sales forecast for reporting.",
      ],
      outcomes: [
        "Delivered a Tableau dashboard to explore conversion funnel behavior, product trends, and operational KPIs.",
        "Reduced repetitive data preparation through reusable transformations and standardized metrics.",
      ],
      gained: [
        "Hands-on practice with modern analytics engineering workflows (raw → modeled → metrics → dashboard).",
        "Better instincts for building pipelines that are reliable, repeatable, and dashboard-ready.",
        "Experience connecting streaming ingestion with BI-friendly modeling and forecasting outputs.",
      ],
      tags: ["Python", "GCP", "BigQuery", "dbt", "Pub/Sub", "Tableau"],
      link1: { text: "Demo", href: "#" },
      link2: { text: "Repo", href: "#" },
      
    },
    {
      id: "tourism-dashboard",
      label: "DASHBOARD",
      badge: "Featured",
      title: "Tourism Analytics Dashboard",
      desc: "Interactive dashboard to explore tourism patterns with scoring metrics and insights.",
      overview:
        "Built an interactive dashboard to analyze tourism patterns and support exploration by category, region, and performance signals.",
      did: [
        "Cleaned and modeled tourism data to support reliable slicing across categories and locations.",
        "Created KPI views and trend exploration to highlight growth and revenue patterns.",
        "Packaged visuals into an interactive dashboard experience.",
      ],
      outcomes: [
        "Improved clarity of tourism trends through interactive exploration and KPI framing.",
        "Created a reusable dashboard structure for future dataset extensions.",
      ],
      gained: [
        "Dashboard design practice: KPIs, hierarchy, and user-friendly drill downs.",
        "Better understanding of shaping data for BI consumption.",
        "Stronger end-to-end workflow from EDA to final dashboard.",
      ],
      tags: ["Python", "Tableau", "EDA", "Dashboard Design", "KPI Design"],
      link1: { text: "Dashboard", href: "#" },
      link2: { text: "Repo", href: "#" },
      
    },
    {
      id: "customer-churn",
      label: "ML",
      badge: "Featured",
      title: "Customer Churn Prediction — Starbucks Retention Analytics",
      desc: "Churn risk modeling with interpretable loyalty drivers and retention recommendations.",
      overview:
        "Built and compared multiple classification models to predict churn risk and identify key loyalty drivers for retention-focused decisions.",
      did: [
        "Prepared Starbucks customer data and created an evaluation workflow for churn classification.",
        "Trained and compared models including SVM, Decision Tree, KNN, and Logistic Regression.",
        "Analyzed feature signals to identify loyalty drivers such as visit frequency, income band, and gender.",
      ],
      outcomes: [
        "Selected the best-performing model and packaged findings into retention-oriented recommendations.",
        "Translated model outputs into clear drivers to support targeted customer engagement strategies.",
      ],
      gained: [
        "Stronger model comparison + evaluation habits for classification problems.",
        "Practice turning model results into business-friendly recommendations.",
        "Improved EDA + feature reasoning for churn/retention use cases.",
      ],
      tags: ["Python", "Scikit-learn", "ML Models", "EDA"],
      link1: { text: "Report", href: "#" },
      link2: { text: "Repo", href: "#" },
      
    },
    {
      id: "risk-lens",
      label: "ANALYTICS",
      badge: "Featured",
      title: "RiskLens — Portfolio Risk & Return Analyzer",
      desc: "End-to-end financial analytics workflow with modeling, metrics, and interactive portfolio insights.",
      overview:
        "Built a quantitative analytics workflow to transform market data into analysis-ready models and deliver a Tableau dashboard for portfolio performance and risk exploration.",
      did: [
        "Built an analytics engineering workflow to ingest and transform financial data into tested analytical models.",
        "Engineered predictive features and modeled next-day returns using scikit-learn as an applied forecasting component.",
        "Designed portfolio metrics and breakdowns (risk/return drivers) for interactive exploration in Tableau.",
      ],
      outcomes: [
        "Delivered a dashboard for comparing asset behavior over time and exploring portfolio risk/return trade-offs.",
        "Created a repeatable pipeline structure that supports reliable metric definitions and updates.",
      ],
      gained: [
        "Better understanding of building trustworthy financial metrics from raw data pipelines.",
        "Practice combining analytics engineering + modeling in a single workflow.",
        "Improved dashboard storytelling for multi-metric decision contexts.",
      ],
      tags: ["Python", "dbt", "Scikit-learn", "Tableau", "Financial Analytics"],
      link1: { text: "Demo", href: "#" },
      link2: { text: "Repo", href: "#" },
      
    },
    {
      id: "hotel-pricing",
      label: "CAUSAL",
      badge: "Featured",
      title: "Hotel Pricing Elasticity — Dynamic Pricing with Causal Inference",
      desc: "Causal analysis of how price affects booking behavior across segments for pricing strategy.",
      overview:
        "Built an end-to-end analysis in R to estimate price elasticity and segment sensitivity, simulating a dynamic pricing framework for an online travel agency.",
      did: [
        "Analyzed a randomized experiment dataset to estimate the causal impact of price on booking probability.",
        "Modeled booking likelihood with logistic regression to quantify segment-level price sensitivity.",
        "Segmented customers by income and region to identify markets with higher sensitivity.",
      ],
      outcomes: [
        "Delivered pricing and revenue optimization insights based on segment elasticity differences.",
        "Produced a clear framework for translating causal findings into pricing strategy recommendations.",
      ],
      gained: [
        "Stronger causal thinking: separating correlation from decision-relevant impact.",
        "More confidence in experiment design framing and interpreting model outputs.",
        "Improved ability to communicate statistical findings as business actions.",
      ],
      tags: ["R", "Causal Inference", "Statistical Modeling", "Logistic Regression", "Experiment Design", "Data Visualization"],
      link1: { text: "Report", href: "#" },
      link2: { text: "Repo", href: "#" },
    },
  ];

  function projectCardHTML(p) {
    const tags = p.tags
      .slice(0, 4)
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
    const badge = p.badge ? `<span class="proj-badge">${p.badge}</span>` : "";

    return `
      <article class="card proj" data-id="${p.id}">
        <div class="proj-top">
          <p class="proj-label">${p.label}</p>
          ${badge}
        </div>

        <h3 class="proj-title">${p.title}</h3>
        <p class="proj-desc">${p.desc}</p>

        <div class="proj-tags">${tags}</div>

        <div class="proj-foot">
          <button class="proj-btn" type="button" data-details="${p.id}">Details</button>
          <div class="proj-links">
            <a class="proj-link" href="${p.link2?.href || "#"}" target="_blank" rel="noopener noreferrer">Repo →</a>
          </div>
        </div>
      </article>
    `;
  }

  function renderProjectsGrid() {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;
    grid.innerHTML = PROJECTS.map(projectCardHTML).join("");
  }

  // -----------------------------
  // Modal logic
  // -----------------------------
  const modal = document.getElementById("projModal");
  const modalMeta = document.getElementById("modalMeta");
  const modalTitle = document.getElementById("modalTitle");
  const modalSub = document.getElementById("modalSub");
  const modalOverview = document.getElementById("modalOverview");
  const modalDid = document.getElementById("modalDid");
  const modalOutcomes = document.getElementById("modalOutcomes");
  const modalGained = document.getElementById("modalGained");
  const modalTags = document.getElementById("modalTags");
  const modalLink1 = document.getElementById("modalLink1");
  const modalLink2 = document.getElementById("modalLink2");
  const modalNote = document.getElementById("modalNote");

  function openModal(projectId) {
    const p = PROJECTS.find((x) => x.id === projectId);
    if (!p || !modal) return;

    if (modalMeta) modalMeta.textContent = p.label;
    if (modalTitle) modalTitle.textContent = p.title;
    if (modalSub) modalSub.textContent = p.desc;
    if (modalOverview) modalOverview.textContent = p.overview || "";

    if (modalDid) modalDid.innerHTML = (p.did || []).map((x) => `<li>${x}</li>`).join("");
    if (modalOutcomes) modalOutcomes.innerHTML = (p.outcomes || []).map((x) => `<li>${x}</li>`).join("");
    if (modalGained) modalGained.innerHTML = (p.gained || []).map((x) => `<li>${x}</li>`).join("");

    if (modalTags) modalTags.innerHTML = (p.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");

    if (modalLink1) {
      if (p.link1?.href && p.link1.href !== "#") {
        modalLink1.href = p.link1.href;
        modalLink1.textContent = p.link1.text || "View";
        modalLink1.style.display = "inline-flex";
      } else {
        modalLink1.href = "#";
        modalLink1.style.display = "none";
      }
    }

    if (modalLink2) {
      if (p.link2?.href && p.link2.href !== "#") {
        modalLink2.href = p.link2.href;
        modalLink2.textContent = p.link2.text || "Repo";
        modalLink2.style.display = "inline-flex";
      } else {
        modalLink2.href = "#";
        modalLink2.style.display = "none";
      }
    }

    if (modalNote) modalNote.textContent = p.note || "";

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // allow featured buttons to open modal
  window.openModal = openModal;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-details]");
    if (btn) openModal(btn.getAttribute("data-details"));

    const close = e.target.closest("[data-close]");
    if (close) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // -----------------------------
  // Home page: Featured 3 projects (optional overwrite)
  // -----------------------------
  function renderHomeFeatured() {
    const homeGrid = document.querySelector("#featured .grid");
    if (!homeGrid) return;

    const top3 = PROJECTS.slice(0, 3);
    homeGrid.innerHTML = top3
      .map(
        (p) => `
        <article class="card project-card">
          <p class="mini-label">${p.label}</p>
          <h3 class="card-title">${p.title}</h3>
          <p class="muted">${p.desc}</p>

          <div class="tags">
            ${p.tags.slice(0, 3).map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>

          <div class="card-actions">
            <button class="btn ghost small" type="button"
              onclick="showPage('projects'); setTimeout(()=>openModal('${p.id}'), 80);">
              Details
            </button>
            <a class="link" href="${p.link2?.href || "#"}" target="_blank" rel="noopener noreferrer">Repo →</a>
          </div>
        </article>
      `
      )
      .join("");
  }

  // Boot
  renderProjectsGrid();
  renderHomeFeatured();
});