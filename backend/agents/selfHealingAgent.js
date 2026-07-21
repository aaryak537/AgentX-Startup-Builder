const ai = require("../ai/aiClient");

/**
 * Self-Healing Agent
 *
 * Responsibilities:
 * 1. Analyze runtime logs
 * 2. Fix syntax errors
 * 3. Fix runtime errors
 * 4. Preserve working code
 * 5. Retry-friendly output
 */

async function selfHealingAgent({
    task,
    language = "javascript",
    code,
    logs,
    attempt = 1
}) {

    const prompt = `
You are an elite senior software engineer.

You are part of AgentX Startup Builder's autonomous
self-correcting coding system.

======================================================
ORIGINAL TASK
======================================================

${task}

======================================================
PROGRAMMING LANGUAGE
======================================================

${language}

======================================================
CURRENT ATTEMPT
======================================================

${attempt}

======================================================
GENERATED CODE
======================================================

${code}

======================================================
RUNTIME LOGS
======================================================

${logs}

======================================================
YOUR JOB
======================================================

Carefully inspect the runtime logs.

Identify:

• Syntax Errors
• Runtime Errors
• Logic Errors
• Undefined Variables
• Import Problems
• Type Errors
• Async Mistakes
• API Mistakes

Fix ONLY what is necessary.

Do NOT rewrite the entire program unless required.

Preserve:

• Function names
• Variable names
• Comments
• Formatting whenever possible

Never introduce new bugs.

======================================================
IMPORTANT
======================================================

Return ONLY executable code.

Do NOT explain.

Do NOT use markdown.

Do NOT wrap inside triple backticks.

Return plain code only.
`;

    try {

        let fixedCode = await ai(prompt);

        if (!fixedCode)
            throw new Error("AI returned empty response.");

        // Remove accidental markdown

        fixedCode = fixedCode
            .replace(/```javascript/g, "")
            .replace(/```js/g, "")
            .replace(/```/g, "")
            .trim();

        return {
            success: true,
            fixedCode
        };

    } catch (err) {

        return {
            success: false,
            error: err.message,
            fixedCode: code
        };

    }

}

module.exports = selfHealingAgent;