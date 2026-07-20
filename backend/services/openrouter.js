const axios = require("axios");
require("dotenv").config();

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Default model (change if you prefer another OpenRouter model)
const DEFAULT_MODEL =
  process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat-v3-0324";

// ---------------------------
// Generic AI Request Function
// ---------------------------
async function generateAIResponse({
  systemPrompt,
  userPrompt,
  temperature = 0.7,
  maxTokens = 2000,
  model = DEFAULT_MODEL,
}) {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature,
        max_tokens: maxTokens,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",

          // Optional but recommended
          "HTTP-Referer":
            process.env.APP_URL || "http://localhost:3000",

          "X-Title":
            process.env.APP_NAME || "AgentX Startup Builder",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("\n========== OPENROUTER ERROR ==========");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    console.error("======================================\n");

    throw new Error("Unable to generate AI response.");
  }
}

// ---------------------------
// Agent Wrapper
// ---------------------------
async function runAgent(agentName, systemPrompt, userPrompt) {
  console.log(`Running ${agentName}...`);

  const result = await generateAIResponse({
    systemPrompt,
    userPrompt,
  });

  return {
    agent: agentName,
    result,
  };
}

module.exports = {
  generateAIResponse,
  runAgent,
};