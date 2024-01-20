# Use an official Python runtime as a parent image
FROM python:3.8

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the environment file into the container
COPY .env /app

# Define environment variable to specify the environment file
ENV ENV_FILE .env

# Run python when the container launches
CMD ["python", "your_script.py"]