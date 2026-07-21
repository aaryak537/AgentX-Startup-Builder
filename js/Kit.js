document.addEventListener("DOMContentLoaded", () => {

    const startup = AgentX.loadStartup();

    if (!startup) {

        alert("No startup found.");

        window.location.href = "dashboard.html";

        return;

    }

    AgentX.paintTopbarMeta(startup);

    loadStartupKit(startup);

});



// ================= LOAD STARTUP =================

function loadStartupKit(startup) {

    function setText(id, value) {

        const el = document.getElementById(id);

        if (el) {

            el.textContent = value ?? "-";

        }

    }



    // ================= BASIC =================

    setText("startupName", startup.name);

    setText("industry", startup.category);

    setText("description",

        startup.businessPlan?.executiveSummary

    );

    setText("targetMarket",

        startup.marketLabel

    );

    setText("budget",

        AgentX.fmtMoney(

            startup.financial.investment

        )

    );

    setText("score",

        startup.score + "/100"

    );

    setText("tagline",

        startup.tagline

    );

    setText("startupId",

        startup.startupId || "AGX-DEMO"

    );



    // ================= NAVIGATION =================

    const pages = {

        overviewBtn: "overview.html",

        brandingBtn: "branding.html",

        financialBtn: "financial.html",

        marketingBtn: "marketing.html",

        dashboardBtn: "dashboard.html"

    };



    Object.entries(pages).forEach(([id, page]) => {

        const btn = document.getElementById(id);

        if (btn) {

            btn.addEventListener("click", () => {

                window.location.href = page;

            });

        }

    });



    // ================= SAVE =================

    const saveBtn = document.getElementById("saveBtn");

    if (saveBtn) {

        saveBtn.addEventListener("click", () => {

            localStorage.setItem(

                "agentx_startup",

                JSON.stringify(startup)

            );

            alert("✅ Startup saved.");

        });

    }



    // ================= EXPORT JSON =================

    const exportBtn = document.getElementById("exportBtn");

    if (exportBtn) {

        exportBtn.addEventListener("click", () => {

            const json = JSON.stringify(

                startup,

                null,

                2

            );



            const blob = new Blob(

                [json],

                {

                    type: "application/json"

                }

            );



            const url =

                URL.createObjectURL(blob);



            const a =

                document.createElement("a");



            a.href = url;

            a.download =

                `${startup.name}-startup.json`;



            a.click();



            URL.revokeObjectURL(url);

        });

    }



    console.log(

        "Startup Kit Loaded",

        startup

    );

}