import PDFDocument from "pdfkit";

export function generatePDF(data, res) {

    const doc = new PDFDocument({
        margin: 50,
        size: "A4"
    });

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=startup-report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(28)
       .text(data.branding.startupName,{
           align:"center"
       });

    doc.moveDown();

    doc.fontSize(16)
       .text(data.branding.tagline,{
           align:"center"
       });

    doc.addPage();

    doc.fontSize(20)
       .text("Executive Summary");

    doc.moveDown();

    doc.fontSize(12)
       .text(data.business.executiveSummary);

    doc.addPage();

    doc.fontSize(20)
       .text("Financial Forecast");

    doc.moveDown();

    doc.text(
        `Investment : ${data.finance.estimatedInvestment}`
    );

    doc.text(
        `Revenue : ${data.finance.monthlyRevenue}`
    );

    doc.text(
        `Break Even : ${data.finance.breakEven}`
    );

    doc.end();

}