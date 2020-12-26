import {NextPage} from "next";
import {useRouter} from "next/router";
import {useProjectQuery} from "@/generated/graphql";
import {Grid, Typography} from "@material-ui/core";
import React from "react";
import ColumnList from "@/components/rrr/Project/ColumnList";

type Params = {
    projectID: string
}

const ProjectView: NextPage<{id: string}> = ({id}) => {
    console.log("id is", id)
    const idtemp = `5069549128908800`
    const { data, loading } = useProjectQuery({
        variables: {
            where: { id: idtemp }
        }
    })

    const renderProject = () => {
        if (loading) {
            return <div>loading</div>
        }

        if (!data?.project) {
            return <Typography>No Project...</Typography>;
        }

        const {
            id,
            name,
            columns
        } = data.project

        return (
            <>
                <Grid container justify="space-between" alignItems="flex-start">
                    <Typography variant="h5" gutterBottom>
                        {name}
                    </Typography>
                </Grid>
                <ColumnList projectID={id} columns={columns} />
            </>
        )

    }
    return (
        <>
            {renderProject()}
        </>
    )
}

ProjectView.getInitialProps = ({ query }) => {
    return {
        id: query.id as string,
    };
};

export default ProjectView
