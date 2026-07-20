const axios = require("axios");
const MODELS = require("./models");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Generate AI response
 * @param {string} prompt
 * @param {string} model
 * @returns {Promise<string>}
 */
async function askAI(prompt, model = MODELS.DEFAULT_MODEL) {
    try {

        const response = await axios.post(
            BASE_URL,
            {
                model,

                messages: [
                    {
                        role: "system",
                        content:
                            "You are AgentX AI, an expert startup consultant."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.7,

                max_tokens: 3000
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {

        console.error("OpenRouter Error:");

        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }

        return "Unable to generate AI response.";
    }
}

module.exports = {
    askAI
};