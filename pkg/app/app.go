package app

import (
	"crypto/rand"
	"fmt"
	"github.com/99designs/gqlgen/handler"
	"github.com/go-chi/chi"
	chiMiddleware "github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/gorilla/sessions"
	"github.com/hayashiki/onestep/pkg/config"
	"github.com/hayashiki/onestep/pkg/gqlgen/exec"
	"github.com/hayashiki/onestep/pkg/gqlgen/resolver"
	"github.com/hayashiki/onestep/pkg/repository"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"log"
	"net/http"
	"go.pyspa.org/brbundle"
	"go.pyspa.org/brbundle/brchi"
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
	projectRepo repository.ProjectRepository
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
	projectRepo := repository.NewProjectRepository(repository.GetClient(config.GCPProject))

	return &App{
		isDev:   config.IsDev,
		oauth2:  oauth2Config,
		session: cookieStore,
		userRepo: userRepo,
		projectRepo: projectRepo,
	}, nil
}

func (app *App) Handler() http.Handler {
	r := chi.NewRouter()
	r.Use(
		chiMiddleware.Logger,
		chiMiddleware.Recoverer,
	)
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins: []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins:   []string{"*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Route("/api/auth", func(r chi.Router) {
		r.Method(http.MethodGet, "/github/invoke", appHandler(app.oauth2GithubHandler))
		r.Method(http.MethodGet, "/github/callback", appHandler(app.oauth2GithubCallbackHandler))
		r.Method(http.MethodPost, "/github/callback", appHandler(app.oauth2GithubCallbackFromWebHandler))
		r.Method(http.MethodGet, "/sessions", appHandler(app.GetSessionUserID))
	})


	resolver := resolver.NewResolver(app.userRepo, app.projectRepo)

	r.Route("/api", func(r chi.Router) {
		r.Handle("/", handler.Playground("GraphQL playground", "/query"))
		r.Handle("/query", handler.GraphQL(exec.NewExecutableSchema(exec.Config{Resolvers: resolver})))
	})

	r.NotFound(brchi.Mount(brbundle.WebOption{
		SPAFallback: "index.html",
	}))
	return r
}

func GenerateRandomKey(l int) string {
	b := make([]byte, l)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}
