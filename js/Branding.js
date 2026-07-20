// branding.js

document.addEventListener("DOMContentLoaded", () => {
    loadBranding();
});

// Load startup data
function loadBranding() {
    const startup = JSON.parse(localStorage.getItem("startupData")) || {};

    document.getElementById("companyName").textContent =
        startup.name || "Your Startup";

    document.getElementById("brandTagline").textContent =
        startup.tagline || "Innovation Starts Here";

    document.getElementById("brandColors").textContent =
        startup.colors || "#2563EB, #10B981, #F8FAFC";

    document.getElementById("logoIdea").textContent =
        startup.logo ||
        "Minimal modern logo using geometric shapes with clean typography.";

    document.getElementById("brandVoice").textContent =
        startup.voice ||
        "Professional, Innovative and Trustworthy";
}

// Generate Branding
function generateBranding() {

    const startup = JSON.parse(localStorage.getItem("startupData")) || {};

    startup.tagline = "Building Tomorrow, Today";
    startup.colors = "#2563EB, #10B981, #F8FAFC";
    startup.logo = "Minimal blue gradient logo with futuristic icon.";
    startup.voice = "Modern, Friendly, Professional";

    localStorage.setItem("startupData", JSON.stringify(startup));

    loadBranding();

    alert("Branding generated successfully!");
}

// Save Branding
function saveBranding() {

    const startup = JSON.parse(localStorage.getItem("startupData")) || {};

    startup.tagline =
        document.getElementById("brandTagline").textContent;

    startup.colors =
        document.getElementById("brandColors").textContent;

    startup.logo =
        document.getElementById("logoIdea").textContent;

    startup.voice =
        document.getElementById("brandVoice").textContent;

    localStorage.setItem("startupData", JSON.stringify(startup));

    alert("Branding saved!");
}

// Next Page
function goToFinancial() {
    window.location.href = "financial.html";
}