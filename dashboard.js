const agents = [

"market",

"branding",

"business",

"finance",

"marketing",

"social",

"website",

"competitor",

"swot",

"risk",

"pricing",

"roadmap",

"legal",

"pitch",

"persona",

"launch"

];

async function runAgent(agent){

const status=document.getElementById(agent+"-status");

status.innerHTML="Thinking...";

status.style.color="orange";

await new Promise(r=>setTimeout(r,1500));

status.innerHTML="Completed";

status.style.color="#00ff88";

}

async function generateAll(){

for(const a of agents){

await runAgent(a);

}

alert("Startup Generated Successfully");

}