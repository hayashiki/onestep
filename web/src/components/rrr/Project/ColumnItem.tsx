import {ColumnFragmentFragment} from "@/generated/graphql";
import React, {FC, memo} from "react";
import {Draggable} from "react-beautiful-dnd";
import {Box, Grid, Typography} from "@material-ui/core";
import ColumnIssueList from "@/components/rrr/Project/ColumnIssueList";

type Props = {
    column: ColumnFragmentFragment;
    index: number;
};

const ColumnItem: FC<Props> = ({ column, index }) => {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided, { isDragging }) => {
                return (
                    <Grid
                        item
                        xs
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Box
                            p={1.5}
                            bgcolor="background.paper"
                            height="100%"
                            borderRadius="borderRadius"
                            boxShadow={isDragging ? 5 : 0}
                            borderColor={isDragging ? "grey.700" : "grey.500"}
                            border={isDragging ? 2 : 1}
                        >
                            <Box mb={1}>
                                <Typography variant="subtitle2">
                                    {column.title}
                                </Typography>
                            </Box>

                            <ColumnIssueList
                                droppableId={column.id}
                                issues={column.issues}
                            />
                        </Box>
                    </Grid>
                )
            }}
        </Draggable>
    )
}

export default memo(ColumnItem)
