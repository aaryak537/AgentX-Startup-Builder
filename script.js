document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar = document.querySelector(".navbar");

    if (navbar) {
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
    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e){

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if(target){
                target.scrollIntoView({
                    behavior:"smooth"
                });
            }

        });

    });



    /* =========================================
       HERO TYPING ANIMATION
    ========================================= */

    const input = document.querySelector(".prompt-box input");

    const prompts = [
        "I want to start a bakery.",
        "Launch an AI Healthcare Startup.",
        "Create a FinTech company.",
        "Build an EV charging network.",
        "Start an Organic Food Brand.",
        "Create a Travel Planning AI."
    ];


    if(input){

        let promptIndex = 0;
        let charIndex = 0;
        let deleting = false;


        function typePrompt(){

            let text = prompts[promptIndex];


            if(!deleting){

                input.placeholder =
                text.substring(0,charIndex);

                charIndex++;


                if(charIndex > text.length){

                    deleting = true;

                    setTimeout(typePrompt,1500);
                    return;
                }


            }else{


                input.placeholder =
                text.substring(0,charIndex);


                charIndex--;


                if(charIndex < 0){

                    deleting = false;
                    promptIndex++;

                    if(promptIndex >= prompts.length){
                        promptIndex = 0;
                    }

                }

            }


            setTimeout(
                typePrompt,
                deleting ? 40 : 75
            );

        }


        typePrompt();

    }




    /* =========================================
       START BUILDING BUTTON
    ========================================= */

    const startBtn =
    document.getElementById("startBuildingBtn");


    if(startBtn){

        startBtn.onclick = () => {

            window.location.href =
            "dashboard.html";

        };

    }




    /* =========================================
       GENERATE BUTTON
    ========================================= */


    const generateBtn =
    document.getElementById("generateBtn");


    if(generateBtn){

        generateBtn.addEventListener(
            "click",
            ()=>{

                const idea =
                document.getElementById("ideaInput")?.value
                || "I want to start a bakery";


                localStorage.setItem(
                    "startupIdea",
                    idea
                );


                window.location.href =
                "loading.html";

            }
        );

    }





    /* =========================================
       AI AGENT WORKFLOW ANIMATION
    ========================================= */


    const agents =
    document.querySelectorAll(".agent");


    if(agents.length > 0){


        let currentAgent = 0;


        setInterval(()=>{


            agents.forEach(agent=>{

                agent.classList.remove(
                    "working"
                );

                agent.classList.add(
                    "waiting"
                );

            });



            agents[currentAgent]
            ?.classList.remove(
                "waiting"
            );


            agents[currentAgent]
            ?.classList.add(
                "working"
            );



            currentAgent++;


            if(currentAgent >= agents.length){

                currentAgent = 0;

            }



        },1800);


    }




    /* =========================================
       SCROLL REVEAL
    ========================================= */


    const reveals =
    document.querySelectorAll(
        ".feature-card,.testimonial,.faq-item,.workflow-card"
    );


    if(reveals.length > 0){


        const observer =
        new IntersectionObserver(entries=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){

                    entry.target.style.opacity="1";

                    entry.target.style.transform=
                    "translateY(0px)";

                }


            });


        },
        {
            threshold:.15
        });



        reveals.forEach(item=>{


            item.style.opacity="0";

            item.style.transform=
            "translateY(40px)";


            item.style.transition=".8s";


            observer.observe(item);


        });


    }


});





/* =========================================
   MAGNETIC BUTTON EFFECT
========================================= */


const buttons =
document.querySelectorAll(
".btn-primary,.btn-outline,.btn-secondary"
);


buttons.forEach(button=>{


    button.addEventListener(
        "mousemove",
        e=>{


            const rect =
            button.getBoundingClientRect();


            const x =
            e.clientX -
            rect.left -
            rect.width/2;


            const y =
            e.clientY -
            rect.top -
            rect.height/2;



            button.style.transform =
            `translate(${x*.18}px,${y*.18}px)`;


        }
    );



    button.addEventListener(
        "mouseleave",
        ()=>{

            button.style.transform =
            "translate(0,0)";

        }
    );


});





/* =========================================
   FEATURE CARD LIGHT EFFECT
========================================= */


document.querySelectorAll(
".feature-card"
)
.forEach(card=>{


    card.addEventListener(
        "mousemove",
        e=>{


            const rect =
            card.getBoundingClientRect();


            const x =
            e.clientX -
            rect.left;


            const y =
            e.clientY -
            rect.top;



            card.style.background =
            `radial-gradient(
                circle at ${x}px ${y}px,
                rgba(79,140,255,.18),
                rgba(255,255,255,.05) 60%
            )`;


        }
    );



    card.addEventListener(
        "mouseleave",
        ()=>{

            card.style.background =
            "rgba(255,255,255,.05)";

        }
    );


});
document.addEventListener("DOMContentLoaded", () => {

    function startGeneration() {

        const ideaInput = document.getElementById("ideaInput");

        const idea = ideaInput?.value.trim();

        if (!idea) {
            alert("Please enter your startup idea.");
            return;
        }

        const startup = {
            idea: idea,
            name: "",
            tagline: "",
            industry: "",
            createdAt: new Date().toISOString()
        };

        localStorage.setItem(
            "startupData",
            JSON.stringify(startup)
        );

        console.log("Saved:", startup);

        window.location.href = "dashboard.html";
    }


    const generateBtn =
    document.getElementById("generateBtn");

    if(generateBtn){
        generateBtn.addEventListener(
            "click",
            startGeneration
        );
    }


    const startBuildingBtn =
    document.getElementById("startBuildingBtn");

    if(startBuildingBtn){
        startBuildingBtn.addEventListener(
            "click",
            startGeneration
        );
    }

});