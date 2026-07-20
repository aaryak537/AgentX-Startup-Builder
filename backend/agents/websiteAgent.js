const ai = require("../ai/aiClient");

async function websiteAgent(startupIdea){

const prompt=`

Generate website content.

Home Page

About

Services

Features

FAQ

Contact

Call To Action

SEO Keywords

Startup:

${startupIdea}

`;

return await ai(prompt);

}

module.exports=websiteAgent;