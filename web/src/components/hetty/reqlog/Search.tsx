import React from "react";
import {Box, Paper} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

export interface SearchFilter {
    onlyInScope: boolean
}

const Search: React.FC = () => {
    return (
        <Box>
        </Box>
    )
}

function Error(props: { prefix: string; error?: Error }) {
    if (!props.error) return null;

    return (
        <Box mb={4}>
            <Alert severity="error">
                {props.prefix}: {props.error.message}
            </Alert>
        </Box>
    );
}

export default Search
