from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AgentX Startup Builder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "status": "running",
        "project": "AgentX Startup Builder",
        "version": "1.0"
    }
from routes.startup import router as startup_router

app.include_router(
    startup_router,
    prefix="/api/startup",
    tags=["Startup"]
)
from routes.pdf import router as pdf_router

app.include_router(pdf_router)