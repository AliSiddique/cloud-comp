# Use an official Python runtime as a parent image
FROM python:3.9

# Set environment variables for unbuffered output and to not generate .pyc files
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Set the working directory inside the container
WORKDIR /app

# Set your environment variables
ENV DEBUG=True


# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app/

# Expose the port that Django runs on  
EXPOSE 8000

# Define the command to run your application
CMD ["python", "manage.py", "runserver", "127.0.0.1:8000"]
