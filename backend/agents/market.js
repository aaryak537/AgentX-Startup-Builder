const { askAI } = require("../ai/openrouter");

async function marketAgent(startupIdea) {

    const prompt = `
You are a world-class Market Research Consultant.

Analyze the following startup idea.

Startup:
"${startupIdea}"

Generate a JSON object with these sections.

{
  "industry":"",
  "industryOverview":"",
  "marketSize":{
      "tam":"",
      "sam":"",
      "som":""
  },
  "targetAudience":[
      {
        "name":"",
        "age":"",
        "occupation":"",
        "income":"",
        "painPoints":[]
      }
  ],
  "competitors":[
      {
        "name":"",
        "strength":"",
        "weakness":""
      }
  ],
  "marketTrends":[
      ""
  ],
  "opportunities":[
      ""
  ],
  "risks":[
      ""
  ],
  "entryStrategy":[
      ""
  ],
  "swot":{
      "strengths":[],
      "weaknesses":[],
      "opportunities":[],
      "threats":[]
  }
}

Return ONLY valid JSON.
`;

    try {

        const response = await askAI(prompt);

        const data = JSON.parse(response);

        return {
            success: true,
            agent: "Market Research",
            data
        };

    } catch (error) {

        console.error("Market Agent Error:", error);

        return {

            success: false,

            agent: "Market Research",

            error: error.message

        };

    }

}

module.exports = market;