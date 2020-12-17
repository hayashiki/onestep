import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  activeProject?: Maybe<Project>;
  projects: Array<Project>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
  updateProject?: Maybe<Project>;
  closeProject: CloseProjectResult;
  deleteProject: DeleteProjectResult;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationDeleteProjectArgs = {
  name: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  name: Scalars['String'];
  isActive: Scalars['Boolean'];
};

export type CreateProjectInput = {
  name: Scalars['String'];
};

export type UpdateProjectInput = {
  name: Scalars['String'];
};

export type CloseProjectResult = {
  __typename?: 'CloseProjectResult';
  name: Scalars['String'];
};

export type DeleteProjectResult = {
  __typename?: 'DeleteProjectResult';
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type UserUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type OpenProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type OpenProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'name' | 'isActive'>
  )> }
);


export const OpenProjectDocument = gql`
    mutation OpenProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    name
    isActive
  }
}
    `;
export type OpenProjectMutationFn = Apollo.MutationFunction<OpenProjectMutation, OpenProjectMutationVariables>;

/**
 * __useOpenProjectMutation__
 *
 * To run a mutation, you first call `useOpenProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openProjectMutation, { data, loading, error }] = useOpenProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOpenProjectMutation(baseOptions?: Apollo.MutationHookOptions<OpenProjectMutation, OpenProjectMutationVariables>) {
        return Apollo.useMutation<OpenProjectMutation, OpenProjectMutationVariables>(OpenProjectDocument, baseOptions);
      }
export type OpenProjectMutationHookResult = ReturnType<typeof useOpenProjectMutation>;
export type OpenProjectMutationResult = Apollo.MutationResult<OpenProjectMutation>;
export type OpenProjectMutationOptions = Apollo.BaseMutationOptions<OpenProjectMutation, OpenProjectMutationVariables>;