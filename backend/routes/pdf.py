from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from io import BytesIO

from utils.pdf_generator import generate_startup_pdf

router = APIRouter()


@router.post("/export-pdf")
async def export_pdf(data: dict):

    pdf = generate_startup_pdf(data)

    return StreamingResponse(
        BytesIO(pdf),
        media_type="application/pdf",
        headers={
            "Content-Disposition":"attachment; filename=AgentX_Report.pdf"
        }
    )