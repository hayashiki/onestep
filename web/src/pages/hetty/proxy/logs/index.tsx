import {NextPage} from "next";
import Layout, {Page} from "@/components/Layout";
import LogsOverviews from "@/components/hetty/reqlog/LogsOverview";
import React from "react";
import {Box} from "@material-ui/core";

const ProxyLogs: NextPage = () => {
    return (
        <Layout title="Proxy logs" page={Page.ProxyLogs}>
            <Box mb={2}>
                Search
            </Box>
            <LogsOverviews />
        </Layout>
    )
}

export default ProxyLogs
