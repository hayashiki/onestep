import { gql, useQuery } from "@apollo/client";
import {
    CircularProgress,
    createStyles,
    List,
    makeStyles,
    Theme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import RuleListItem from "./RuleListItem";
import {ScopeRule} from "@/generated/graphql";

export const SCOPE = gql`
    query Scope {
        scope {
            url
        }
    }
`;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rulesList: {
            backgroundColor: theme.palette.background.paper,
        },
    })
);

const Rules: React.FC = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(SCOPE)

    return (
        <>
            {loading && <CircularProgress />}
            {error && (
                <Alert severity="error">Error fetching scope: {error.message}</Alert>
            )}
            {data?.scope.length > 0 && (
                <List className={classes.rulesList}>
                </List>
            )}

        </>
    )
}

export default Rules
