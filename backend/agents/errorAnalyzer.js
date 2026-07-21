const ai = require("../ai/aiClient");


async function errorAnalyzer(
    logs,
    code,
    language
){


const prompt = `

You are a debugging AI.

Analyze this runtime error.

Language:
${language}


CODE:

${code}



ERROR LOGS:

${logs}



Return:

1. Error cause
2. Exact issue
3. Required fix
4. Improved solution

`;


return await ai(prompt);


}


module.exports = errorAnalyzer;