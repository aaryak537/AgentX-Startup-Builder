// ================= AGENTX STORAGE =================

const STORAGE_KEY = "agentx_startup";


// ================= SAVE =================

function saveStartup(data) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

        console.log("✅ Startup saved.");

    }

    catch(error){

        console.error(
            "Save Error:",
            error
        );

    }

}



// ================= LOAD =================

function loadStartup() {

    try{

        const startup =
            localStorage.getItem(
                STORAGE_KEY
            );

        if(startup){

            return JSON.parse(startup);

        }

        // Generate default startup
        return AgentX.loadStartup();

    }

    catch(error){

        console.error(
            "Load Error:",
            error
        );

        return AgentX.loadStartup();

    }

}



// ================= UPDATE =================

function updateStartup(key,value){

    const startup =
        loadStartup();

    startup[key]=value;

    saveStartup(startup);

}



// ================= UPDATE FINANCIAL =================

function updateFinancial(key,value){

    const startup =
        loadStartup();

    if(!startup.financial){

        startup.financial={};

    }

    startup.financial[key]=value;

    saveStartup(startup);

}



// ================= UPDATE BRANDING =================

function updateBranding(key,value){

    const startup =
        loadStartup();

    if(!startup.branding){

        startup.branding={};

    }

    startup.branding[key]=value;

    saveStartup(startup);

}



// ================= UPDATE MARKETING =================

function updateMarketing(key,value){

    const startup =
        loadStartup();

    if(!startup.marketing){

        startup.marketing={};

    }

    startup.marketing[key]=value;

    saveStartup(startup);

}



// ================= CLEAR =================

function clearStartup(){

    localStorage.removeItem(
        STORAGE_KEY
    );

    localStorage.removeItem(
        "agentx_progress"
    );

    localStorage.removeItem(
        "agentx_idea"
    );

    console.log(
        "🗑 Startup cleared."
    );

}



// ================= EXPORT =================

window.AgentXStorage={

    saveStartup,

    loadStartup,

    updateStartup,

    updateFinancial,

    updateBranding,

    updateMarketing,

    clearStartup

};