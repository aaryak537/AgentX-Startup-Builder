document.addEventListener("DOMContentLoaded", () => {
    // Get startup data from sessionStorage
    const startupData = sessionStorage.getItem("startup");

    if (!startupData) {
        console.error("No startup data found in sessionStorage.");
        return;
    }

    const startup = JSON.parse(startupData);

    if (!startup.branding) {
        console.error("Branding data not found.");
        return;
    }

    // Populate Branding Page
    document.getElementById("startupName").textContent =
        startup.branding.startupName || "Not Available";

    document.getElementById("tagline").textContent =
        startup.branding.tagline || "Not Available";

    document.getElementById("logoPrompt").textContent =
        startup.branding.logoPrompt || "Not Available";
});