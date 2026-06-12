FROM python:3.10-slim

WORKDIR /app

# Install system dependencies for OpenCV
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies directly to avoid requiring requirements.txt
RUN pip install --no-cache-dir tensorflow flask opencv-python Pillow numpy

COPY . .

# Expose port (default 5002)
EXPOSE 5002

CMD ["python", "app.py"]
