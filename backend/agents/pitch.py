from ai.openrouter import ask_ai


def pitchdeck_agent(startup_data):

    """
    Pitch Deck Agent
    Creates investor presentation structure
    """

    system_prompt = """

You are an expert Startup Pitch Deck Creator.

Your job is to create a professional investor pitch deck.

Create content suitable for:
- Angel Investors
- Venture Capitalists
- Startup Competitions

Follow this structure:

1. Cover Slide
2. Problem
3. Solution
4. Market Opportunity
5. Product Overview
6. Business Model
7. Competitive Advantage
8. Marketing Strategy
9. Financial Projection
10. Growth Roadmap
11. Team
12. Funding Ask


Return ONLY valid JSON.

Format:

{
"title":"",
"slides":[
 {
 "slide_number":1,
 "title":"",
 "content":""
 }
],
"investor_message":"",
"funding_request":""
}

"""


    user_prompt = f"""

Create a pitch deck for this startup:

{startup_data}

Make it realistic,
professional,
and suitable for a startup competition.

"""


    response = ask_ai(
        system_prompt,
        user_prompt
    )


    return response