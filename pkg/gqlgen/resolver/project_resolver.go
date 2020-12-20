package resolver

import (
	"context"
	"github.com/hayashiki/onestep/pkg/gqlgen/dto"
	"github.com/hayashiki/onestep/pkg/model"
)

func (r *projectResolver) ID(ctx context.Context, obj *model.Project) (int, error) {
	panic("not implemented")
}

func (r *mutationResolver) CreateProject(ctx context.Context, input dto.CreateProjectInput) (*model.Project, error) {
	project := &model.Project{
		Name:     input.Name,
		IsActive: true,
	}
	err := r.projectRepo.Put(project)
	if err != nil {
		return nil, err
	}
	return project, nil
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
	projects, nextCursor, err := r.projectRepo.List(*cursor, 100)
	if err != nil {
		return nil, err
	}

	return &dto.ProjectConnection{
		Cursor: nextCursor,
		HasMore: len(projects) != 0,
		Projects: projects,
	}, nil
}

func (r *userResolver) ID(ctx context.Context, obj *model.User) (int, error) {
	panic("not implemented")
}
