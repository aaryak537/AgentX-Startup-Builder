const API_BASE = "http://localhost:5000/api";

export async function generateStartup(prompt) {

    const response = await fetch(`${API_BASE}/startup/generate`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            prompt
        })

    });

    if (!response.ok)
        throw new Error("Backend Error");

    return await response.json();

}