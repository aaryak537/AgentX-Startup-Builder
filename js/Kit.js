document.addEventListener("DOMContentLoaded", () => {

    // Load startup data
    const startup = JSON.parse(localStorage.getItem("startupData"));

    if (!startup) {
        alert("No startup data found. Please generate a startup first.");
        window.location.href = "dashboard.html";
        return;
    }

    // Display startup information
    document.getElementById("startupName").textContent =
        startup.name || "My Startup";

    document.getElementById("industry").textContent =
        startup.industry || "-";

    document.getElementById("description").textContent =
        startup.description || "-";

    document.getElementById("targetMarket").textContent =
        startup.targetMarket || "-";

    document.getElementById("budget").textContent =
        startup.budget || "-";

    document.getElementById("score").textContent =
        startup.score || "0";

    // Navigation buttons

    document.getElementById("overviewBtn").onclick = () => {
        window.location.href = "overview.html";
    };

    document.getElementById("brandingBtn").onclick = () => {
        window.location.href = "branding.html";
    };

    document.getElementById("financialBtn").onclick = () => {
        window.location.href = "financial.html";
    };

    document.getElementById("marketingBtn").onclick = () => {
        window.location.href = "marketing.html";
    };

    document.getElementById("dashboardBtn").onclick = () => {
        window.location.href = "dashboard.html";
    };

    // Save again (optional)

    document.getElementById("saveBtn")?.addEventListener("click", () => {
        localStorage.setItem("startupData", JSON.stringify(startup));
        alert("Startup saved successfully!");
    });

    // Export

    document.getElementById("exportBtn")?.addEventListener("click", () => {

        const data = JSON.stringify(startup, null, 2);

        const blob = new Blob([data], {
            type: "application/json"
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = `${startup.name || "startup"}-report.json`;

        a.click();

        URL.revokeObjectURL(url);

    });

});