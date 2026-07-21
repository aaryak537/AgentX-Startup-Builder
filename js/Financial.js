document.addEventListener("DOMContentLoaded", () => {

    loadFinancialData();

    const saveBtn = document.getElementById("saveFinancial");

    if (saveBtn) {
        saveBtn.addEventListener("click", saveFinancialData);
    }

    ["investment", "monthlyRevenue", "monthlyExpense"].forEach(id => {

        const input = document.getElementById(id);

        if (input) {
            input.addEventListener("input", calculateFinancials);
        }

    });

});


// ================= LOAD DATA =================

function loadFinancialData() {

    const startup = AgentX.loadStartup();

    AgentX.paintTopbarMeta(startup);

    document.getElementById("startupName").textContent =
        startup.name;

    document.getElementById("investment").value =
        startup.financial?.investment || 500000;

    document.getElementById("monthlyRevenue").value =
        Math.round((startup.financial?.revenueY1 || 1200000) / 12);

    document.getElementById("monthlyExpense").value =
        Math.round(
            ((startup.financial?.revenueY1 || 1200000) * 0.60) / 12
        );

    // Optional cards if present

    if (document.getElementById("roi")) {

        document.getElementById("roi").textContent =
            startup.financial.roi + "%";

    }

    if (document.getElementById("startupScore")) {

        document.getElementById("startupScore").textContent =
            startup.score + "/100";

    }

    calculateFinancials();

}



// ================= CALCULATE =================

function calculateFinancials() {

    const investment =
        Number(document.getElementById("investment").value);

    const revenue =
        Number(document.getElementById("monthlyRevenue").value);

    const expense =
        Number(document.getElementById("monthlyExpense").value);

    const profit =
        revenue - expense;

    const annualProfit =
        profit * 12;

    const roi =
        investment > 0
        ? ((annualProfit / investment) * 100).toFixed(1)
        : 0;

    let breakEven = "-";

    if (profit > 0) {

        breakEven =
            (investment / profit).toFixed(1) +
            " Months";

    }

    document.getElementById("profit").textContent =
        "₹" + profit.toLocaleString("en-IN");

    document.getElementById("breakEven").textContent =
        breakEven;

    if (document.getElementById("annualProfit")) {

        document.getElementById("annualProfit").textContent =
            "₹" + annualProfit.toLocaleString("en-IN");

    }

    if (document.getElementById("roi")) {

        document.getElementById("roi").textContent =
            roi + "%";

    }

}



// ================= SAVE =================

function saveFinancialData() {

    const startup =
        AgentX.loadStartup();

    startup.financial.investment =
        Number(document.getElementById("investment").value);

    startup.financial.revenueY1 =
        Number(document.getElementById("monthlyRevenue").value) * 12;

    startup.financial.monthlyExpense =
        Number(document.getElementById("monthlyExpense").value);

    localStorage.setItem(
        "agentx_startup",
        JSON.stringify(startup)
    );

    calculateFinancials();

    alert("✅ Financial data saved.");

}