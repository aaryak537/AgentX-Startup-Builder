document.addEventListener("DOMContentLoaded", () => {
    // Get startup data from localStorage
    const startup = JSON.parse(localStorage.getItem("startup"));

    if (!startup || !startup.website) {
        console.error("Website data not found.");
        return;
    }

    const website = startup.website;

    document.getElementById("hero").textContent =
        website.heroTitle || "Hero Title";

    document.getElementById("about").textContent =
        website.aboutUs || "About Us";

    document.getElementById("cta").textContent =
        website.cta || "Get Started";
});