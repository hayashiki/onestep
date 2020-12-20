package resolver

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

import (
	"github.com/hayashiki/onestep/pkg/gqlgen/exec"
	"github.com/hayashiki/onestep/pkg/repository"
)

type Resolver struct{
	userRepo repository.UserRepository
	projectRepo repository.ProjectRepository
}

func NewResolver(
	userRepo repository.UserRepository,
	projectRepo repository.ProjectRepository,
) *Resolver {
	return &Resolver{
		userRepo,
		projectRepo,
	}
}

// Mutation returns exec.MutationResolver implementation.
func (r *Resolver) Mutation() exec.MutationResolver { return &mutationResolver{r} }

// Query returns exec.QueryResolver implementation.
func (r *Resolver) Query() exec.QueryResolver { return &queryResolver{r} }

// User returns exec.UserResolver implementation.
func (r *Resolver) User() exec.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
type projectResolver struct{ *Resolver }
