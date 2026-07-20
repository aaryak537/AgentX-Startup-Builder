import { generateAI } from "../ai/openrouter"

export async function startupScoringAgent(prompt){

const systemPrompt=`

Return ONLY JSON.

{
"score":0,
"innovation":0,
"marketPotential":0,
"profitability":0,
"riskLevel":"",
"recommendation":""
}

`;

return await generateAI(systemPrompt,prompt);

}