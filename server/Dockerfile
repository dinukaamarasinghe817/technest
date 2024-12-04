# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Install system dependencies for mysqlclient
RUN apt-get update && \
    apt-get install -y \
    pkg-config \
    libmariadb-dev \
    build-essential \
    libssl-dev \
    libffi-dev \
    libpq-dev \
    default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./technest/ /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["bash", "-c", "cd technest && python manage.py runserver 0.0.0.0:8000"]
