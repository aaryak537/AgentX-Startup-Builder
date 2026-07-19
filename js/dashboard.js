// ==========================
// AgentX Startup Builder
// dashboard.js
// ==========================

// List of AI Agents
const agents = [
    "market",
    "branding",
    "business",
    "finance",
    "marketing",
    "social",
    "website",
    "competitor",
    "swot",
    "risk",
    "pricing",
    "roadmap",
    "legal",
    "pitch",
    "persona",
    "launch"
];

// Run one AI agent
async function runAgent(agent, prompt) {

    const status = document.getElementById(`${agent}-status`);
    const result = document.getElementById(`${agent}-result`);

    if (status) {
        status.innerHTML = "🟡 Thinking...";
        status.style.color = "#ffaa00";
    }

    if (result) {
        result.innerHTML = "";
    }

    try {

        const response = await fetch("/generate-agent", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                agent: agent,

                prompt: prompt

            })

        });

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const data = await response.json();

        if (status) {
            status.innerHTML = "✅ Completed";
            status.style.color = "#00ff88";
        }

        if (result) {
            result.innerHTML = data.result || "Completed";
        }

    }

    catch (error) {

        console.error(error);

        if (status) {
            status.innerHTML = "❌ Failed";
            status.style.color = "red";
        }

        if (result) {
            result.innerHTML = error.message;
        }

    }

}

// Generate Startup
async function generateAll() {

    const promptBox = document.getElementById("startupPrompt");
    const button = document.getElementById("generateBtn");
    const progress = document.getElementById("progressBar");

    if (!promptBox) {
        alert("Prompt textbox not found.");
        return;
    }

    const prompt = promptBox.value.trim();

    if (prompt === "") {
        alert("Please enter your startup idea.");
        return;
    }

    if (button) {
        button.disabled = true;
        button.innerHTML = "Generating...";
    }

    if (progress) {
        progress.max = agents.length;
        progress.value = 0;
    }

    for (let i = 0; i < agents.length; i++) {

        await runAgent(agents[i], prompt);

        if (progress) {
            progress.value = i + 1;
        }

    }

    if (button) {
        button.disabled = false;
        button.innerHTML = "Generate Startup";
    }

    alert("🎉 Startup Generated Successfully!");

}

// Auto-connect button
window.onload = () => {

    const btn = document.getElementById("generateBtn");

    if (btn) {
        btn.addEventListener("click", generateAll);
    }

};