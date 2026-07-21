document.addEventListener("DOMContentLoaded", () => {
    const startup = AgentX.loadStartup();

    if (!startup) {
        console.error("Startup not found.");
        return;
    }

    AgentX.paintTopbarMeta(startup);
    loadOverview(startup);
});

// ==========================================
// LOAD OVERVIEW
// ==========================================

function loadOverview(startup) {

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = value ?? "";
        }
    };

    // ==========================================
    // BASIC INFO
    // ==========================================

    setText("startupName", startup.name);
    setText("startupTagline", startup.tagline);
    setText("logoInitials", startup.initials);
    setText("logoName", startup.name);

    setText("scoreVal", startup.score);
    setText("readyPct", startup.launchReadiness + "%");

    setText(
        "startupId",
        startup.startupId ||
        "AGX-" + String(Date.now()).slice(-6)
    );

    setText(
        "engineVersion",
        startup.engineVersion || "AgentX AI Engine v1.0"
    );

    // ==========================================
    // SUMMARY
    // ==========================================

    setText(
        "summaryText",
        startup.businessPlan?.executiveSummary ||
        "AI Generated Startup."
    );

    // ==========================================
    // MARKET
    // ==========================================

    setText(
        "marketLabelText",
        startup.marketLabel || "Market Opportunity"
    );

    setText(
        "marketSizeText",
        "$" + (startup.marketSize || 0) + "B"
    );

    // ==========================================
    // FINANCIAL
    // ==========================================

    if (startup.financial) {

        setText(
            "fhInvestment",
            AgentX.fmtMoney(startup.financial.investment)
        );

        setText(
            "fhRevenue",
            AgentX.fmtMoney(startup.financial.revenueY1)
        );

        const margin = Math.round(
            (startup.financial.netProfitY1 /
                startup.financial.revenueY1) * 100
        );

        setText(
            "fhMargin",
            margin + "%"
        );
    }

    // ==========================================
    // CATEGORY CHIPS
    // ==========================================

    const chipRow = document.getElementById("chipRow");

    if (chipRow) {

        chipRow.innerHTML = `
            <span class="chip">
                ${startup.icon} ${startup.category}
            </span>

            <span class="chip">
                ⭐ ${startup.score}/100
            </span>

            <span class="chip">
                🚀 ${startup.launchReadiness}% Ready
            </span>
        `;
    }

    // ==========================================
    // LOGO CARD
    // ==========================================

    const logoPlate = document.getElementById("logoPlate");

    if (logoPlate && startup.palette?.length >= 2) {

        logoPlate.style.background = `
            linear-gradient(
                135deg,
                ${startup.palette[0]},
                ${startup.palette[1]}
            )
        `;
    }

    // ==========================================
    // SCORE RINGS
    // ==========================================

    const scoreRing = document.getElementById("scoreRing");

    if (scoreRing) {
        scoreRing.style.setProperty("--p", startup.score);
    }

    const readyRing = document.getElementById("readyRing");

    if (readyRing) {
        readyRing.style.setProperty(
            "--p",
            startup.launchReadiness
        );
    }

    // ==========================================
    // COMPETITORS
    // ==========================================

    const competitorList =
        document.getElementById("competitorList");

    if (competitorList && startup.competitors) {

        competitorList.innerHTML = "";

        startup.competitors.forEach(c => {

            competitorList.innerHTML += `
                <div class="competitor-item">
                    <strong>${c.name}</strong>
                    <span>${c.tag}</span>
                </div>
            `;
        });
    }

    // ==========================================
    // MINI MARKET BARS
    // ==========================================

    const miniBars =
        document.getElementById("miniBars");

    if (miniBars && startup.financial?.revenueForecast) {

        miniBars.innerHTML = "";

        const max = Math.max(
            ...startup.financial.revenueForecast
        );

        startup.financial.revenueForecast.forEach(value => {

            const h = (value / max) * 100;

            miniBars.innerHTML += `
                <div class="bar"
                     style="height:${h}%">
                </div>
            `;
        });
    }

    // ==========================================
    // GENERATED DATE
    // ==========================================

    const generated =
        document.getElementById("generatedAt");

    if (generated && startup.generatedAt) {

        generated.textContent =
            new Date(startup.generatedAt)
                .toLocaleString();
    }

    console.log("Overview Loaded", startup);
}