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
  Regexp: any;
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  activeProject?: Maybe<Project>;
  projects: Array<Maybe<Project>>;
  project?: Maybe<Project>;
  scope: Array<ScopeRule>;
  issues: Array<Maybe<Issue>>;
  issue?: Maybe<Issue>;
};


export type QueryProjectsArgs = {
  cursor?: Maybe<Scalars['String']>;
};


export type QueryProjectArgs = {
  where?: Maybe<FindInput>;
};


export type QueryIssuesArgs = {
  filters: Filters;
};


export type QueryIssueArgs = {
  where?: Maybe<FindInput>;
};

export type FindInput = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
  openProject?: Maybe<Project>;
  updateProject?: Maybe<Project>;
  closeProject: CloseProjectResult;
  deleteProject: DeleteProjectResult;
  setScope: Array<ScopeRule>;
  rearrangeColumn: Scalars['Boolean'];
  rearrangeIssue: Scalars['Boolean'];
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationOpenProjectArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationSetScopeArgs = {
  scope: Array<ScopeRuleInput>;
};


export type MutationRearrangeColumnArgs = {
  data: RearrangeColumnInput;
  where: RearrangeColumnFindInput;
};


export type MutationRearrangeIssueArgs = {
  data: RearrangeIssueInput;
  where: RearrangeIssueFindInput;
};

export type ScopeRule = {
  __typename?: 'ScopeRule';
  url?: Maybe<Scalars['Regexp']>;
  header?: Maybe<ScopeHeader>;
  body?: Maybe<Scalars['Regexp']>;
};

export type ScopeRuleInput = {
  url?: Maybe<Scalars['Regexp']>;
  header?: Maybe<ScopeHeaderInput>;
  body?: Maybe<Scalars['Regexp']>;
};

export type ScopeHeader = {
  __typename?: 'ScopeHeader';
  key?: Maybe<Scalars['Regexp']>;
  value?: Maybe<Scalars['Regexp']>;
};

export type ScopeHeaderInput = {
  key?: Maybe<Scalars['Regexp']>;
  value?: Maybe<Scalars['Regexp']>;
};


export type Column = {
  __typename?: 'Column';
  id: Scalars['ID'];
  issues: Array<Maybe<Issue>>;
  title: Scalars['String'];
};

export type RearrangeColumnFindInput = {
  columnID: Scalars['ID'];
  projectID: Scalars['ID'];
};

export type RearrangeColumnInput = {
  finalPosition: Scalars['Float'];
  initialPosition: Scalars['Float'];
};

export type RearrangeIssueFindInput = {
  columnID: Scalars['ID'];
  issueID: Scalars['ID'];
};

export type RearrangeIssueInput = {
  destinationColumnID: Scalars['ID'];
  finalPosition: Scalars['Float'];
  initialPosition: Scalars['Float'];
};

export type Issue = {
  __typename?: 'Issue';
  id: Scalars['ID'];
  closed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description: Scalars['String'];
  projects: Array<Maybe<Project>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type CreateIssueInput = {
  description: Scalars['String'];
  projectIDs: Array<Maybe<Scalars['ID']>>;
  title: Scalars['String'];
};

export type Filters = {
  sort?: Maybe<Sort>;
  status?: Maybe<Status>;
};

export enum Sort {
  CreatedAsc = 'CREATED_ASC',
  CreatedDesc = 'CREATED_DESC',
  UpdatedDesc = 'UPDATED_DESC'
}

export enum Status {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export enum EntityType {
  Issue = 'ISSUE',
  Project = 'PROJECT'
}

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  name: Scalars['String'];
  isActive: Scalars['Boolean'];
  closed: Scalars['Boolean'];
  columns: Array<Column>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  cursor: Scalars['String'];
  hasMore: Scalars['Boolean'];
  projects: Array<Maybe<Project>>;
};

export type CreateProjectInput = {
  name: Scalars['String'];
};

export type UpdateProjectInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CloseProjectResult = {
  __typename?: 'CloseProjectResult';
  success: Scalars['Boolean'];
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

export type ProjectFragmentFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'name' | 'title' | 'description' | 'closed' | 'createdAt' | 'updatedAt' | 'isActive'>
);

export type IssueFragmentFragment = (
  { __typename?: 'Issue' }
  & Pick<Issue, 'id' | 'title' | 'description' | 'closed' | 'createdAt' | 'updatedAt'>
);

export type ColumnFragmentFragment = (
  { __typename?: 'Column' }
  & Pick<Column, 'id' | 'title'>
  & { issues: Array<Maybe<(
    { __typename?: 'Issue' }
    & Pick<Issue, 'id' | 'title' | 'closed' | 'updatedAt'>
  )>> }
);

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<Maybe<(
    { __typename?: 'Project' }
    & ProjectFragmentFragment
  )>> }
);

export type ProjectQueryVariables = Exact<{
  where: FindInput;
}>;


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & { columns: Array<(
      { __typename?: 'Column' }
      & ColumnFragmentFragment
    )> }
    & ProjectFragmentFragment
  )> }
);

export type IssuesQueryVariables = Exact<{
  filters: Filters;
}>;


export type IssuesQuery = (
  { __typename?: 'Query' }
  & { issues: Array<Maybe<(
    { __typename?: 'Issue' }
    & IssueFragmentFragment
  )>> }
);

export type RearrangeColumnMutationVariables = Exact<{
  where: RearrangeColumnFindInput;
  data: RearrangeColumnInput;
}>;


export type RearrangeColumnMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'rearrangeColumn'>
);

export type RearrangeIssueMutationVariables = Exact<{
  where: RearrangeIssueFindInput;
  data: RearrangeIssueInput;
}>;


export type RearrangeIssueMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'rearrangeIssue'>
);

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'isActive'>
  )> }
);

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & { deleteProject: (
    { __typename?: 'DeleteProjectResult' }
    & Pick<DeleteProjectResult, 'success'>
  ) }
);

export type CloseProjectMutationVariables = Exact<{ [key: string]: never; }>;


export type CloseProjectMutation = (
  { __typename?: 'Mutation' }
  & { closeProject: (
    { __typename?: 'CloseProjectResult' }
    & Pick<CloseProjectResult, 'success'>
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'isActive'>
  )> }
);

export type OpenProjectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OpenProjectMutation = (
  { __typename?: 'Mutation' }
  & { openProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'isActive'>
  )> }
);

export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  id
  name
  title
  description
  closed
  createdAt
  updatedAt
  isActive
}
    `;
export const IssueFragmentFragmentDoc = gql`
    fragment IssueFragment on Issue {
  id
  title
  description
  closed
  createdAt
  updatedAt
}
    `;
export const ColumnFragmentFragmentDoc = gql`
    fragment ColumnFragment on Column {
  id
  title
  issues {
    id
    title
    closed
    updatedAt
  }
}
    `;
export const ProjectsDocument = gql`
    query Projects {
  projects {
    ...ProjectFragment
  }
}
    ${ProjectFragmentFragmentDoc}`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const ProjectDocument = gql`
    query Project($where: FindInput!) {
  project(where: $where) {
    ...ProjectFragment
    columns {
      ...ColumnFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ColumnFragmentFragmentDoc}`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const IssuesDocument = gql`
    query Issues($filters: Filters!) {
  issues(filters: $filters) {
    ...IssueFragment
  }
}
    ${IssueFragmentFragmentDoc}`;

/**
 * __useIssuesQuery__
 *
 * To run a query within a React component, call `useIssuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssuesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useIssuesQuery(baseOptions: Apollo.QueryHookOptions<IssuesQuery, IssuesQueryVariables>) {
        return Apollo.useQuery<IssuesQuery, IssuesQueryVariables>(IssuesDocument, baseOptions);
      }
export function useIssuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IssuesQuery, IssuesQueryVariables>) {
          return Apollo.useLazyQuery<IssuesQuery, IssuesQueryVariables>(IssuesDocument, baseOptions);
        }
export type IssuesQueryHookResult = ReturnType<typeof useIssuesQuery>;
export type IssuesLazyQueryHookResult = ReturnType<typeof useIssuesLazyQuery>;
export type IssuesQueryResult = Apollo.QueryResult<IssuesQuery, IssuesQueryVariables>;
export const RearrangeColumnDocument = gql`
    mutation RearrangeColumn($where: RearrangeColumnFindInput!, $data: RearrangeColumnInput!) {
  rearrangeColumn(where: $where, data: $data)
}
    `;
export type RearrangeColumnMutationFn = Apollo.MutationFunction<RearrangeColumnMutation, RearrangeColumnMutationVariables>;

/**
 * __useRearrangeColumnMutation__
 *
 * To run a mutation, you first call `useRearrangeColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRearrangeColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rearrangeColumnMutation, { data, loading, error }] = useRearrangeColumnMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRearrangeColumnMutation(baseOptions?: Apollo.MutationHookOptions<RearrangeColumnMutation, RearrangeColumnMutationVariables>) {
        return Apollo.useMutation<RearrangeColumnMutation, RearrangeColumnMutationVariables>(RearrangeColumnDocument, baseOptions);
      }
export type RearrangeColumnMutationHookResult = ReturnType<typeof useRearrangeColumnMutation>;
export type RearrangeColumnMutationResult = Apollo.MutationResult<RearrangeColumnMutation>;
export type RearrangeColumnMutationOptions = Apollo.BaseMutationOptions<RearrangeColumnMutation, RearrangeColumnMutationVariables>;
export const RearrangeIssueDocument = gql`
    mutation RearrangeIssue($where: RearrangeIssueFindInput!, $data: RearrangeIssueInput!) {
  rearrangeIssue(where: $where, data: $data)
}
    `;
export type RearrangeIssueMutationFn = Apollo.MutationFunction<RearrangeIssueMutation, RearrangeIssueMutationVariables>;

/**
 * __useRearrangeIssueMutation__
 *
 * To run a mutation, you first call `useRearrangeIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRearrangeIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rearrangeIssueMutation, { data, loading, error }] = useRearrangeIssueMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRearrangeIssueMutation(baseOptions?: Apollo.MutationHookOptions<RearrangeIssueMutation, RearrangeIssueMutationVariables>) {
        return Apollo.useMutation<RearrangeIssueMutation, RearrangeIssueMutationVariables>(RearrangeIssueDocument, baseOptions);
      }
export type RearrangeIssueMutationHookResult = ReturnType<typeof useRearrangeIssueMutation>;
export type RearrangeIssueMutationResult = Apollo.MutationResult<RearrangeIssueMutation>;
export type RearrangeIssueMutationOptions = Apollo.BaseMutationOptions<RearrangeIssueMutation, RearrangeIssueMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    id
    name
    isActive
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, baseOptions);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: ID!) {
  deleteProject(id: $id) {
    success
  }
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, baseOptions);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const CloseProjectDocument = gql`
    mutation CloseProject {
  closeProject {
    success
  }
}
    `;
export type CloseProjectMutationFn = Apollo.MutationFunction<CloseProjectMutation, CloseProjectMutationVariables>;

/**
 * __useCloseProjectMutation__
 *
 * To run a mutation, you first call `useCloseProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeProjectMutation, { data, loading, error }] = useCloseProjectMutation({
 *   variables: {
 *   },
 * });
 */
export function useCloseProjectMutation(baseOptions?: Apollo.MutationHookOptions<CloseProjectMutation, CloseProjectMutationVariables>) {
        return Apollo.useMutation<CloseProjectMutation, CloseProjectMutationVariables>(CloseProjectDocument, baseOptions);
      }
export type CloseProjectMutationHookResult = ReturnType<typeof useCloseProjectMutation>;
export type CloseProjectMutationResult = Apollo.MutationResult<CloseProjectMutation>;
export type CloseProjectMutationOptions = Apollo.BaseMutationOptions<CloseProjectMutation, CloseProjectMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
    isActive
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, baseOptions);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const OpenProjectDocument = gql`
    mutation OpenProject($id: ID!) {
  openProject(id: $id) {
    id
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOpenProjectMutation(baseOptions?: Apollo.MutationHookOptions<OpenProjectMutation, OpenProjectMutationVariables>) {
        return Apollo.useMutation<OpenProjectMutation, OpenProjectMutationVariables>(OpenProjectDocument, baseOptions);
      }
export type OpenProjectMutationHookResult = ReturnType<typeof useOpenProjectMutation>;
export type OpenProjectMutationResult = Apollo.MutationResult<OpenProjectMutation>;
export type OpenProjectMutationOptions = Apollo.BaseMutationOptions<OpenProjectMutation, OpenProjectMutationVariables>;