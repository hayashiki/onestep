import React, {useCallback, useState} from "react";
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))


const SignIn: React.FC = () => {
    const { paper, avatar, form, submit } = useStyles()
    const [submitting, setSubmitting] = useState(false)
    const onClickLogin = useCallback((): void => {
        if (submitting) {
            return;
        }


        setSubmitting(true);
        fetch(
            "http://localhost:8080/auth/github/invoke",
        ).then((res: Response): Promise<string> => {
            if (res.ok) {
                return res.text();
            } else {
                throw new Error(res.statusText);
            }
        }).then((redirectUrl): void => {
            window.location.replace(redirectUrl);
        }).catch((err: Error): void => {
            window.console.error(err.message);
        }).finally((): void => {
            // window.location.replace("https://github.com/login/oauth/authorize?client_id=02f589214dcdf3683816&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fgithub%2Fcallback&response_type=code&state=660aabcbb4d9e241")
            setSubmitting(false);
        });
    }, [submitting]);

    return <div className={paper}>
        <Button disabled={submitting} onClick={onClickLogin}>
            Sign in with GitHub
        </Button>
    </div>
}

export default SignIn
