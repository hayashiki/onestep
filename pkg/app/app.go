package app

import (
	"crypto/rand"
	"fmt"
	"github.com/go-chi/chi"
	chiMiddleware "github.com/go-chi/chi/middleware"
	"github.com/gorilla/sessions"
	"github.com/hayashiki/onestep/pkg/config"
	"github.com/hayashiki/onestep/pkg/repository"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"log"
	"net/http"
)

type appHandler func(http.ResponseWriter, *http.Request) *appError

func (fn appHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if err := fn(w, r); err != nil {
		log.Printf("failed to process request: %s [%s]", err.message, err.err.Error())
		switch err {
		case errBadRequest:
			http.Error(w, err.message, http.StatusBadRequest)
		case errUnauthorized:
			http.Error(w, err.message, http.StatusUnauthorized)
		case errForbidden:
			http.Error(w, err.message, http.StatusForbidden)
		case errNotFound:
			http.Error(w, err.message, http.StatusNotFound)
		case errMethodNotAllowed:
			http.Error(w, err.message, http.StatusMethodNotAllowed)
		default:
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
	}
}

type App struct {
	isDev   bool
	oauth2  *oauth2.Config
	session sessions.Store
	userRepo repository.UserRepository
}

func NewApp(config *config.Config) (*App, error) {
	oauth2Config := &oauth2.Config{
		ClientID:     config.GithubClientID,
		ClientSecret: config.GithubSecretID,
		Endpoint:     github.Endpoint,
		RedirectURL:  config.GithubCallbackURL,
		Scopes:       []string{},
	}

	sessionStoreKey := GenerateRandomKey(32)
	cookieStore := sessions.NewCookieStore([]byte(sessionStoreKey))
	cookieStore.Options.HttpOnly = false
	if !config.IsDev {
		cookieStore.Options.Secure = true
	}

	userRepo := repository.NewUserRepository(repository.GetClient(config.GCPProject))

	return &App{
		isDev:   config.IsDev,
		oauth2:  oauth2Config,
		session: cookieStore,
		userRepo: userRepo,
	}, nil
}

func (app *App) Handler() http.Handler {
	r := chi.NewRouter()
	r.Use(
		chiMiddleware.Logger,
		chiMiddleware.Recoverer,
	)

	r.Route("/auth", func(r chi.Router) {
		r.Method(http.MethodGet, "/github/invoke", appHandler(app.oauth2GithubHandler))
		r.Method(http.MethodGet, "/github/callback", appHandler(app.oauth2GithubHandler))
	})

	return r
}

func GenerateRandomKey(l int) string {
	b := make([]byte, l)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}
