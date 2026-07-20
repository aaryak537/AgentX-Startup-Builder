const ai=require("../ai/aiClient");

async function socialMediaAgent(startupIdea){

const prompt=`

Generate:

Instagram Posts

LinkedIn Posts

Twitter Posts

Launch Campaign

30 Day Content Calendar

Hashtags

Startup:

${startupIdea}

`;

return await ai(prompt);

}

module.exports=socialAgent;