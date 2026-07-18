const startup=JSON.parse(
sessionStorage.getItem("startup")
);

document.getElementById("startupName").innerText=
startup.branding.startupName;

document.getElementById("tagline").innerText=
startup.branding.tagline;

document.getElementById("logoPrompt").innerText=
startup.branding.logoPrompt;