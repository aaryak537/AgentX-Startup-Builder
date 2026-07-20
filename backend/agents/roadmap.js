const ai=require("../ai/aiClient");

async function roadmapAgent(startupIdea){

const prompt=`

Generate roadmap.

Month 1

Month 2

Month 3

Month 6

Month 12

Milestones

Startup:

${startupIdea}

`;

return await ai(prompt);

}

module.exports=roadmap;