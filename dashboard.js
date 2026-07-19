const startup = JSON.parse(
    sessionStorage.getItem("startup")
);

if(!startup){

location.href="landingPage.html";

}

document.getElementById("startupName").innerText =
startup.branding.startupName;

document.getElementById("tagline").innerText =
startup.branding.tagline;

document.getElementById("score").innerText =
startup.score.score;