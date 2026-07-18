const startup=JSON.parse(
sessionStorage.getItem("startup")
);

document.getElementById("industry").innerText=
startup.market.industry;

document.getElementById("audience").innerText=
startup.market.targetAudience;

document.getElementById("mission").innerText=
startup.branding.mission;

document.getElementById("vision").innerText=
startup.branding.vision;