from fastapi import FastAPI, UploadFile, Form, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging

from app.schemas import PredictionResponse, ModelInfoResponse
from app.predictor import predict_biomass
from app.model_loader import load_models_once
from app.config import MODEL_NAME, NUM_FOLDS, TARGETS, DEVICE, IMG_SIZE

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Biomass Prediction API",
    description="AI-powered Biomass Prediction Platform",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up FastAPI server...")
    # Globally cache models on startup
    load_models_once()

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/model-info", response_model=ModelInfoResponse)
async def get_model_info():
    """Return model architecture and configuration info."""
    return {
        "backbone": MODEL_NAME,
        "num_folds": NUM_FOLDS,
        "targets": TARGETS,
        "device": DEVICE,
        "image_size": IMG_SIZE
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict(
    image: UploadFile = File(...),
    ndvi: float = Form(...),
    height: float = Form(...)
):
    try:
        if not image.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File provided is not an image.")
            
        file_bytes = await image.read()
        
        result = predict_biomass(file_bytes, ndvi, height)
        return result
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
