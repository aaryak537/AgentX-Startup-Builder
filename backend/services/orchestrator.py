import json
from concurrent.futures import ThreadPoolExecutor

from agents.market_agent import market_research
from agents.branding_agent import generate_branding
from agents.finance_agent import generate_finance
from agents.business_agent import generate_business_plan
from agents.marketing_agent import generate_marketing
from agents.website_agent import generate_website
from agents.social_agent import generate_social_posts
from agents.pitch_agent import generate_pitch


def safe_json(text):
    """
    Convert AI output into JSON.
    Returns an error object if parsing fails.
    """
    try:
        return json.loads(text)
    except Exception:
        return {
            "success": False,
            "raw_response": text
        }


def run_agent(agent_function, startup_idea):
    return safe_json(agent_function(startup_idea))


def build_startup(startup_idea):
    """
    Main AgentX Orchestrator
    """

    with ThreadPoolExecutor(max_workers=8) as executor:

        market = executor.submit(run_agent, market_research, startup_idea)
        branding = executor.submit(run_agent, generate_branding, startup_idea)
        finance = executor.submit(run_agent, generate_finance, startup_idea)
        business = executor.submit(run_agent, generate_business_plan, startup_idea)
        marketing = executor.submit(run_agent, generate_marketing, startup_idea)
        website = executor.submit(run_agent, generate_website, startup_idea)
        social = executor.submit(run_agent, generate_social_posts, startup_idea)
        pitch = executor.submit(run_agent, generate_pitch, startup_idea)

    return {
        "startupIdea": startup_idea,
        "market": market.result(),
        "branding": branding.result(),
        "finance": finance.result(),
        "business": business.result(),
        "marketing": marketing.result(),
        "website": website.result(),
        "social": social.result(),
        "pitch": pitch.result()
    }