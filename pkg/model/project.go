package model

import "cloud.google.com/go/datastore"

const ProjectKind = "projects"

type Project struct {
	Key      *datastore.Key `form:"-" json:"-" binding:"-"  datastore:"__key__"`
	ID       int    `json:"id"`
	Name     string `json:"name"`
	IsActive bool   `json:"isActive"`
}
