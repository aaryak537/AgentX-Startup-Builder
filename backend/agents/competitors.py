from ai.openrouter import ask_ai


def competitor_agent(startup_idea):

    system_prompt = """

You are AgentX Competitor Analysis Agent.

Your role is to analyze competitors for a startup idea.

Analyze:
1. Direct competitors
2. Indirect competitors
3. Competitor strengths
4. Competitor weaknesses
5. Pricing strategy
6. Market positioning
7. Differentiation opportunities
8. Competitive advantage

Return ONLY valid JSON format.

Structure:

{
    "competitors": [
        {
            "name": "",
            "description": "",
            "strengths": [],
            "weaknesses": [],
            "pricing": ""
        }
    ],

    "market_positioning": "",

    "differentiation_strategy": [],

    "competitive_advantage": [],

    "recommendations": []
}

"""


    user_prompt = f"""

Analyze competitors for this startup idea:

{startup_idea}

Provide detailed competitive intelligence.

"""


    response = ask_ai(
        system_prompt,
        user_prompt
    )


    return response