import React from "react";
import Layout, {Page} from "@/components/Layout";
import {Box, Divider, Grid, Typography} from "@material-ui/core";
import {NextPage} from "next";

const Index: NextPage = () => {
    return (
        <Layout page={Page.Scope} title="Scope">
            <Box p={4}>
                <Box mb={3}>
                    <Typography paragraph>
                        Scope rules are used by various modules in Hetty and can influence
                        their behavior. For example: the Proxy logs module can match incoming
                        requests against scope rules and decide its behavior (e.g. log or
                        bypass) based on the outcome of the match. All scope configuration is
                        stored per project.
                    </Typography>
                </Box>
            </Box>
            <Box my={4}>
                <Divider />
            </Box>
            <Grid container>
                <Grid>
                    xxx
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Index
