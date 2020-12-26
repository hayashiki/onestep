import {ProjectsQuery} from "@/generated/graphql";
import {Box, BoxProps} from "@material-ui/core";
import React from "react";
import ProjectItem from "@/components/rrr/Project/ProjectItem";

type Props = ProjectsQuery & BoxProps;

const ProjectList: React.FC<Props> = ({ projects, ...props }) => {
    const list = projects.map(p => {
        return p && <ProjectItem key={p.id} project={p} />
    })

    return (
        <Box mb={5} {...props}>
            {list}
        </Box>
    )
}

export default ProjectList;
