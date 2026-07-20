const ai=require("../ai/aiClient");

async function pitchDeckAgent(startupIdea){

const prompt=`

Create an investor pitch deck.

Slides

Problem

Solution

Market

Product

Revenue

Competition

Financials

Investment Ask

Startup:

${startupIdea}

`;

return await ai(prompt);

}

module.exports=pitchAgent;