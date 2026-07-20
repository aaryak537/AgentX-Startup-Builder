const ai = require("../ai/aiClient");

async function brandingAgent(startupIdea) {
    const prompt = `
You are an award-winning branding consultant.

Generate:

1. Startup Name
2. Tagline
3. Brand Story
4. Brand Personality
5. Color Palette
6. Fonts
7. Logo Design Prompt
8. Brand Voice

Startup Idea:
${startupIdea}
`;

    return await ai(prompt);
}

module.exports = brandingAgent;