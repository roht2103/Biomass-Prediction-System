import axios from "axios";

// Default to localhost:8000 for local development if not provided
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface PredictionResponse {
  Dry_Green_g: number;
  Dry_Clover_g: number;
  Dry_Dead_g: number;
  GDM_g: number;
  Dry_Total_g: number;
  condition: string;
  confidence: number;
  processing_time: string;
}

export const predictBiomass = async (imageFile: File, ndvi: number, height: number): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("ndvi", ndvi.toString());
  formData.append("height", height.toString());

  const response = await api.post<PredictionResponse>("/predict", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};
