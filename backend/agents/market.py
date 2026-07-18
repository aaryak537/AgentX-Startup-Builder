from services.openrouter import ask_ai


def market_research(startup_idea):
    system_prompt = """
You are a senior startup market analyst.

Return ONLY valid JSON.

Format:
{
    "industry":"",
    "target_audience":"",
    "competitors":[],
    "market_size":"",
    "opportunities":[]
}
"""

    return ask_ai(system_prompt, startup_idea)