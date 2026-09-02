FROM python:3.13-slim

WORKDIR /sample
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY api.py pytest.ini ./
COPY tests tests

CMD ["pytest"]
