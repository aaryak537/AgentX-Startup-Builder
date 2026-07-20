const ai = require("../ai/aiClient");

async function financeAgent(startupIdea) {
    const prompt = `
You are a startup financial advisor.

Generate:

- Initial Investment
- Monthly Expenses
- Revenue Model
- Pricing
- Break-even Analysis
- 3 Year Financial Projection
- Profit Estimate

Startup:
${startupIdea}
`;

    return await ai(prompt);
}

module.exports = financeAgent;