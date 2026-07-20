const STORAGE_KEY = "agentx_startup_data";

/**
 * Save startup data
 */
function saveStartup(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log("✅ Startup data saved.");
    } catch (error) {
        console.error("Error saving startup:", error);
    }
}

/**
 * Load startup data
 */
function loadStartup() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Error loading startup:", error);
        return {};
    }
}

/**
 * Update a single field
 */
function updateStartup(key, value) {
    const startup = loadStartup();
    startup[key] = value;
    saveStartup(startup);
}

/**
 * Clear all startup data
 */
function clearStartup() {
    localStorage.removeItem(STORAGE_KEY);
    console.log("🗑 Startup data cleared.");
}