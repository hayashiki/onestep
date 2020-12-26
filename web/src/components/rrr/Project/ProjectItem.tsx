import {ProjectFragmentFragment} from "@/generated/graphql";
import {FC, memo} from "react";
import { Box, Typography, Link } from "@material-ui/core";

type Props = {
    project: ProjectFragmentFragment
}

const ProjectItem: FC<Props> = ({ project}) => {
    const { id } = project
    
    // const color = useStatusColor
    return (
        <Box>
            {id}
        </Box>
    )
}

export default memo(ProjectItem);
