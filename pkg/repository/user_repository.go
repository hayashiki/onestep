package repository

import (
	"cloud.google.com/go/datastore"
	"github.com/hayashiki/onestep/pkg/model"
	"google.golang.org/api/iterator"

	"context"
	"fmt"
)

//go:generate mockgen -source user_repository.go -destination mock_repo/user_repository.go
type UserRepository interface {
	List(cursor string, limit int) ([]*model.User, string, error)
	Put(user *model.User) error
}

type userRepository struct {
	dsClient *datastore.Client
}

func (r *userRepository) List(cursor string, limit int) ([]*model.User, string, error) {
	q := datastore.NewQuery(model.UserKind)
	if cursor != "" {
		dsCursor, err := datastore.DecodeCursor(cursor)
		if err != nil {

		}
		q = q.Start(dsCursor)
	}
	q = q.Limit(limit)

	var el []*model.User
	ctx := context.Background()
	it := r.dsClient.Run(ctx, q)
	for {
		var e model.User
		if _, err := it.Next(&e); err == iterator.Done {
			break
		} else if err != nil {
			fmt.Errorf("fail err=%v", err)
		}
		el = append(el, &e)
	}

	nextCursor, err := it.Cursor()
	if err != nil {
		return nil, "", err
	}

	return el, nextCursor.String(), nil
}

func (r *userRepository) key(id int64) *datastore.Key {
	return datastore.IDKey(model.UserKind, id, nil)
}

func NewUserRepository(client *datastore.Client) UserRepository {
	return &userRepository{dsClient: client}
}

func (r *userRepository) Put(user *model.User) error {
	ctx := context.Background()
	_, err := r.dsClient.Put(ctx, r.key(user.ID), user)
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
