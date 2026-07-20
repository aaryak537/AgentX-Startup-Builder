const ai=require("../ai/aiClient");

async function swotAgent(startupIdea){

const prompt=`

Generate SWOT Analysis.

Strengths

Weaknesses

Opportunities

Threats

Startup:

${startupIdea}

`;

return await ai(prompt);

}

module.exports=swotAgent;