import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function generateAI(systemPrompt, userPrompt) {

    try {

        const response = await axios.post(
            API_URL,
            {
                model: "deepseek/deepseek-chat-v3-0324:free",

                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: userPrompt
                    }
                ],

                temperature: 0.7,
                max_tokens: 2000
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": process.env.SITE_URL,
                    "X-Title": process.env.SITE_NAME
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

        throw error;
    }

}