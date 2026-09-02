# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/playwright/python:v1.50.0-noble

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY conftest.py pytest.ini ./
COPY tests/ tests/

# The base image already includes browser deps; no separate install is required.
CMD ["python", "-m", "pytest", "tests/", "-v", "--color=yes"]
