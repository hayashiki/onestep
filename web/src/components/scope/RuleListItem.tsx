import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
    Avatar,
    Chip,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { SCOPE } from "./Rules";
import exp from "constants";
import {ScopeRule} from "@/generated/graphql";

const SET_SCOPE = gql`
    mutation SetScope($scope: [ScopeRuleInput!]!) {
        setScope(scope: $scope) {
            url
        }
    }
`;

type Props = {
    scope: any
    rule: ScopeRule
    index: number
}

const RuleListItem:React.FC<Props> = ({ scope, rule, index }) => {
    const client = useApolloClient();

    const [setScope, { loading }] = useMutation(SET_SCOPE, {
        update(_, {data: { setScope }}) {
            client.writeQuery({
                query: SCOPE,
                data: { scope: setScope}
            })
        }
    })

    const handleDelete = (index: number) => {
        const clone = [...scope]
        clone.splice(index, 1)
        setScope({
            variables: {
                scope: clone.map(({url}) => ({url}))
            }
        })
    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <CodeIcon />
                </Avatar>
            </ListItemAvatar>
            <RuleListItemText rule={rule} />
        </ListItem>
    )
}

interface ScopeRuleProps {
    scopeRule: ScopeRule
}

// @ts-ignore
const RuleListItemText: React.FC<ScopeRuleProps> = ({ scopeRule }) => {
    let text: JSX.Element;

    if (scopeRule.url) {
        text = <code>{scopeRule}</code>;
    }

    // TODO: Parse and handle rule.header and rule.body.

    // @ts-ignore
    return <ListItemText>{text}</ListItemText>;
}

export default RuleListItem
