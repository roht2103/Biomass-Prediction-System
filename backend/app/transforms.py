import albumentations as A
from albumentations.pytorch import ToTensorV2
from app.config import IMG_SIZE

def get_validation_transforms():
    """
    Validation transforms exactly matching training inference.
    """
    return A.Compose([
        A.Resize(IMG_SIZE, IMG_SIZE),
        A.Normalize(
            mean=[0.485, 0.456, 0.406], # ImageNet stats
            std=[0.229, 0.224, 0.225],
            max_pixel_value=255.0
        ),
        ToTensorV2()
    ])
