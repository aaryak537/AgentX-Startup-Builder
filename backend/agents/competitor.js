const ai=require("../ai/aiClient");

async function competitorAgent(startupIdea){

const prompt=`

Analyze competitors.

Generate

Top Competitors

Strengths

Weaknesses

Market Gap

Opportunity

USP

Startup:

${startupIdea}

`;

return await ai(prompt);

}

module.exports=competitorAgent;