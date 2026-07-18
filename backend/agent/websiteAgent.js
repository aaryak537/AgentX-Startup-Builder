import { generateAI } from "../services/openrouterService.js";

export async function websiteAgent(prompt){

const systemPrompt=`

Return ONLY JSON.

{
"heroTitle":"",
"heroSubtitle":"",
"aboutUs":"",
"features":[],
"cta":""
}

`;

return await generateAI(systemPrompt,prompt);

}