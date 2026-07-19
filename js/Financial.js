// Load startup data from localStorage
const startup = JSON.parse(localStorage.getItem("startup"));

// Check if startup and finance data exist
if (startup && startup.finance) {

    const finance = startup.finance;

    document.getElementById("investment").textContent =
        finance.estimatedInvestment || "Not Available";

    document.getElementById("expenses").textContent =
        finance.monthlyExpenses || "Not Available";

    document.getElementById("revenue").textContent =
        finance.monthlyRevenue || "Not Available";

    document.getElementById("breakEven").textContent =
        finance.breakEven || "Not Available";

} else {

    console.error("Finance data not found!");

    document.getElementById("investment").textContent = "₹0";
    document.getElementById("expenses").textContent = "₹0";
    document.getElementById("revenue").textContent = "₹0";
    document.getElementById("breakEven").textContent = "N/A";

}