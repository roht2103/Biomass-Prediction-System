import torch
from app.config import NDVI_MEAN, NDVI_STD, HEIGHT_MEAN, HEIGHT_STD

def normalize_metadata(ndvi: float, height: float) -> torch.Tensor:
    """
    Normalize metadata using training set statistics.
    Returns a tensor of shape (1, 2)
    """
    ndvi_n = (ndvi - NDVI_MEAN) / NDVI_STD
    height_n = (height - HEIGHT_MEAN) / HEIGHT_STD
    
    return torch.tensor([[ndvi_n, height_n]], dtype=torch.float32)
