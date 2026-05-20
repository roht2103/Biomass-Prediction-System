from pydantic import BaseModel
from typing import List

class PredictionResponse(BaseModel):
    Dry_Green_g: float
    Dry_Clover_g: float
    Dry_Dead_g: float
    GDM_g: float
    Dry_Total_g: float
    condition: str
    confidence: float
    processing_time: str

class ModelInfoResponse(BaseModel):
    backbone: str
    num_folds: int
    targets: List[str]
    device: str
    image_size: int
