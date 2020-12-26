import {gql, useApolloClient, useMutation} from "@apollo/client";
import {
    Box,
    Button,
    CircularProgress,
    createStyles,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, {useCallback, useState} from "react";
import {useOpenProjectMutation} from "@/generated/graphql";
import {setState} from "expect/build/jestMatchersObject";

type State = {
    name: string
}

const initialState = {
    name: '',
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        projectName: {
            marginTop: -6,
            marginRight: theme.spacing(2),
        },
        button: {
            marginRight: theme.spacing(2),
        },
    })
);

function NewProject(): JSX.Element {
    const client = useApolloClient()
    const classes = useStyles();
    const [state, setState] = useState<State>(initialState);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setState(s => ({...s, [name]: value}))
    },[])

    const clearValue = useCallback(() => {
        return setState(() => initialState);
    }, [setState]);

    const handleMutationCompleted = useCallback(async () => {

        client.cache.modify({
            fields: {
                projects(_, { DELETE }) {
                    client.cache.writeFragment({
                        id: "hhhhhhh",
                        data: "hhhhhhh",
                        fragment: gql`
                            fragment OpenProject on Project {
                                name
                                isActive
                            }
                        `,
                    });
                    return DELETE;
                },
            },
        });


        clearValue()
    }, [clearValue]);

    const [openProject, { error, loading }] = useOpenProjectMutation({
            variables: {
                input: {
                    name: state.name
                }
            },
            onCompleted: handleMutationCompleted
        }
    )

    const handleNewProjectForm = (e: React.SyntheticEvent) => {
        e.preventDefault();
        openProject();
    };

    return (
        <div>
            <Box mb={3}>
                <Typography variant="h6">New project</Typography>
            </Box>
            <form onSubmit={handleNewProjectForm} autoComplete="off">
                <TextField
                    className={classes.projectName}
                    color="secondary"
                    value={state.name}
                    name="name"
                    label="Project name"
                    placeholder="Project name…"
                    error={Boolean(error)}
                    helperText={error && error.message}
                    onChange={handleChange}
                />
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={22} /> : <AddIcon />}
                >
                    Create & open project
                </Button>
            </form>
        </div>
    );
}

export default NewProject;
