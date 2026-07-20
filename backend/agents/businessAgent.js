const ai = require("../ai/aiClient");

async function businessAgent(startupIdea) {

    const prompt = `
Create a professional startup business plan.

Include:

Executive Summary

Problem

Solution

Business Model

Target Audience

Revenue

Marketing

Growth Strategy

Startup:
${startupIdea}
`;

    return await ai(prompt);
}

module.exports = businessAgent;