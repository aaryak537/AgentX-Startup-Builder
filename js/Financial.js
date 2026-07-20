document.addEventListener("DOMContentLoaded", () => {
    loadFinancialData();

    const saveBtn = document.getElementById("saveFinancial");
    if (saveBtn) {
        saveBtn.addEventListener("click", saveFinancialData);
    }
});

// Load startup information
function loadFinancialData() {
    const startup = JSON.parse(localStorage.getItem("startupData")) || {};

    document.getElementById("startupName").textContent =
        startup.name || "My Startup";

    document.getElementById("investment").value =
        startup.investment || 500000;

    document.getElementById("monthlyRevenue").value =
        startup.monthlyRevenue || 100000;

    document.getElementById("monthlyExpense").value =
        startup.monthlyExpense || 60000;

    calculateFinancials();
}

// Calculate profit and break-even
function calculateFinancials() {

    const investment = Number(document.getElementById("investment").value);
    const revenue = Number(document.getElementById("monthlyRevenue").value);
    const expense = Number(document.getElementById("monthlyExpense").value);

    const profit = revenue - expense;

    let breakEven = "-";

    if (profit > 0) {
        breakEven = (investment / profit).toFixed(1) + " Months";
    }

    document.getElementById("profit").textContent =
        "₹" + profit.toLocaleString();

    document.getElementById("breakEven").textContent =
        breakEven;
}

// Save Data
function saveFinancialData() {

    const startup = JSON.parse(localStorage.getItem("startupData")) || {};

    startup.investment =
        Number(document.getElementById("investment").value);

    startup.monthlyRevenue =
        Number(document.getElementById("monthlyRevenue").value);

    startup.monthlyExpense =
        Number(document.getElementById("monthlyExpense").value);

    localStorage.setItem("startupData", JSON.stringify(startup));

    calculateFinancials();

    alert("Financial data saved successfully!");
}

// Auto calculate while typing
["investment", "monthlyRevenue", "monthlyExpense"].forEach(id => {

    const element = document.getElementById(id);

    if (element) {
        element.addEventListener("input", calculateFinancials);
    }

});