import { generateAI } from "../services/openrouterService.js";

export async function brandingAgent(prompt) {

    const systemPrompt = `
You are a professional branding expert.

Return ONLY valid JSON.

{
  "startupName":"",
  "tagline":"",
  "mission":"",
  "vision":"",
  "logoPrompt":"",
  "brandColors":["","",""],
  "fontSuggestion":"",
  "brandPersonality":""
}
`;

    return await generateAI(systemPrompt, prompt);

}