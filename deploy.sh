#!/bin/bash

# FlashQuiz Deployment Script for Google Cloud Run
# This script builds and deploys your application to Cloud Run

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="first-project-481313"
REGION="us-central1"
SERVICE_NAME="flash-quiz"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo -e "${GREEN}Starting deployment of FlashQuiz to Google Cloud Run...${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI is not installed.${NC}"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if logged in to gcloud
echo -e "${YELLOW}Checking gcloud authentication...${NC}"
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
    echo -e "${RED}Not authenticated with gcloud. Running 'gcloud auth login'...${NC}"
    gcloud auth login
fi

# Set the project
echo -e "${YELLOW}Setting project to ${PROJECT_ID}...${NC}"
gcloud config set project ${PROJECT_ID}

# Build the Angular application
echo -e "${YELLOW}Building Angular application...${NC}"
npm run build

# Build and submit to Google Container Registry
echo -e "${YELLOW}Building and pushing Docker image...${NC}"
gcloud builds submit --tag ${IMAGE_NAME}

# Deploy to Cloud Run
echo -e "${YELLOW}Deploying to Cloud Run...${NC}"
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --set-env-vars "GOOGLE_GENKIT_ENVIRONMENT=prod,GCLOUD_PROJECT=${PROJECT_ID},GCLOUD_LOCATION=${REGION},NODE_ENV=production" \
  --memory 512Mi \
  --cpu 1 \
  --timeout 60 \
  --max-instances 10 \
  --min-instances 0

# Get the service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region=${REGION} --format='value(status.url)')

echo -e "${GREEN}=================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}=================================${NC}"
echo -e "Your application is available at:"
echo -e "${GREEN}${SERVICE_URL}${NC}"
echo ""
echo "You can view logs with:"
echo "gcloud run services logs tail ${SERVICE_NAME} --region=${REGION}"
