const ai=require("../ai/aiClient");

async function launchAgent(startupIdea){

const prompt=`

Generate product launch strategy.

Pre Launch

Launch Day

Post Launch

Marketing

PR

Growth Hacks

Startup:

${startupIdea}

`;

return await ai(prompt);

}

module.exports=launchAgent;