package main

import (
	"fmt"
	"github.com/hayashiki/onestep/pkg/app"
	"github.com/hayashiki/onestep/pkg/config"
	"log"
	"net/http"
	"os"
)

func main() {
	config := config.MustReadConfigFromEnv()
	app, err := app.NewApp(config)

	if err != nil {
		log.Fatal(err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%s", port), app.Handler()); err != nil {
		log.Fatal(err)
	}
}
