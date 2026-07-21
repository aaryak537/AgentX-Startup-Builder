const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const TEMP_DIR = path.join(__dirname, "temp");
const CODE_FILE = path.join(TEMP_DIR, "code.js");

function runDocker(code) {

    return new Promise((resolve) => {

        if (!fs.existsSync(TEMP_DIR))
            fs.mkdirSync(TEMP_DIR);

        fs.writeFileSync(CODE_FILE, code);

        const build =
            "docker build -t agentx-sandbox ./backend/sandbox";

        exec(build, (buildErr) => {

            if (buildErr) {

                return resolve({
                    success: false,
                    logs: buildErr.message
                });

            }

            const run =
                "docker run --rm agentx-sandbox";

            exec(run, (err, stdout, stderr) => {

                if (err) {

                    return resolve({
                        success: false,
                        logs: stderr
                    });

                }

                resolve({

                    success: true,

                    output: stdout,

                    logs: stderr

                });

            });

        });

    });

}

module.exports = runDocker;