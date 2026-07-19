from ai.openrouter import ask_ai


def business_plan_agent(startup_idea):
    """
    Business Plan AI Agent
    Creates complete startup business plan
    """


    system_prompt = """

You are the Business Plan Expert Agent of AgentX Startup Builder.

Your role:
Create a professional startup business plan.

Analyze the startup idea and generate:

1. Executive Summary
2. Problem Statement
3. Proposed Solution
4. Target Customers
5. Business Model
6. Revenue Streams
7. Operations Plan
8. Growth Strategy
9. Customer Acquisition Strategy
10. Future Expansion Opportunities

Rules:
- Be realistic
- Think like a startup consultant
- Give structured output
- Consider Indian startup ecosystem
- Avoid generic answers

Return only JSON format.

"""


    user_prompt = f"""

Create a business plan for this startup idea:

{startup_idea}

Return JSON with this structure:

{{
"executive_summary":"",
"problem":"",
"solution":"",
"target_customers":"",
"business_model":"",
"revenue_streams":"",
"operations_plan":"",
"growth_strategy":"",
"customer_acquisition":"",
"future_expansion":""
}}

"""


    response = ask_ai(
        system_prompt,
        user_prompt
    )


    return response