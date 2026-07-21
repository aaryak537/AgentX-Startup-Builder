const ai = require("../ai/aiClient");


async function startupChatbot(message, startupContext, language){

const prompt = `

You are AgentX Startup Assistant.

RULES:

1. Answer ONLY questions related to the user's startup.
2. Use the provided startup information.
3. If the question is unrelated say:
"I can only help with your startup."

4. Reply in ${language}

Startup Context:

${JSON.stringify(startupContext,null,2)}


User Question:

${message}


Generate helpful startup advice.

`;


return await ai(prompt);


}


module.exports=startupChatbot;