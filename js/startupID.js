// ================= STARTUP ID GENERATOR =================

function generateStartupID() {

    let id = localStorage.getItem("startupID");


    if (!id) {

        id =
        "AGX-2026-" +
        Math.floor(
            10000 + Math.random() * 90000
        );


        localStorage.setItem(
            "startupID",
            id
        );

    }


    return id;

}


// Make available globally
window.generateStartupID = generateStartupID;