import torch
import torch.nn as nn
import timm
from app.config import MODEL_NAME, NUM_TARGETS, IN_CHANS

class BiomassModel(nn.Module):
    def __init__(self, model_name=MODEL_NAME, pretrained=False):
        super().__init__()
        
        # EfficientNet Backbone
        self.backbone = timm.create_model(
            model_name, 
            pretrained=pretrained, 
            num_classes=0, 
            global_pool='avg',
            in_chans=IN_CHANS
        )
        
        # Determine in_features from backbone (EfficientNet-B3 is 1536)
        in_features = self.backbone.num_features
        
        # Metadata MLP
        self.meta_mlp = nn.Sequential(
            nn.Linear(2, 64),
            nn.SiLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 32)
        )
        
        # Fusion regression head
        self.head = nn.Sequential(
            nn.Linear(in_features + 32, 512),
            nn.BatchNorm1d(512),
            nn.SiLU(),
            nn.Dropout(0.3),
            nn.Linear(512, 256),
            nn.BatchNorm1d(256),
            nn.SiLU(),
            nn.Dropout(0.3),
            nn.Linear(256, NUM_TARGETS)
        )

    def forward(self, image, metadata):
        # 1. Extract visual features
        x_img = self.backbone(image)
        
        # 2. Process metadata
        x_meta = self.meta_mlp(metadata)
        
        # 3. Feature fusion
        x = torch.cat([x_img, x_meta], dim=1)
        
        # 4. Multi-task regression
        # Outputs are in log-space!
        output = self.head(x)
        return output
