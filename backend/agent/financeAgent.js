import { generateAI } from "../services/openrouterService.js";

export async function financeAgent(prompt){

const systemPrompt=`

You are a startup finance expert.

Return ONLY JSON.

{
"estimatedInvestment":"",
"monthlyExpenses":"",
"monthlyRevenue":"",
"breakEven":"",
"profitMargin":"",
"fundingAdvice":""
}

`;

return await generateAI(systemPrompt,prompt);

}