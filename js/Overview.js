document.addEventListener("DOMContentLoaded", async () => {

    // -----------------------------
    // Get Startup ID from URL
    // -----------------------------
    const params = new URLSearchParams(window.location.search);
    const startupId = params.get("id");

    if (!startupId) {
        console.error("No Startup ID found.");
        return;
    }

    // -----------------------------
    // Load Startup Data
    // -----------------------------
    let startup = null;

    try {

        // If engine.js contains loadStartup()
        startup = await AgentX.loadStartup(startupId);

    } catch (error) {

        console.error(error);

    }

    if (!startup) {
        console.log("Startup not found");
        return;
    }

    // -----------------------------
    // Populate Overview
    // -----------------------------

    setText("startupName", startup.name);
    setText("startupIdea", startup.idea);
    setText("industry", startup.industry);
    setText("targetMarket", startup.targetMarket);
    setText("businessModel", startup.businessModel);
    setText("problem", startup.problem);
    setText("solution", startup.solution);
    setText("tagline", startup.tagline);

    // -----------------------------
    // Optional Progress Bar
    // -----------------------------

    if (document.getElementById("progressFill")) {

        document.getElementById("progressFill").style.width =
            (startup.progress || 0) + "%";

    }

    // -----------------------------
    // Navigation Buttons
    // -----------------------------

    const pages = {

        marketBtn: "marketResearch.html",
        brandingBtn: "branding.html",
        financialBtn: "financial.html",
        marketingBtn: "marketing.html",
        dashboardBtn: "dashboard.html"

    };

    Object.keys(pages).forEach(id => {

        const btn = document.getElementById(id);

        if (!btn) return;

        btn.addEventListener("click", () => {

            window.location.href =
                `${pages[id]}?id=${startupId}`;

        });

    });

});

// =====================================
// Helper Function
// =====================================

function setText(id, value) {

    const el = document.getElementById(id);

    if (el) {

        el.textContent = value || "-";

    }

}