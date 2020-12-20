import { useEffect } from "react";

const AuthCallback: React.FC = (): null => {
    useEffect((): void => {
        const params = new URLSearchParams(window.location.search);
        fetch(
            "/api/auth/github/callback", {
                method: "POST",
                body: JSON.stringify({
                    code: params.get("code"),
                    state: params.get("state"),
                }),
            },
        ).then((res: Response): void => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        }).catch((err: Error): void => {
            window.console.error(err.message);
            // TODO
        }).finally((): void => {
            // window.location.replace("/");
        });
    }, []);

    return null;
};

export default AuthCallback;
