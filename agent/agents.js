import { generateAI } from "../services/openrouterService.js";

export async function marketAgent(startupIdea) {

    const systemPrompt = `
You are an expert startup market analyst.

Return ONLY valid JSON.

{
 "industry":"",
 "targetAudience":"",
 "competitors":[],
 "opportunities":[],
 "swot":{
   "strengths":[],
   "weaknesses":[],
   "opportunities":[],
   "threats":[]
 }
}
`;

    return await generateAI(systemPrompt, startupIdea);

}