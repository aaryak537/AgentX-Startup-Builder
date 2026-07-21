const ai = require("../ai/aiClient");

/**
 * Code Generation Agent
 *
 * Generates production-ready code based on the user's request.
 * Returns ONLY executable code.
 */

async function codeGenerationAgent({
    task,
    language = "javascript",
    framework = "",
    existingCode = "",
    context = ""
}) {

    const prompt = `
You are an expert ${language} software engineer.

Your job is to generate HIGH QUALITY production-ready code.

========================
TASK
========================
${task}

========================
LANGUAGE
========================
${language}

========================
FRAMEWORK
========================
${framework || "None"}

========================
PROJECT CONTEXT
========================
${context || "No additional context."}

========================
EXISTING CODE
========================
${existingCode || "None"}

========================
RULES
========================

1. Output ONLY executable code.
2. No markdown.
3. No explanation.
4. No comments unless necessary.
5. Keep existing functionality.
6. Fix obvious mistakes.
7. Follow best practices.
8. Use modern syntax.
9. Make code modular.
10. Do NOT wrap inside \`\`\`.

Return ONLY code.
`;

    try {

        const response = await ai(prompt);

        if (!response)
            throw new Error("AI returned empty response.");

        return {
            success: true,
            language,
            code: response.trim()
        };

    } catch (err) {

        return {
            success: false,
            error: err.message
        };

    }

}

module.exports = codeGenerationAgent;