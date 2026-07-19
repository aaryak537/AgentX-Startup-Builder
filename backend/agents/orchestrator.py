from agents.market import market_research_agent
from agents.branding import branding_agent
from agents.finance import finance_agent
from agents.legalAgent import legal_agent
from agents.business import business_plan_agent
from agents.website import website_agent
from agents.socialMedia import social_media_agent
from agents.competitors import competitor_agent
from agents.pitch import pitchdeck_agent



def run_orchestrator(startup_idea):

    """
    Main AgentX AI Coordinator

    Input:
        startup_idea -> User startup prompt

    Output:
        Complete startup blueprint
    """


    result = {}


    # 1. Market Research Agent

    result["market_research"] = market_research_agent(
        startup_idea
    )



    # 2. Competitor Analysis Agent

    result["competitors"] = competitor_agent(
        startup_idea
    )



    # 3. Branding Agent

    result["branding"] = branding_agent(
        startup_idea
    )



    # 4. Business Plan Agent

    result["business_plan"] = business_plan_agent(
        startup_idea
    )



    # 5. Finance Agent

    result["financial_plan"] = finance_agent(
        startup_idea
    )



    # 6. Legal Agent

    result["legal"] = legal_agent(
        startup_idea
    )



    # 7. Website Builder Agent

    result["website"] = website_agent(
        startup_idea
    )



    # 8. Social Media Agent

    result["marketing"] = social_media_agent(
        startup_idea
    )



    # 9. Pitch Deck Agent

    result["pitchdeck"] = pitchdeck_agent(
        startup_idea
    )



    # Final Response

    final_output = {

        "startup_idea": startup_idea,


        "agents_completed": [

            "Market Research",
            "Competitor Analysis",
            "Branding",
            "Business Plan",
            "Finance",
            "Legal",
            "Website Builder",
            "Social Media",
            "Pitch Deck"

        ],


        "startup_blueprint": result

    }



    return final_output