import os
import sys
import torch

# Add backend directory to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.model_arch import BiomassModel
from app.config import NUM_FOLDS, MODEL_DIR

def generate_dummy_models():
    """
    Generate dummy model weights for the 5 folds.
    WARNING: These are for API startup and testing ONLY.
    They will produce garbage predictions.
    """
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
        
    print(f"Generating {NUM_FOLDS} dummy models at {MODEL_DIR}...")
    
    for fold in range(NUM_FOLDS):
        model_path = os.path.join(MODEL_DIR, f"model_fold{fold}.pt")
        
        # Instantiate model
        model = BiomassModel(pretrained=False)
        
        # Save state dict
        torch.save(model.state_dict(), model_path)
        print(f"Saved {model_path}")
        
    print("Done. Reminder: Replace these with actual trained weights for real predictions.")

if __name__ == "__main__":
    generate_dummy_models()
