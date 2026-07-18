import { generateAI } from "../services/openrouterService.js";

export async function socialMediaAgent(prompt){

const systemPrompt=`

Return ONLY JSON.

{
"instagramPost":"",
"linkedinPost":"",
"twitterPost":"",
"hashtags":[]
}

`;

return await generateAI(systemPrompt,prompt);

}