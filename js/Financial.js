/* ==========================================================
   AgentX Financial Dashboard
   Loads Startup
   Generates Business Report
   Calculates Financial Projection
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof AgentX === "undefined") {
        console.error("AgentX engine not loaded.");
        return;
    }

    const startup = AgentX.loadStartup();

    if (!startup) {
        console.error("Startup not found.");
        return;
    }

    if (!startup.financial) {
        startup.financial = {};
    }

    if (!startup.businessPlan) {
        startup.businessPlan = generateBusinessPlan(startup);
    }

    AgentX.saveStartup(startup);

    AgentX.paintTopbarMeta(startup);

    initializeFinancial(startup);

    const saveBtn = document.getElementById("saveFinancial");

    if (saveBtn) {
        saveBtn.addEventListener("click", saveFinancialData);
    }

    ["investment", "monthlyRevenue", "monthlyExpense"].forEach(id => {

        const input = document.getElementById(id);

        if (input) {
            input.addEventListener("input", calculateFinancials);
        }

    });

});



/* ==========================================================
   Initialize
========================================================== */

function initializeFinancial(startup){

    const investment =
        startup.financial.investment || 500000;

    const revenue =
        startup.financial.monthlyRevenue || 100000;

    const expense =
        startup.financial.monthlyExpense || 60000;

    document.getElementById("startupName").textContent =
        startup.name;

    document.getElementById("investment").value =
        investment;

    document.getElementById("monthlyRevenue").value =
        revenue;

    document.getElementById("monthlyExpense").value =
        expense;

    setText("executiveSummary",
        startup.businessPlan.executiveSummary);

    setText("businessModel",
        startup.businessPlan.revenueModel);

    setText("targetAudience",
        startup.businessPlan.targetAudience);

    setText("vision",
        startup.businessPlan.vision);

    calculateFinancials();

}



/* ==========================================================
   Business Plan Generator
========================================================== */

function generateBusinessPlan(startup){

    return{

        executiveSummary:
        `${startup.name} is an AI-powered ${startup.category} startup focused on providing high-quality products and creating a scalable business model.`,

        vision:
        `Become a leading ${startup.category} company within five years.`,

        mission:
        `Deliver excellent customer experience through innovation and quality.`,

        revenueModel:
        "Direct Sales • Online Orders • Subscription • Partnerships",

        targetAudience:
        "Students, Families, Working Professionals, Online Customers"

    };

}



/* ==========================================================
   Financial Calculation
========================================================== */

function calculateFinancials(){

    const investment =
        Number(document.getElementById("investment").value) || 0;

    const revenue =
        Number(document.getElementById("monthlyRevenue").value) || 0;

    const expense =
        Number(document.getElementById("monthlyExpense").value) || 0;

    const profit =
        revenue-expense;

    const annualRevenue =
        revenue*12;

    const annualExpense =
        expense*12;

    const annualProfit =
        profit*12;

    const roi =
        investment>0
        ?((annualProfit/investment)*100).toFixed(1)
        :0;

    const margin =
        revenue>0
        ?((profit/revenue)*100).toFixed(1)
        :0;

    const breakEven =
        profit>0
        ?(investment/profit).toFixed(1)+" Months"
        :"Not Achievable";

    setMoney("profit",profit);
    setMoney("annualRevenue",annualRevenue);
    setMoney("annualExpense",annualExpense);
    setMoney("annualProfit",annualProfit);

    setText("roi",roi+"%");
    setText("profitMargin",margin+"%");
    setText("breakEven",breakEven);

}



/* ==========================================================
   Save
========================================================== */

function saveFinancialData(){

    const startup =
        AgentX.loadStartup();

    if(!startup.financial){
        startup.financial={};
    }

    startup.financial.investment =
        Number(document.getElementById("investment").value);

    startup.financial.monthlyRevenue =
        Number(document.getElementById("monthlyRevenue").value);

    startup.financial.monthlyExpense =
        Number(document.getElementById("monthlyExpense").value);

    startup.financial.annualRevenue =
        startup.financial.monthlyRevenue*12;

    startup.financial.annualExpense =
        startup.financial.monthlyExpense*12;

    startup.financial.annualProfit =
        startup.financial.annualRevenue-
        startup.financial.annualExpense;

    startup.financial.roi =
        startup.financial.investment>0
        ?(
            (startup.financial.annualProfit/
            startup.financial.investment)*100
        ).toFixed(1)
        :0;

    AgentX.saveStartup(startup);

    calculateFinancials();

    AgentX.toast(
        "Financial report saved successfully.",
        "success"
    );

}



/* ==========================================================
   Helpers
========================================================== */

function setText(id,value){

    const el=document.getElementById(id);

    if(el){
        el.textContent=value;
    }

}

function setMoney(id,value){

    const el=document.getElementById(id);

    if(el){
        el.textContent=
        "₹"+Number(value).toLocaleString("en-IN");
    }

}