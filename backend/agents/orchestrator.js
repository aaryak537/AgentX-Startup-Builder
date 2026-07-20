const brandingAgent = require("./brandingAgent");
const financeAgent = require("./financeAgent");
const businessPlanAgent = require("./businessPlanAgent");
const websiteAgent = require("./websiteAgent");
const socialMediaAgent = require("./socialMediaAgent");
const competitorAgent = require("./competitorAgent");
const pitchDeckAgent = require("./pitchDeckAgent");
const swotAgent = require("./swotAgent");
const roadmapAgent = require("./roadmapAgent");
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

        runAgent("Business Plan Agent", businessPlanAgent, startupIdea),

        runAgent("Website Agent", websiteAgent, startupIdea),

        runAgent("Social Media Agent", socialMediaAgent, startupIdea),

        runAgent("Competitor Agent", competitorAgent, startupIdea),

        runAgent("Pitch Deck Agent", pitchDeckAgent, startupIdea),

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

module.exports = orchestrator;