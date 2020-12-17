
package model

import (
	"time"
)

const UserKind = "users"

//type User struct {
//	Name      string    `json:"name" datastore:"name"`
//	Avatar    string    `json:"avatar" datastore:"avatar"`
//	Token     string    `json:"token" datastore:"token"`
//	SlackID   string    `json:"slackId" datastore:"slackId"`
//	GithubID  GithubID  `json:"githubId" datastore:"githubId"`
//	Reviewers Reviewers `json:"reviewers" datastore:"reviewers"`
//	GroupID   int64     `json:"groupId" datastore:"groupId"`
//	TeamID    string    `json:"teamId" datastore:"teamId"`
//}

type User struct {
	ID       int64    `json:"id" datastore:"id"`
	Sub      string    `json:"sub"`
	Name     string    `json:"name"`
	Email    string    `json:"email"`
	Profile  string    `json:"profile"`
	Issuer   string    `json:"issuer"`
	IssuedAt time.Time `json:"issuedAt"`
	CreatedAt time.Time `datastore:"createdAt,noindex"`
	UpdatedAt time.Time `datastore:"updatedAt,noindex"`
}

