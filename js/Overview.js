// overview.js

document.addEventListener("DOMContentLoaded", () => {

    // Retrieve startup data
    const startup = JSON.parse(sessionStorage.getItem("startup"));

    // Check if startup data exists
    if (startup === null) {
        alert("Startup data not found. Please generate a startup first.");
        window.location.href = "startup.html";
        return;
    }

    // Populate Overview Page
    document.getElementById("industry").textContent = startup.market.industry;
    document.getElementById("audience").textContent = startup.market.targetAudience;
    document.getElementById("mission").textContent = startup.branding.mission;
    document.getElementById("vision").textContent = startup.branding.vision;

});