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
 * Executes an agent safely without crashing the workflow.
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
        console.error(`❌ ${name} failed:`, error.message);

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

    const startTime = Date.now();

    // ===============================
    // Agent Registry
    // ===============================

    const agents = [
        { name: "Branding Agent", handler: brandingAgent },
        { name: "Finance Agent", handler: financeAgent },
        { name: "Business Plan Agent", handler: businessAgent },
        { name: "Website Agent", handler: websiteAgent },
        { name: "Social Media Agent", handler: socialAgent },
        { name: "Competitor Agent", handler: competitorAgent },
        { name: "Pitch Deck Agent", handler: pitchAgent },
        { name: "SWOT Agent", handler: swotAgent },
        { name: "Roadmap Agent", handler: roadmapAgent },
        { name: "Launch Agent", handler: launchAgent },
        { name: "Legal Agent", handler: legalAgent },
        { name: "Risk Agent", handler: riskAgent }
    ];

    // ===============================
    // Execute All Agents in Parallel
    // ===============================
agents.forEach(agent => {
    console.log(agent.name, typeof agent.handler);
});
    const results = await Promise.all(
        agents.map(agent =>
            runAgent(
                agent.name,
                agent.handler,
                startupIdea
            )
        )
    );

    // ===============================
    // Convert Array -> Object
    // ===============================

    const output = {};

    results.forEach(result => {

        let key = result.agent
            .replace(/\s+/g, "")
            .replace("Agent", "");

        key = key.charAt(0).toLowerCase() + key.slice(1);

        output[key] = result;
    });

    const executionTime = Date.now() - startTime;

    console.log("=====================================");
    console.log("✅ All agents completed");
    console.log(`⚡ Execution Time: ${executionTime} ms`);
    console.log("=====================================");

    return {
        success: true,
        startupIdea,
        generatedAt: new Date().toISOString(),
        executionTime,
        totalAgents: agents.length,
        successfulAgents: results.filter(r => r.success).length,
        failedAgents: results.filter(r => !r.success).length,
        results: output
    };
}

module.exports = {
    generateStartup: orchestrator
};