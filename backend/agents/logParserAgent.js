/**
 * AgentX Log Parser Agent
 *
 * Reads runtime logs from the sandbox
 * Detects:
 *  - Syntax errors
 *  - Runtime errors
 *  - Logic failures
 *  - Missing modules
 *  - Timeouts
 *  - Infinite loops
 *  - Memory errors
 *  - Exit codes
 *
 * Returns structured JSON for the Self-Healing Agent.
 */

class LogParserAgent {
    parse(stdout = "", stderr = "", exitCode = 0) {
        const logs = `${stdout}\n${stderr}`;

        const result = {
            success: exitCode === 0,
            exitCode,
            errorType: "NONE",
            title: "",
            message: "",
            suggestion: "",
            line: null,
            stack: "",
            retry: false,
            severity: "LOW"
        };

        if (exitCode === 0 && stderr.trim() === "") {
            result.title = "Execution Successful";
            result.message = "Program executed successfully.";
            return result;
        }

        // --------------------------
        // Syntax Error
        // --------------------------
        if (logs.includes("SyntaxError")) {
            result.errorType = "SYNTAX_ERROR";
            result.title = "Syntax Error";
            result.message = extractMessage(logs, "SyntaxError");
            result.line = extractLine(logs);
            result.retry = true;
            result.severity = "HIGH";
            result.suggestion =
                "Check missing brackets, commas, semicolons, quotes, or invalid syntax.";
            return result;
        }

        // --------------------------
        // Reference Error
        // --------------------------
        if (logs.includes("ReferenceError")) {
            result.errorType = "REFERENCE_ERROR";
            result.title = "Reference Error";
            result.message = extractMessage(logs, "ReferenceError");
            result.line = extractLine(logs);
            result.retry = true;
            result.severity = "HIGH";
            result.suggestion =
                "Variable or function is not defined.";
            return result;
        }

        // --------------------------
        // Type Error
        // --------------------------
        if (logs.includes("TypeError")) {
            result.errorType = "TYPE_ERROR";
            result.title = "Type Error";
            result.message = extractMessage(logs, "TypeError");
            result.line = extractLine(logs);
            result.retry = true;
            result.severity = "HIGH";
            result.suggestion =
                "Check null values, object properties, and method calls.";
            return result;
        }

        // --------------------------
        // Range Error
        // --------------------------
        if (logs.includes("RangeError")) {
            result.errorType = "RANGE_ERROR";
            result.title = "Range Error";
            result.message = extractMessage(logs, "RangeError");
            result.retry = true;
            result.severity = "MEDIUM";
            result.suggestion =
                "Check recursion depth or invalid array length.";
            return result;
        }

        // --------------------------
        // Module Missing
        // --------------------------
        if (
            logs.includes("Cannot find module") ||
            logs.includes("MODULE_NOT_FOUND")
        ) {
            result.errorType = "MODULE_NOT_FOUND";
            result.title = "Missing Module";
            result.message = extractModule(logs);
            result.retry = false;
            result.severity = "HIGH";
            result.suggestion =
                "Install the missing dependency using npm.";
            return result;
        }

        // --------------------------
        // Timeout
        // --------------------------
        if (
            logs.toLowerCase().includes("timeout") ||
            logs.toLowerCase().includes("timed out")
        ) {
            result.errorType = "TIMEOUT";
            result.title = "Execution Timeout";
            result.message = "Execution exceeded time limit.";
            result.retry = true;
            result.severity = "HIGH";
            result.suggestion =
                "Possible infinite loop or long-running process.";
            return result;
        }

        // --------------------------
        // Memory Error
        // --------------------------
        if (
            logs.includes("heap out of memory") ||
            logs.includes("Allocation failed")
        ) {
            result.errorType = "MEMORY_ERROR";
            result.title = "Out Of Memory";
            result.message = "Program exhausted available memory.";
            result.retry = false;
            result.severity = "CRITICAL";
            result.suggestion =
                "Optimize memory usage or reduce dataset.";
            return result;
        }

        // --------------------------
        // Infinite Loop
        // --------------------------
        if (
            logs.toLowerCase().includes("maximum call stack") ||
            logs.toLowerCase().includes("infinite")
        ) {
            result.errorType = "INFINITE_LOOP";
            result.title = "Infinite Loop";
            result.message =
                "Possible recursive or endless loop detected.";
            result.retry = true;
            result.severity = "HIGH";
            result.suggestion =
                "Review recursion and loop termination conditions.";
            return result;
        }

        // --------------------------
        // Assertion
        // --------------------------
        if (logs.includes("AssertionError")) {
            result.errorType = "ASSERTION_ERROR";
            result.title = "Assertion Failed";
            result.message = extractMessage(logs, "AssertionError");
            result.retry = true;
            result.severity = "MEDIUM";
            result.suggestion =
                "Generated output doesn't match expected behavior.";
            return result;
        }

        // --------------------------
        // Unknown
        // --------------------------
        result.errorType = "UNKNOWN";
        result.title = "Unknown Error";
        result.message = logs.trim();
        result.retry = true;
        result.severity = "MEDIUM";
        result.suggestion =
            "Analyze runtime logs and regenerate code.";

        return result;
    }
}

// ------------------------------------

function extractLine(logs) {
    const match = logs.match(/:(\d+):\d+/);
    return match ? Number(match[1]) : null;
}

function extractMessage(logs, keyword) {
    const regex = new RegExp(`${keyword}: (.*)`);
    const match = logs.match(regex);
    return match ? match[1] : keyword;
}

function extractModule(logs) {
    const match = logs.match(/Cannot find module '(.*)'/);
    return match ? match[1] : "Unknown module";
}

module.exports = new LogParserAgent();