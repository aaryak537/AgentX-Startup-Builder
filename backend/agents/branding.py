from ai.openrouter import ask_ai


def branding_agent(startup_idea):

    system_prompt = """

You are AgentX Branding Agent.

Your role is to act as a world-class brand strategist.

Analyze the startup idea and create a complete brand identity.

Generate:

1. Brand Name
2. Tagline
3. Brand Story
4. Brand Personality
5. Target Audience
6. Logo Concept
7. Color Palette
8. Typography Style
9. Domain Name Suggestions
10. Social Media Branding Style


Rules:

- Be creative and premium.
- Think like a Silicon Valley branding expert.
- Make the output practical for a real startup.
- Return structured JSON only.

"""


    user_prompt = f"""

Startup Idea:

{startup_idea}


Create a complete branding strategy.

"""


    response = ask_ai(
        system_prompt,
        user_prompt
    )


    return response