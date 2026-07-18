import { marketAgent } from "../agents/marketAgent.js";
import { brandingAgent } from "../agents/brandingAgent.js";
import { financeAgent } from "../agents/financeAgent.js";
import { businessPlanAgent } from "../agents/businessAgent.js";
import { marketingAgent } from "../agents/marketingAgent.js";
import { socialMediaAgent } from "../agents/socialAgent.js";
import { websiteAgent } from "../agents/websiteAgent.js";
import { pitchDeckAgent } from "../agents/pitchAgent.js";
import { startupScoringAgent } from "../agents/StartupAgent.js";

export async function startupOrchestrator(prompt){

const [
market,
branding,
finance,
business,
marketing,
social,
website,
pitch,
score

] = await Promise.all([

marketAgent(prompt),
brandingAgent(prompt),
financeAgent(prompt),
businessPlanAgent(prompt),
marketingAgent(prompt),
socialMediaAgent(prompt),
websiteAgent(prompt),
pitchDeckAgent(prompt),
startupScoringAgent(prompt)

]);

return{

market:JSON.parse(market),
branding:JSON.parse(branding),
finance:JSON.parse(finance),
business:JSON.parse(business),
marketing:JSON.parse(marketing),
social:JSON.parse(social),
website:JSON.parse(website),
pitch:JSON.parse(pitch),
score:JSON.parse(score)

};

}