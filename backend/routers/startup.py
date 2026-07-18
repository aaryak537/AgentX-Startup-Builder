from fastapi import APIRouter
from pydantic import BaseModel

from services.orchestrator import build_startup

router = APIRouter()


class StartupRequest(BaseModel):
    idea: str


@router.post("/generate")
def generate_startup(request: StartupRequest):

    result = build_startup(request.idea)

    return {
        "success": True,
        "data": result
    }