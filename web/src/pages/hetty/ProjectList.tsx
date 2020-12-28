import React, { useState } from "react";
import {NextPage} from "next";
import {
    Project,
    ProjectFragmentFragment,
    useCloseProjectMutation,
    useDeleteProjectMutation, useOpenProjectMutation,
    useProjectsQuery
} from "@/generated/graphql";
import {
    Button,
    CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText, Snackbar,
    Tooltip
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import LaunchIcon from "@material-ui/icons/Launch";
import Editor from "@/components/hetty/reqlog/Editor";

const ProjectList: NextPage = () => {

    const { data, loading, error} = useProjectsQuery()

    console.log(data?.projects)

    const [deleteProjId, setDeleteProjId] = useState<string>("")
    const [deleteProjName, setDeleteProjName] = useState<string>("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const handleDeleteButtonClick = (project: ProjectFragmentFragment | undefined) => {
        if (project !== undefined) {
            setDeleteProjId(project.id)
            setDeleteProjName(project.name)
            setDeleteDialogOpen(true)
        }
    }
    const [deleteProject, { loading: delLoading, error: delError}] = useDeleteProjectMutation({
        errorPolicy: 'all', // what?
        onError: (error) => {
            console.log(error)
        },
        update(cache) {
            cache.modify({
                fields: {
                    projects(_, { DELETE }) {
                        console.log("pass", DELETE)
                        return DELETE
                    }
                }
            })
            setDeleteDialogOpen(false);
            setDeleteNotifOpen(true);
        },
    })
    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = () => {
        deleteProject({
            variables: {
                id: deleteProjId
            }
        })
    }
    const [deleteNotifOpen, setDeleteNotifOpen] = useState(false);
    const handleCloseDeleteNotif = (_: any, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setDeleteNotifOpen(false);
    };

    const [closeProject, {error: closeProjErr}] = useCloseProjectMutation({

    })

    const [openProject, {loading: openProjLoading, error: openProjErr}] = useOpenProjectMutation({

    })

    return (
        <>
            <Editor content={"response.body"} contentType={"html"} />
            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>
                    Delete project “<strong>{deleteProjName}</strong>”?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deleting a project permanently removes its database file from disk.
                        This action is irreversible.
                    </DialogContentText>
                    <DialogActions>
                        <Button>

                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            disabled={delLoading}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={deleteNotifOpen}
                autoHideDuration={3000}
                onClose={handleCloseDeleteNotif}
            >
                <Alert onClose={handleCloseDeleteNotif} severity="info">
                    Project <strong>{deleteProjName}</strong> was deleted.
                </Alert>
            </Snackbar>
            {loading && <CircularProgress />}
            {error && (
                <Alert severity="error">
                    Error fetching projects: {error.message}
                </Alert>
            )}
            {data?.projects?.length && (
                <List>
                    {data?.projects.map((project) => (
                        <ListItem key={project?.id}>
                            <ListItemText>
                                {project?.name} {project?.isActive && <em>(Active)</em>}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                {project?.isActive && (
                                    <Tooltip title="Close project">
                                        <IconButton onClick={() => closeProject()}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {!project?.isActive && (
                                    <Tooltip title="Open project">
                                        <span>
                                          <IconButton
                                              disabled={openProjLoading || loading}
                                              onClick={() =>
                                                  openProject({
                                                      variables: { id: project?.id as string },
                                                  })
                                              }
                                          >
                                              <LaunchIcon />
                                          </IconButton>
                                        </span>
                                    </Tooltip>
                                )}
                                <Tooltip title="Delete Project">
                                    <span>
                                        <IconButton>
                                            <DeleteIcon
                                                onClick={() => handleDeleteButtonClick(project as Project)}
                                            />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}
            {data?.projects.length === 0 && (
                <Alert severity="info">
                    There are no projects. Create one to get started.
                </Alert>
            )}
        </>
    )
}

export default ProjectList
