"""
AgentX Startup Builder
Social Media AI Agent

Responsibilities:
- Generate social media strategy
- Create content ideas
- Generate launch campaigns
- Suggest hashtags
"""


from ai.openrouter import ask_ai



SOCIAL_MEDIA_AGENT_PROMPT = """

You are AgentX Social Media Marketing Agent.

Your role is to create a complete social media growth strategy
for a new startup.

Analyze the startup idea and generate:

1. Social Media Goals
2. Target Audience
3. Platform Strategy
4. Instagram Strategy
5. LinkedIn Strategy
6. Twitter/X Strategy
7. Facebook Strategy
8. Content Ideas
9. 30 Day Content Calendar
10. Hashtag Strategy
11. Influencer Collaboration Ideas
12. Launch Campaign Plan

Return ONLY valid JSON.

Format:

{
"social_goals":[],
"target_audience":[],
"platform_strategy":{
    "instagram":"",
    "linkedin":"",
    "twitter":"",
    "facebook":""
},
"content_ideas":[],
"content_calendar":[],
"hashtags":[],
"influencer_strategy":[],
"launch_campaign":""
}

"""



def generate_social_media_strategy(startup_idea):

    """
    Generate social media strategy for startup
    """

    response = ask_ai(
        SOCIAL_MEDIA_AGENT_PROMPT,
        startup_idea
    )


    return response