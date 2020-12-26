import {useProjectsLazyQuery} from "@/generated/graphql";
import React, {useCallback, useEffect} from "react";
import {Typography} from "@material-ui/core";
import ProjectList from "@/components/rrr/Project/ProjectList";
import {NextPage} from "next";

const ProjectPage: NextPage = () => {
    // nextではpassword resetつかう
    // const { search } = useLocation();
    const [getProjects, { data, loading }] = useProjectsLazyQuery()

    useEffect(() => {
        getProjects(
            // {variables: { filters }
        );
    }, [getProjects]);

    const renderList = useCallback(() => {
        if (loading) {
            return <div>loading</div>
        }

        if (!data || !data.projects.length) {
            return <Typography>No projects found...</Typography>
        }
        return <ProjectList projects={data.projects} />
        }, [data, loading])
    return (
        <>
            {renderList()}
        </>
    )
}

export default ProjectPage
