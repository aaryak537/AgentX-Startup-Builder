const ai =
require("../ai/aiClient");


async function codeFixer(
code,
analysis,
language
){


const prompt = `

You are an expert software engineer.


Fix this ${language} code.


CURRENT CODE:

${code}



DEBUG ANALYSIS:

${analysis}



Rules:

- Return ONLY corrected code
- No explanation
- Preserve functionality
- Improve reliability


`;


return await ai(prompt);

}


module.exports = codeFixer;