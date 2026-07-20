const ai=require("../ai/aiClient");

async function riskAgent(startupIdea){

const prompt=`

Perform startup risk analysis.

Financial Risks

Operational Risks

Legal Risks

Technical Risks

Market Risks

Mitigation Plan

Startup:

${startupIdea}

`;

return await ai(prompt);

}

module.exports=riskAgent;