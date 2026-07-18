from openai import OpenAI
import os

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def generate_startup_report(user_prompt):

    prompt = f"""

You are an expert startup consultant.

Generate a professional startup report.

User Idea:
{user_prompt}

Return ONLY valid JSON.

Structure:

{{
"title":"",
"tagline":"",
"executive_summary":"",
"market_analysis":"",
"competitors":[
{{"name":"","strength":"","weakness":""}}
],
"swot":{{
"strengths":[],
"weaknesses":[],
"opportunities":[],
"threats":[]
}},
"customer_persona":{{
"age":"",
"income":"",
"location":"",
"needs":""
}},
"branding":{{
"company_name":"",
"logo_description":"",
"colors":"",
"font":"",
"brand_voice":""
}},
"business_model":"",
"revenue_model":"",
"pricing_strategy":"",
"financial_projection":{{
"investment":"",
"monthly_cost":"",
"monthly_revenue":"",
"break_even":""
}},
"marketing_strategy":"",
"social_posts":[
"",
"",
""
],
"website_structure":[
"",
"",
"",
""
],
"roadmap":[
"",
"",
"",
""
],
"investor_pitch":"",
"startup_score":""
}}

"""

    response = client.chat.completions.create(
        model="openai/gpt-4.1-mini",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    )

    return response.choices[0].message.content