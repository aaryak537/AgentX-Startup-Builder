const runDocker = require("../sandbox/dockerRunner");
const analyzeError = require("./errorAnalyzer");
const fixCode = require("./codeFixer");


async function retryAgent(code, language, maxRetries = 5) {

    let attempt = 0;
    let currentCode = code;


    while(attempt < maxRetries){

        console.log(
            `🔄 Attempt ${attempt + 1}/${maxRetries}`
        );


        // Run code
        const result = await runDocker(
            currentCode,
            language
        );


        // Success
        if(result.success){

            return {

                success:true,

                message:
                "Code executed successfully",

                code:currentCode,

                attempts:attempt + 1
            };
        }



        console.log(
            "❌ Error detected:",
            result.logs
        );



        // Analyze error

        const analysis =
        await analyzeError(
            result.logs,
            currentCode,
            language
        );



        console.log(
            "AI Fix:",
            analysis
        );



        // Generate fixed code

        currentCode =
        await fixCode(
            currentCode,
            analysis,
            language
        );



        attempt++;

    }



    return {

        success:false,

        message:
        "Maximum retry limit reached",

        code:currentCode,

        attempts:maxRetries

    };

}


module.exports = retryAgent;