from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

styles = getSampleStyleSheet()


def generate_startup_pdf(data):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    story = []

    title = Paragraph("<b><font size=22>AgentX Startup Report</font></b>", styles["Title"])
    story.append(title)

    story.append(Spacer(1,20))

    story.append(Paragraph(f"<b>Startup Name:</b> {data.get('startup_name','Unknown')}", styles["Normal"]))
    story.append(Paragraph(f"<b>Business Idea:</b> {data.get('idea','')}", styles["Normal"]))

    story.append(Spacer(1,15))

    story.append(Paragraph("<b>Executive Summary</b>", styles["Heading2"]))
    story.append(Paragraph(data.get("summary",""), styles["BodyText"]))

    story.append(Spacer(1,15))

    story.append(Paragraph("<b>Market Research</b>", styles["Heading2"]))
    story.append(Paragraph(data.get("market",""), styles["BodyText"]))

    story.append(Spacer(1,15))

    story.append(Paragraph("<b>Target Audience</b>", styles["Heading2"]))
    story.append(Paragraph(data.get("audience",""), styles["BodyText"]))

    story.append(Spacer(1,15))

    story.append(Paragraph("<b>Business Model</b>", styles["Heading2"]))
    story.append(Paragraph(data.get("business_model",""), styles["BodyText"]))

    story.append(Spacer(1,15))

    story.append(Paragraph("<b>Marketing Strategy</b>", styles["Heading2"]))
    story.append(Paragraph(data.get("marketing",""), styles["BodyText"]))

    story.append(Spacer(1,15))

    story.append(Paragraph("<b>Branding</b>", styles["Heading2"]))
    story.append(Paragraph(data.get("branding",""), styles["BodyText"]))

    story.append(Spacer(1,15))

    story.append(Paragraph("<b>Financial Projection</b>", styles["Heading2"]))

    finance = data.get("finance", {})

    table_data = [
        ["Year", "Revenue", "Profit"]
    ]

    for item in finance.get("projection", []):
        table_data.append([
            item["year"],
            item["revenue"],
            item["profit"]
        ])

    table = Table(table_data)

    table.setStyle(TableStyle([

        ("BACKGROUND",(0,0),(-1,0),colors.HexColor("#2563EB")),
        ("TEXTCOLOR",(0,0),(-1,0),colors.white),

        ("GRID",(0,0),(-1,-1),1,colors.grey),

        ("BACKGROUND",(0,1),(-1,-1),colors.beige),

        ("FONTNAME",(0,0),(-1,0),"Helvetica-Bold"),

        ("BOTTOMPADDING",(0,0),(-1,0),12)

    ]))

    story.append(table)

    story.append(Spacer(1,20))

    story.append(Paragraph("<b>SWOT Analysis</b>", styles["Heading2"]))
    story.append(Paragraph(data.get("swot",""), styles["BodyText"]))

    story.append(Spacer(1,15))

    story.append(Paragraph("<b>Roadmap</b>", styles["Heading2"]))
    story.append(Paragraph(data.get("roadmap",""), styles["BodyText"]))

    story.append(Spacer(1,15))

    story.append(Paragraph("<b>Investor Score</b>", styles["Heading2"]))
    story.append(Paragraph(str(data.get("score","90"))+"/100", styles["BodyText"]))

    doc.build(story)

    pdf = buffer.getvalue()

    buffer.close()

    return pdf