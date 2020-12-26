import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
    Box,
    Button,
    CircularProgress,
    createStyles,
    FormControl,
    FormControlLabel,
    FormLabel,
    makeStyles,
    Radio,
    RadioGroup,
    TextField,
    Theme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Alert } from "@material-ui/lab";
import React from "react";
import { SCOPE } from "./Rules";


