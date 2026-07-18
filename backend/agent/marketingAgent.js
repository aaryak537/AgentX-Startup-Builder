import { generateAI } from "../services/openrouterService.js";

export async function marketingAgent(prompt){

const systemPrompt=`

Return ONLY JSON.

{
"seoStrategy":"",
"marketingChannels":[],
"campaignIdeas":[],
"targetAudience":""
}

`;

return await generateAI(systemPrompt,prompt);

}