const ai=require("../ai/aiClient");

async function legalAgent(startupIdea){

const prompt=`

Generate legal checklist.

Business Registration

Licenses

GST

Trademark

Privacy Policy

Terms

Compliance

Startup:

${startupIdea}

`;

return await ai(prompt);

}

module.exports=legalAgent;