import time
import numpy as np
import torch
import cv2
from fastapi import UploadFile

from app.config import DEVICE, TARGETS
from app.model_loader import get_ensemble
from app.transforms import get_validation_transforms
from app.preprocessing import normalize_metadata
from app.utils import get_pasture_condition

def predict_biomass(file_bytes: bytes, ndvi: float, height: float) -> dict:
    start_time = time.time()
    
    # 1. Load image
    np_arr = np.frombuffer(file_bytes, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # 2. Apply validation transforms
    transforms = get_validation_transforms()
    transformed = transforms(image=image)
    img_tensor = transformed["image"].unsqueeze(0).to(DEVICE) # Shape: (1, 3, H, W)
    
    # 3. Normalize metadata
    meta_tensor = normalize_metadata(ndvi, height).to(DEVICE)
    
    # 4. Ensemble Inference
    models = get_ensemble()
    if not models:
        raise ValueError("No models are loaded. Please check the model directory.")

    predictions = []
    
    with torch.no_grad():
        for model in models:
            # Model outputs are predicted in log-space!
            pred_log = model(img_tensor, meta_tensor)
            pred_log_np = pred_log.cpu().numpy()[0]
            
            # Inverse transform from log-space to actual biomass values
            pred_g = np.expm1(pred_log_np)
            predictions.append(pred_g)
            
    # 5. Ensemble Average
    avg_pred = np.mean(predictions, axis=0)
    
    # Map predictions to target names
    result_dict = {target: float(val) for target, val in zip(TARGETS, avg_pred)}
    
    # 6. Post-processing
    dry_total = result_dict.get("Dry_Total_g", 0)
    condition = get_pasture_condition(dry_total)
    
    processing_time = time.time() - start_time
    
    # Mock confidence for now (could be derived from ensemble variance)
    confidence = 0.92
    
    result_dict["condition"] = condition
    result_dict["confidence"] = confidence
    result_dict["processing_time"] = f"{processing_time:.2f} sec"
    
    return result_dict
