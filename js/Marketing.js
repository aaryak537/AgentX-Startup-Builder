const marketResearch = startup.marketResearch;

document.getElementById("industry").innerText =
    marketResearch.industry;

document.getElementById("targetAudience").innerText =
    marketResearch.targetAudience;

document.getElementById("marketSize").innerText =
    marketResearch.marketSize;

document.getElementById("opportunities").innerText =
    marketResearch.opportunities;

document.getElementById("risks").innerText =
    marketResearch.risks;

document.getElementById("competitors").innerHTML =
    marketResearch.competitors
        .map(item => `<li>${item}</li>`)
        .join("");