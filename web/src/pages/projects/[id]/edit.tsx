import React, {SyntheticEvent, useCallback, useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from "@material-ui/core/TextField";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { GithubLoginButton } from "react-social-login-buttons";
import {NextPage} from "next";
import {useUpdateProjectMutation} from "@/generated/graphql";
import ProjectView from "@/pages/projects/[id]";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3,0,2),
    },
    or: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    github: {
        width: '100% !important', // why not important?
        margin: '0 !important',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    githubText: {
        fontSize: '14px !important',
        fontWeight: 'bold',
    }
}));

type State = {
    name: string
}

const initialState = {
    name: '',
}

const ProjectEditPage: NextPage<{ id: string }> = ({ id }) => {
    console.log("id is", id)
    const classes = useStyles();
    const [state, setState] = useState<State>(initialState);

    const [updateProject, { data, loading }] = useUpdateProjectMutation()

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setState(s => ({...s, [name]: value}))
    },[])

    const handleSubmit = useCallback(async (e: SyntheticEvent) => {
        e.preventDefault()
        const { name } = state
        try {
            const res = await console.log("")
            updateProject({
                variables: {
                    input: {
                        id: id,
                        name: name
                    }
                }
                // onCompleted: handleMutationCompleted
            })

        } catch (e) {

        }
    }, [state])

    const [submitting, setSubmitting] = useState(false)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Editting {state.name}
                </Typography>

                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                value={state.name}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>

                    <Grid item xs={12}>
                        <div className={classes.or}>or</div>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="#">
                        Hayashiki
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Container>
    )
}

ProjectEditPage.getInitialProps = ({ query }) => {
    return {
        id: query.id as string,
    };
};

export default ProjectEditPage
