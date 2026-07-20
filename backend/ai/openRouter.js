// openrouter.js

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

async function askAI(prompt) {
    try {
        const response = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.origin,
                "X-OpenRouter-Title": "AgentX Startup Builder"
            },
            body: JSON.stringify({
                model: "openrouter/auto",
                messages: [
                    {
                        role: "system",
                        content: "You are an AI Startup Builder. Generate professional startup plans, branding, market research, finance, marketing and business reports."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        return data.choices[0].message.content;

    } catch (error) {
        console.error("OpenRouter Error:", error);
        return "Error generating AI response.";
    }
}