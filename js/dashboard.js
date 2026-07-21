// ================= AGENTX DASHBOARD =================


// Load engine
// Make sure dashboard.html has:
// <script src="engine.js"></script>
// before this file


const agents = [
    "market",
    "brandingAgent",
    "businessAgent",
    "financeAgent",
    "socialAgent",
    "websiteAgent",
    "competitor",
    "swotAgent",
    "riskAgent",
    "roadmap",
    "legalAgent",
    "pitchAgent",
    "launchAgent"
];


// ================= RUN AGENT =================

function runAgent(agent, startup){


    const status =
        document.getElementById(`${agent}-status`);


    const result =
        document.getElementById(`${agent}-result`);



    if(status){
        status.innerHTML="🟡 Processing...";
    }



    setTimeout(()=>{


        let output="";


        switch(agent){


            case "market":

                output =
                startup.businessPlan.marketOpportunity;

                break;



            case "brandingAgent":

                output =
                `
                Logo:
                ${startup.name}

                Colors:
                ${startup.palette.join(", ")}

                Tagline:
                ${startup.tagline}
                `;

                break;



            case "financeAgent":

                output =
                `
                Investment:
                ${AgentX.fmtMoney(
                    startup.financial.investment
                )}

                Revenue:
                ${AgentX.fmtMoney(
                    startup.financial.revenueY1
                )}

                ROI:
                ${startup.financial.roi}%
                `;

                break;



            case "competitor":

                output =
                startup.competitors
                .map(c=>c.name)
                .join(", ");

                break;



            case "socialAgent":

                output =
                `
                ${startup.name}
                social campaigns created.
                
                Instagram:
                Fresh launch campaign
                
                Festival offers
                
                Influencer marketing
                `;

                break;



            case "swotAgent":

                output =
                `
                Strength:
                Strong branding
                
                Weakness:
                Initial competition
                
                Opportunity:
                Online expansion
                
                Threat:
                Market competition
                `;

                break;



            default:

                output =
                `${agent} completed successfully`;

        }



        if(status){

            status.innerHTML="✅ Completed";

        }


        if(result){

            result.innerHTML=output;

        }



    },500);


}




// ================= GENERATE ALL =================


function generateAll(){


const promptBox =
document.getElementById("startupPrompt");


if(!promptBox){

console.error(
"startupPrompt missing"
);

return;

}



const prompt =
promptBox.value.trim();



if(!prompt){

alert(
"Enter startup idea"
);

return;

}



const button =
document.getElementById("generateBtn");



if(button){

button.disabled=true;

button.innerHTML=
"Creating Startup...";

}



// Generate using engine

const startup =
AgentX.saveIdea(prompt);



// progress

const progress =
document.getElementById("progressBar");


if(progress){

progress.max=agents.length;

progress.value=0;

}



// Run agents

agents.forEach((agent,index)=>{


runAgent(
agent,
startup
);


if(progress){

setTimeout(()=>{

progress.value=index+1;

},500*index);

}


});




// Save dashboard data


localStorage.setItem(
"startupData",
JSON.stringify(startup)
);



setTimeout(()=>{


if(button){

button.disabled=false;

button.innerHTML=
"Generate Startup";

}



alert(
"🎉 AgentX Startup Generated!"
);



},agents.length*500);



}




// ================= BUTTON CONNECT =================


document.addEventListener(
"DOMContentLoaded",
()=>{


const button =
document.getElementById(
"generateBtn"
);



if(button){

button.addEventListener(
"click",
generateAll
);

}


});