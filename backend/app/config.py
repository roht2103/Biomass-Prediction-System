import os
import torch

# Base directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "model")

# Model Configuration
MODEL_NAME = "tf_efficientnet_b3.ns_jft_in1k"
IMG_SIZE = 300
IN_CHANS = 3
NUM_FOLDS = int(os.environ.get("NUM_FOLDS", 5))

# Target Variables (MUST NOT CHANGE ORDER)
TARGETS = [
    "Dry_Green_g",
    "Dry_Clover_g",
    "Dry_Dead_g",
    "GDM_g",
    "Dry_Total_g"
]
NUM_TARGETS = len(TARGETS)

# Metadata Normalization Constants
# These MUST match the exact statistics used during model training.
NDVI_MEAN = 0.42
NDVI_STD = 0.18
HEIGHT_MEAN = 35.7
HEIGHT_STD = 14.2

# Hardware Configuration
# Fallback to CPU if CUDA is not available
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
