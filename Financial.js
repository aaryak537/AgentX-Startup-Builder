const finance=startup.finance;

document.getElementById("investment").innerText=
finance.estimatedInvestment;

document.getElementById("expenses").innerText=
finance.monthlyExpenses;

document.getElementById("revenue").innerText=
finance.monthlyRevenue;

document.getElementById("breakEven").innerText=
finance.breakEven;