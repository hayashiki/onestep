package app

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"github.com/hayashiki/onestep/pkg/model"
	"golang.org/x/oauth2"
	"log"
	"net/http"
	"time"
)

type contextKey string

type user struct {
	ID   int64
}

const (
	defaultSessionID = "default"
	userSessionKey   = "user"

	contextKeyUser contextKey = "user"

	githubUserAPIURL = "https://api.github.com/user"
)


func (app *App) oauth2GithubHandler(w http.ResponseWriter, r *http.Request) *appError {
	b := make([]byte, 8)
	_, err := rand.Read(b)
	if err != nil {
		return &appError{err, "failed to generate state"}
	}
	state := fmt.Sprintf("%02x", b)
	log.Printf("oauth2GithubHandler state is %s", state)
	stateSession, err := app.session.New(r, state)
	if err != nil {
		return &appError{err, "failed to generate state"}
	}
	stateSession.Options.MaxAge = 10 * 60 // 10 minutes
	if err := stateSession.Save(r, w); err != nil {
		return &appError{err, "failed to save session"}
	}

	// cookie設定したがうまくいかない説
	http.SetCookie(w, &http.Cookie{
		Name:    "state",
		Value:   state,
		Expires: time.Now().Add(300 * time.Second),
		Secure:  false,
	})

	log.Printf("path is %s", app.oauth2.AuthCodeURL(state))
	w.Write([]byte(app.oauth2.AuthCodeURL(state)))
	return nil
}

func (app *App) oauth2GithubCallbackHandler(w http.ResponseWriter, r *http.Request) *appError {
	body := &struct {
		Code  string
		State string
	}{}
	body.Code = r.FormValue("code")
	body.State = r.FormValue("state")

	// validate state
	stateSession, err := app.session.Get(r, body.State)
	if err != nil {
		return &appError{err, "failed to get session"}
	}
	if stateSession.IsNew {
		log.Printf("invalid state value")
		return errBadRequest
	}

	token, err := app.oauth2.Exchange(r.Context(), body.Code)

	client := oauth2.NewClient(r.Context(), oauth2.StaticTokenSource(token))
	res, err := client.Get(githubUserAPIURL)
	if err != nil {
		return &appError{err, "failed to get user info"}
	}
	defer res.Body.Close()

	userInfo := struct {
		ID    int64  `json:"id"`
		Login string `json:"login"`
	}{}
	if err := json.NewDecoder(res.Body).Decode(&userInfo); err != nil {
		return &appError{err, "failed to encode json"}
	}

	dsUser := &model.User{
		ID:        userInfo.ID,
		//Sub:       "",
		Name:      userInfo.Login,
		//Email:     "",
		//Profile:   ,
		//Issuer:    "",
		IssuedAt:  time.Now(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// save user info to datastore
	err = app.userRepo.Put(dsUser)
	if err != nil {
		return &appError{err, "failed to save user info"}
	}
	// save user info to session
	defaultSession, err := app.session.New(r, defaultSessionID)
	if err != nil {
		return &appError{err, "failed to create new session"}
	}
	defaultSession.Values[userSessionKey] = userInfo.ID
	if err := defaultSession.Save(r, w); err != nil {
		return &appError{err, "failed to save session"}
	}

	return nil
}

func (app *App) oauth2GithubCallbackFromWebHandler(w http.ResponseWriter, r *http.Request) *appError {
	body := &struct {
		Code  string `json:"code"`
		State string `json:"state"`
	}{}
	if err := json.NewDecoder(r.Body).Decode(body); err != nil {
		return &appError{err, "failed to decode json"}
	}
	defer r.Body.Close()

	log.Printf("oauth2GithubHandler state is %s", body.State)
	stateSession, err := app.session.Get(r, body.State)
	if err != nil {
		return &appError{err, "failed to get session"}
	}

	log.Printf("stateSession state is %+v", stateSession)

	// なぜかfalseになる
	if stateSession.IsNew {
		log.Printf("invalid state value")
		return errBadRequest
	}

	token, err := app.oauth2.Exchange(r.Context(), body.Code)

	client := oauth2.NewClient(r.Context(), oauth2.StaticTokenSource(token))
	res, err := client.Get(githubUserAPIURL)
	if err != nil {
		return &appError{err, "failed to get user info"}
	}
	defer res.Body.Close()

	userInfo := struct {
		ID    int64  `json:"id"`
		Login string `json:"login"`
	}{}
	if err := json.NewDecoder(res.Body).Decode(&userInfo); err != nil {
		return &appError{err, "failed to encode json"}
	}

	dsUser := &model.User{
		ID:        userInfo.ID,
		//Sub:       "",
		Name:      userInfo.Login,
		//Email:     "",
		//Profile:   ,
		//Issuer:    "",
		IssuedAt:  time.Now(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// save user info to datastore
	err = app.userRepo.Put(dsUser)
	if err != nil {
		return &appError{err, "failed to save user info"}
	}
	// save user info to session
	defaultSession, err := app.session.New(r, defaultSessionID)
	if err != nil {
		return &appError{err, "failed to create new session"}
	}
	defaultSession.Values[userSessionKey] = userInfo.ID
	if err := defaultSession.Save(r, w); err != nil {
		return &appError{err, "failed to save session"}
	}

	return nil
}

func (app *App)  GetSessionUserID(w http.ResponseWriter, r *http.Request) *appError {
	session, err := app.session.Get(r, defaultSessionID)
	if err != nil {
		return &appError{err, "failed to encode json"}
	}

	if value, exist := session.Values[userSessionKey]; exist {
		log.Printf("%v", value)

		//if u, ok := value.(int64); ok {
		//	//r = r.WithContext(context.WithValue(r.Context(), contextKeyUser, u))
		//	return nil
		//}
	}

	//if !session.IsNew {
	//	userIDInt := session.Values[userSessionKey]
	//	//userID, _ := userIDInt.(string)
	//
	//	log.Println(userIDInt)
	//
	//	// refresh the cookie
	//	err = session.Save(r, w)
	//	if err != nil {
	//		return &appError{err, "failed to encode json"}
	//	}
	//
	//	return nil
	//}

	return nil
}
