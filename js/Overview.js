document.addEventListener("DOMContentLoaded", () => {

    const s = AgentX.loadStartup();

    if (!s) {
        console.error("No startup data found.");
        return;
    }

    loadOverview(s);

});


function loadOverview(s){

    const setText = (id, value) => {

        const el = document.getElementById(id);

        if(el){
            el.textContent = value ?? "";
        }
        else{
            console.warn("Missing ID:", id);
        }

    };


    setText("startupTagline", s.tagline);

    setText("scoreVal", s.score);

    setText("logoInitials", s.initials);

    setText("logoName", s.name);

    setText(
        "summaryText",
        s.businessPlan?.executiveSummary || "AI Generated Startup"
    );


    setText(
        "marketLabelText",
        s.marketLabel
    );


    setText(
        "marketSizeText",
        "$" + s.marketSize + "B"
    );


    setText(
        "fhInvestment",
        AgentX.fmtMoney(s.financial?.investment || 0)
    );


    setText(
        "fhRevenue",
        AgentX.fmtMoney(s.financial?.revenueY1 || 0)
    );


    setText(
        "fhMargin",
        Math.round(
            ((s.financial?.netProfitY1 || 0) /
            (s.financial?.revenueY1 || 1)) * 100
        ) + "%"
    );


    setText(
        "readyPct",
        s.launchReadiness + "%"
    );


    const chipRow = document.getElementById("chipRow");

    if(chipRow){
        chipRow.innerHTML =
        `
        <span class="chip">${s.icon} ${s.category}</span>
        <span class="chip">Score ${s.score}/100</span>
        <span class="chip">${s.launchReadiness}% launch-ready</span>
        `;
    }


    const logoPlate = document.getElementById("logoPlate");

    if(logoPlate && s.palette){
        logoPlate.style.background =
        `linear-gradient(135deg,${s.palette[0]},${s.palette[1]})`;
    }


    const scoreRing = document.getElementById("scoreRing");

    if(scoreRing){
        scoreRing.style.setProperty("--p",s.score);
    }


    const readyRing = document.getElementById("readyRing");

    if(readyRing){
        readyRing.style.setProperty("--p",s.launchReadiness);
    }

}