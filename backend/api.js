const API_URL = "http://127.0.0.1:8000/api/startup";

async function generateStartup(prompt) {

    const response = await fetch(`${API_URL}/generate`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            idea: prompt
        })

    });

    const result = await response.json();

    sessionStorage.setItem(
        "agentxData",
        JSON.stringify(result.data)
    );

    return result.data;
}

function getStartupData() {

    return JSON.parse(
        sessionStorage.getItem("agentxData")
    );

}