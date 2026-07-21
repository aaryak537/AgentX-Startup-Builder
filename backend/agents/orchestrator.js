const brandingAgent = require("./brandingAgent");
const financeAgent = require("./financeAgent");
const businessAgent = require("./businessAgent");
const websiteAgent = require("./websiteAgent");
const socialAgent = require("./socialAgent");
const competitorAgent = require("./competitor");
const pitchAgent = require("./pitchAgent");
const swotAgent = require("./swotAgent");
const roadmapAgent = require("./roadmap");
const launchAgent = require("./launchAgent");
const legalAgent = require("./legalAgent");
const riskAgent = require("./riskAgent");
/**
 * Executes an agent safely without crashing the entire workflow.
 */
async function runAgent(name, agentFunction, startupIdea) {
    try {
        const result = await agentFunction(startupIdea);

        return {
            success: true,
            agent: name,
            data: result
        };

    } catch (error) {

        console.error(`${name} failed:`, error.message);

        return {
            success: false,
            agent: name,
            error: error.message
        };
    }
}

/**
 * Main Orchestrator
 */
async function orchestrator(startupIdea) {

    console.log("=====================================");
    console.log("🚀 Starting AgentX Startup Builder");
    console.log("Idea:", startupIdea);
    console.log("=====================================");

    const [
        branding,
        finance,
        businessPlan,
        website,
        socialMedia,
        competitor,
        pitchDeck,
        swot,
        roadmap,
        launch,
        legal,
        risk
    ] = await Promise.all([

        runAgent("Branding Agent", brandingAgent, startupIdea),

        runAgent("Finance Agent", financeAgent, startupIdea),

        runAgent("Business Plan Agent", businessAgent, startupIdea),

        runAgent("Website Agent", websiteAgent, startupIdea),

        runAgent("Social Media Agent", socialAgent, startupIdea),
runAgent("Competitor Agent", competitorAgent, startupIdea),

        runAgent("Pitch Deck Agent", pitchAgent, startupIdea),

        runAgent("SWOT Agent", swotAgent, startupIdea),
runAgent("Roadmap Agent", roadmapAgent, startupIdea),

        runAgent("Launch Agent", launchAgent, startupIdea),

        runAgent("Legal Agent", legalAgent, startupIdea),

        runAgent("Risk Agent", riskAgent, startupIdea)

    ]);

    console.log("✅ All agents completed.");

    return {

        startupIdea,

        generatedAt: new Date().toISOString(),

        success: true,

        results: {

            branding,

            finance,

            businessPlan,

            website,

            socialMedia,

            competitor,

            pitchDeck,

            swot,

            roadmap,

            launch,

            legal,

            risk

        }

    };

}

const startupResult = await orchestrator(prompt);