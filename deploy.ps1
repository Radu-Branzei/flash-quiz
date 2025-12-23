# FlashQuiz Deployment Script for Google Cloud Run (PowerShell)
# This script builds and deploys your application to Cloud Run

$ErrorActionPreference = "Stop"

# Configuration
$PROJECT_ID = "first-project-481313"
$REGION = "us-central1"
$SERVICE_NAME = "flash-quiz"
$IMAGE_NAME = "gcr.io/$PROJECT_ID/$SERVICE_NAME"

Write-Host "Starting deployment of FlashQuiz to Google Cloud Run..." -ForegroundColor Green

# Check if gcloud is installed
try {
    $null = Get-Command gcloud -ErrorAction Stop
} catch {
    Write-Host "Error: gcloud CLI is not installed." -ForegroundColor Red
    Write-Host "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Check if logged in to gcloud
Write-Host "Checking gcloud authentication..." -ForegroundColor Yellow
$account = gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>$null
if (-not $account) {
    Write-Host "Not authenticated with gcloud. Running 'gcloud auth login'..." -ForegroundColor Red
    gcloud auth login
}

# Set the project
Write-Host "Setting project to $PROJECT_ID..." -ForegroundColor Yellow
gcloud config set project $PROJECT_ID

# Build the Angular application
Write-Host "Building Angular application..." -ForegroundColor Yellow
npm run build

# Build and submit to Google Container Registry
Write-Host "Building and pushing Docker image..." -ForegroundColor Yellow
gcloud builds submit --tag $IMAGE_NAME

# Deploy to Cloud Run
Write-Host "Deploying to Cloud Run..." -ForegroundColor Yellow
gcloud run deploy $SERVICE_NAME `
  --image $IMAGE_NAME `
  --platform managed `
  --region $REGION `
  --allow-unauthenticated `
  --set-env-vars "GOOGLE_GENKIT_ENVIRONMENT=prod,GCLOUD_PROJECT=$PROJECT_ID,GCLOUD_LOCATION=$REGION,NODE_ENV=production" `
  --memory 512Mi `
  --cpu 1 `
  --timeout 60 `
  --max-instances 10 `
  --min-instances 0

# Get the service URL
$SERVICE_URL = gcloud run services describe $SERVICE_NAME --region=$REGION --format='value(status.url)'

Write-Host "=================================" -ForegroundColor Green
Write-Host "Deployment completed successfully!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host "Your application is available at:"
Write-Host $SERVICE_URL -ForegroundColor Green
Write-Host ""
Write-Host "You can view logs with:"
Write-Host "gcloud run services logs tail $SERVICE_NAME --region=$REGION"
