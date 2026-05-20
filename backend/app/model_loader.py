import os
import torch
import logging
from app.config import MODEL_DIR, NUM_FOLDS, DEVICE
from app.model_arch import BiomassModel

logger = logging.getLogger(__name__)

# Global cache for ensemble models
_ENSEMBLE_MODELS = []

def load_models_once():
    """
    Load all fold models into memory globally to prevent reloading on each request.
    """
    global _ENSEMBLE_MODELS
    
    if _ENSEMBLE_MODELS:
        return _ENSEMBLE_MODELS

    logger.info(f"Loading {NUM_FOLDS} models to {DEVICE}...")
    
    for fold in range(NUM_FOLDS):
        model_path = os.path.join(MODEL_DIR, f"model_fold{fold}.pt")
        
        # Instantiate architecture
        model = BiomassModel(pretrained=False)
        
        try:
            # Load weights
            state_dict = torch.load(model_path, map_location="cpu")
            model.load_state_dict(state_dict)
            model.to(DEVICE)
            model.eval()  # Set to evaluation mode
            _ENSEMBLE_MODELS.append(model)
            logger.info(f"Successfully loaded model fold {fold}")
        except FileNotFoundError:
            logger.warning(f"Model fold {fold} not found at {model_path}. If you are developing, please run 'python scripts/generate_dummy_models.py'.")
        except Exception as e:
            logger.error(f"Failed to load model fold {fold}: {str(e)}")
            
    return _ENSEMBLE_MODELS

def get_ensemble():
    return _ENSEMBLE_MODELS
