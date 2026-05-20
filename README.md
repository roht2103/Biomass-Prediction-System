# Biomass Prediction System

A complete AI-powered platform for predicting vegetation biomass using an EfficientNet-B3 multi-task regression ensemble model. 

The platform features a modern, responsive **Next.js 15** frontend and a highly optimized **FastAPI** backend that accurately estimates five distinct biomass characteristics (Dry Green, Dry Clover, Dry Dead, GDM, and Dry Total) from field imagery and metadata (NDVI, Height).

## Project Architecture

* **Frontend:** Next.js 15 (App Router), Tailwind CSS v4, Recharts, Framer Motion, TypeScript
* **Backend:** FastAPI, PyTorch (TIMM), Albumentations, OpenCV, Uvicorn
* **Model:** 5-Fold Ensemble EfficientNet-B3 with Metadata MLP Fusion

## Features
- Upload vegetation imagery (drag-and-drop).
- Metadata ingestion (NDVI and vegetation height).
- Real-time log-space inverse-transformed inference (under 1 second).
- Farm-scale estimation calculator to extrapolate sampled region biomass.
- Modern Glassmorphism UI with complete Light/Dark Mode support.

## Getting Started (Local Development)

### 1. Model Weights
Place your trained PyTorch ensemble model weights (`model_fold0.pt` to `model_fold4.pt`) inside the `backend/model/` directory. If you don't have them, you can generate dummy weights for testing:
```bash
cd backend
python scripts/generate_dummy_models.py
```

### 2. Run the Backend (FastAPI)
Open a terminal and start the Uvicorn server:
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```
The API will run at `http://localhost:8000`. API Docs are available at `http://localhost:8000/docs`.

### 3. Run the Frontend (Next.js)
Open a second terminal and start the development server:
```bash
cd frontend
npm install
npm run dev
```
Access the dashboard at `http://localhost:3000`.
