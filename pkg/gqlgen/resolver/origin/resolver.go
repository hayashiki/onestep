package resolver

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

import (
	"context"

	"github.com/hayashiki/onestep/pkg/gqlgen/dto"
	"github.com/hayashiki/onestep/pkg/gqlgen/exec"
	"github.com/hayashiki/onestep/pkg/model"
)

type Resolver struct{}

func (r *mutationResolver) CreateProject(ctx context.Context, input dto.CreateProjectInput) (*model.Project, error) {
	panic("not implemented")
}

func (r *mutationResolver) OpenProject(ctx context.Context, name string) (*model.Project, error) {
	panic("not implemented")
}

func (r *mutationResolver) UpdateProject(ctx context.Context, input dto.UpdateProjectInput) (*model.Project, error) {
	panic("not implemented")
}

func (r *mutationResolver) CloseProject(ctx context.Context) (*dto.CloseProjectResult, error) {
	panic("not implemented")
}

func (r *mutationResolver) DeleteProject(ctx context.Context, name string) (*dto.DeleteProjectResult, error) {
	panic("not implemented")
}

func (r *queryResolver) ActiveProject(ctx context.Context) (*model.Project, error) {
	panic("not implemented")
}

func (r *queryResolver) Projects(ctx context.Context, cursor *string) (*dto.ProjectConnection, error) {
	panic("not implemented")
}

func (r *userResolver) ID(ctx context.Context, obj *model.User) (int, error) {
	panic("not implemented")
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
