package config

import (
	"github.com/kelseyhightower/envconfig"
	"log"
)

type Config struct {
	GCPProject                  string `envconfig:"GCP_PROJECT" required:"true"`
	GithubClientID              string `envconfig:"GH_CLIENT_ID" required:"true"`
	GithubSecretID              string `envconfig:"GH_SECRET_ID" required:"true"`
	GithubCallbackURL           string `envconfig:"GH_CALLBACK_URL" required:"true"`
	// TODO: いい感じにする
	IsDev                       bool   `envconfig:"APP_MODE" default:"true"`
}

func MustReadConfigFromEnv() *Config {
	var config Config
	if err := envconfig.Process("", &config); err != nil {
		log.Fatal(err)
		//panic(err)
	}
	return &config
}
