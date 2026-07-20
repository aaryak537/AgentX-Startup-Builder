const PDFDocument = require("pdfkit");

function generatePDF(startupData, res) {
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${startupData.name || "startup"}-report.pdf"`
    );

    doc.pipe(res);

    // Title
    doc
        .fontSize(24)
        .text("AgentX Startup Report", { align: "center" });

    doc.moveDown();

    // Startup Name
    doc
        .fontSize(18)
        .text(`Startup: ${startupData.name || "Untitled Startup"}`);

    doc.moveDown();

    // Overview
    doc
        .fontSize(16)
        .text("Overview", { underline: true });

    doc
        .fontSize(12)
        .text(startupData.overview || "No overview available.");

    doc.moveDown();

    // Market Research
    doc
        .fontSize(16)
        .text("Market Research", { underline: true });

    doc
        .fontSize(12)
        .text(startupData.marketResearch || "No market research.");

    doc.moveDown();

    // Branding
    doc
        .fontSize(16)
        .text("Branding", { underline: true });

    doc
        .fontSize(12)
        .text(startupData.branding || "No branding information.");

    doc.moveDown();

    // Financial Plan
    doc
        .fontSize(16)
        .text("Financial Plan", { underline: true });

    doc
        .fontSize(12)
        .text(startupData.financial || "No financial plan.");

    doc.moveDown();

    // Marketing
    doc
        .fontSize(16)
        .text("Marketing Strategy", { underline: true });

    doc
        .fontSize(12)
        .text(startupData.marketing || "No marketing strategy.");

    doc.moveDown();

    // Footer
    doc
        .fontSize(10)
        .text(
            "Generated automatically by AgentX Startup Builder",
            {
                align: "center"
            }
        );

    doc.end();
}

module.exports = generatePDF;