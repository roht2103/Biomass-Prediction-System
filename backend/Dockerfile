FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies needed for opencv
RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Generate dummy models (remove this line when you have real models)
RUN python scripts/generate_dummy_models.py

# Hugging Face Spaces uses port 7860 by default
ENV PORT=7860
EXPOSE $PORT

# Command to run the application
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT
