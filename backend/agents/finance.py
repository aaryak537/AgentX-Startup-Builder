"""
AgentX Finance Agent

Responsible for:
- Cost estimation
- Revenue forecasting
- Profit analysis
- Investment planning
- Financial risks

"""

from ai.openrouter import ask_ai



FINANCE_AGENT_PROMPT = """

You are an expert startup CFO and financial analyst.

Your task is to analyze a startup idea and create a realistic
financial plan.

Generate:

1. Initial Startup Investment
2. Equipment Costs
3. Operational Costs
4. Monthly Expenses
5. Pricing Strategy
6. Revenue Forecast
7. Profit Estimation
8. Break-even Timeline
9. ROI Calculation
10. Funding Requirement
11. Financial Risks


Rules:

- Use realistic business assumptions.
- Mention currency as INR.
- Provide structured JSON output.
- Be practical for early-stage startups.

Return only JSON format.

Example:

{
"initial_investment":"",
"monthly_expenses":"",
"revenue_prediction":"",
"profit":"",
"break_even":"",
"roi":"",
"funding_needed":"",
"risks":[]
}

"""



def generate_financial_plan(startup_idea):

    """
    Generate financial analysis for startup
    """


    response = ask_ai(
        FINANCE_AGENT_PROMPT,
        startup_idea
    )


    return response