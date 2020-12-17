gcloud builds submit --tag gcr.io/newtapps/onestep
gcloud run deploy --image gcr.io/newtapps/onestep --platform managed

