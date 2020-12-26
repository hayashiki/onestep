import {Issue} from "@/generated/graphql";
import {FC, memo} from "react";
import {Draggable} from "react-beautiful-dnd";
import {Box, Grid} from "@material-ui/core";

type Props = {
    issue: Pick<Issue, "id" | "title" | "updatedAt" | "closed">
    index: number
}

// 3->4へ移動した
// data: {destinationColumnID: "2", initialPosition: 1, finalPosition: 0}
// destinationColumnID: "2"
// finalPosition: 0
// initialPosition: 1

//where: {issueID: "4", columnID: "2"}
// columnID: "2"
// issueID: "4"

const ColumnIssueItem: FC<Props> = ({ issue, index }) => {
    console.log("issue", issue)
    console.log("index", index)

    return (
        <Draggable draggableId={issue.id} index={index}>
            {(provided, { isDragging}) => (
                <Grid
                    item
                    xs={12}
                    innerRef={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Box
                        p={2}
                        bgcolor="background.paper"
                        borderRadius="borderRadius"
                        border={isDragging ? 2 : 1}
                        borderColor={isDragging ? "grey.700" : "grey.500"}
                        boxShadow={isDragging ? 5 : 0}
                    >
                        <Box
                            display="flex" alignItems="center"
                        >
                            {issue.title}
                        </Box>

                    </Box>
                </Grid>

            )}
        </Draggable>
    )
}


export default memo(ColumnIssueItem)
