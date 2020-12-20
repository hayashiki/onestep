package repository

import (
	"cloud.google.com/go/datastore"
	"github.com/hayashiki/onestep/pkg/model"
	"google.golang.org/api/iterator"

	"context"
	"fmt"
)

//go:generate mockgen -source user_repository.go -destination mock_repo/user_repository.go
type ProjectRepository interface {
	List(cursor string, limit int) ([]*model.Project, string, error)
	Put(project *model.Project) error
}

type projectRepository struct {
	dsClient *datastore.Client
}

func (r *projectRepository) List(cursor string, limit int) ([]*model.Project, string, error) {
	q := datastore.NewQuery(model.ProjectKind)
	if cursor != "" {
		dsCursor, err := datastore.DecodeCursor(cursor)
		if err != nil {

		}
		q = q.Start(dsCursor)
	}
	q = q.Limit(limit)

	var el []*model.Project
	ctx := context.Background()
	it := r.dsClient.Run(ctx, q)
	for {
		var e model.Project
		if _, err := it.Next(&e); err == iterator.Done {
			break
		} else if err != nil {
			fmt.Errorf("fail err=%v", err)
		}
		e.ID = int(e.Key.ID)
		el = append(el, &e)
	}

	nextCursor, err := it.Cursor()
	if err != nil {
		return nil, "", err
	}

	return el, nextCursor.String(), nil
}

func (r *projectRepository) key() *datastore.Key {
	return datastore.IncompleteKey(model.ProjectKind, nil)
}

func NewProjectRepository(client *datastore.Client) ProjectRepository {
	return &projectRepository{dsClient: client}
}

func (r *projectRepository) Put(project *model.Project) error {
	ctx := context.Background()
	_, err := r.dsClient.Put(ctx, r.key(), project)
	if err != nil {
		return err
	}
	return nil
}


//func (r *userRepository) Get(ctx context.Context, id string) (*user.User, error) {
//	dst := &model.User{}
//	err := r.dsClient.Get(ctx, repo.key(id), dst)
//	if err != nil {
//		return nil, err
//	}
//	return dst, nil
//}
