document.addEventListener("DOMContentLoaded", () => {
    /*=========================================
        NAVBAR SCROLL EFFECT
    =========================================*/
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            navbar.style.background = "rgba(7,11,20,.92)";
            navbar.style.backdropFilter = "blur(25px)";
            navbar.style.boxShadow = "0 12px 30px rgba(0,0,0,.35)";
        } else {
            navbar.style.background = "rgba(7,11,20,.72)";
            navbar.style.boxShadow = "none";
        }
    });
    /*=========================================
        SMOOTH SCROLL
    =========================================*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e){
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if(target){
                target.scrollIntoView({
                    behavior:"smooth"
                });
            }
        });
    });
    /*=========================================
        ACTIVE NAV LINK
    =========================================*/
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar ul li a");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if(window.scrollY >= top){
                current = section.getAttribute("class");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href").replace("#","");
            if(href === current){
                link.classList.add("active");
            }
        });
    });
    /*=========================================
        HERO TYPING ANIMATION
    =========================================*/
    const input = document.querySelector(".prompt-box input");
    const prompts = [
        "I want to start a bakery.",
        "Launch an AI Healthcare Startup.",
        "Create a FineTech company.",
        "Build an EV charging network.",
        "Start an Organic Food Brand.",
        "Create a Travel Planning AI."
    ];
const generateBtn = document.getElementById("generateBtn");

if(generateBtn){

generateBtn.addEventListener("click",()=>{

const idea=document.getElementById("ideaInput").value;

localStorage.setItem("startupIdea",idea);

window.location.href="loading.html";

});

}
const startBtn=document.getElementById("startBuildingBtn");

if(startBtn){

startBtn.onclick=()=>{

window.location.href="dashboard.html";

}

}
    let promptIndex = 0;
    let charIndex = 0;
    let deleting = false;
    function typePrompt(){
        if(!input) return;
        let currentPrompt = prompts[promptIndex];
        if(!deleting){
            input.placeholder =
                currentPrompt.substring(0,charIndex);
            charIndex++;
            if(charIndex > currentPrompt.length){
                deleting = true;
                setTimeout(typePrompt,1500);
                return;
            }
        }else{
            input.placeholder =
                currentPrompt.substring(0,charIndex);
            charIndex--;
            if(charIndex < 0){
                deleting = false;
                promptIndex++;
                if(promptIndex >= prompts.length){
                    promptIndex = 0;
                }
            }
        }
        setTimeout(typePrompt,deleting ? 40 : 75);
    }
    typePrompt();
    /*=========================================
        AI WORKFLOW ANIMATION
    =========================================*/
    const agents = document.querySelectorAll(".agent");
    let currentAgent = 0;
    setInterval(() => {
        agents.forEach(agent => {
            agent.classList.remove("working");
            agent.classList.add("waiting");
        });
        agents[currentAgent].classList.remove("waiting");
        agents[currentAgent].classList.add("working");
        currentAgent++;
        if(currentAgent >= agents.length){
            currentAgent = 0;
        }
    },1800);
    /*=========================================
        SCROLL REVEAL
    =========================================*/
    const reveals = document.querySelectorAll(
        ".feature-card,.testimonial,.faq-item,.workflow-card"
    );
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0px)";
            }
        });
    },{
        threshold:.15
    });
    reveals.forEach(item => {
        item.style.opacity="0";
        item.style.transform="translateY(40px)";
        item.style.transition=".8s";
        observer.observe(item);
    });
});
/*=========================================
    MAGNETIC BUTTONS
=========================================*/
const buttons = document.querySelectorAll(
".btn-primary,.btn-outline,.btn-secondary"
);
buttons.forEach(button=>{
    button.addEventListener("mousemove",(e)=>{
        const rect = button.getBoundingClientRect();
        const x =
        e.clientX - rect.left - rect.width/2;
        const y =
        e.clientY - rect.top - rect.height/2;
        button.style.transform =
        `translate(${x*.18}px,${y*.18}px)`;
    });
    button.addEventListener("mouseleave",()=>{
        button.style.transform="translate(0,0)";
    });
});
/*=========================================
    FEATURE CARD LIGHT EFFECT
=========================================*/
const cards = document.querySelectorAll(
".feature-card"
);
cards.forEach(card=>{
    card.addEventListener("mousemove",(e)=>{
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background =
        `radial-gradient(circle at ${x}px ${y}px,
        rgba(79,140,255,.18),
        rgba(255,255,255,.05) 60%)`;
    });
    card.addEventListener("mouseleave",()=>{
        card.style.background =
        "rgba(255,255,255,.05)";
    });
});
/*=========================================
    PROMPT BUTTON EFFECT
=========================================*/
const promptButton =
document.querySelector(".prompt-box button");
const workflow =
document.querySelectorAll(".agent");
if(promptButton){
promptButton.addEventListener("click",()=>{
    workflow.forEach((agent,index)=>{
        setTimeout(()=>{
            workflow.forEach(a=>{
                a.classList.remove("working");
                a.classList.remove("done");
                a.classList.add("waiting");
            });
            agent.classList.remove("waiting");
            agent.classList.add("working");
        },index*600);
    });
    setTimeout(()=>{
        workflow.forEach((agent,index)=>{
            setTimeout(()=>{
                agent.classList.remove("working");
                agent.classList.add("done");
            },index*350);
        });
    },workflow.length*650);
});
}