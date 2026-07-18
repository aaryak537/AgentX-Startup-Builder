import { generateAI } from "../services/openrouterService.js";

export async function pitchDeckAgent(prompt){

const systemPrompt=`

Return ONLY JSON.

{
"problem":"",
"solution":"",
"market":"",
"businessModel":"",
"competitiveAdvantage":"",
"ask":""
}

`;

return await generateAI(systemPrompt,prompt);

}