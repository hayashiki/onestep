import React, {FC, memo, useCallback} from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import {
    ColumnFragmentFragment,
    RearrangeColumnMutationHookResult,
    useRearrangeColumnMutation, useRearrangeIssueMutation
} from "@/generated/graphql";
import index from "jest-leak-detector";
import {Grid} from "@material-ui/core";
import ColumnItem from "@/components/rrr/Project/ColumnItem";

type Props = {
    projectID: string;
    columns: ColumnFragmentFragment[];
};

export enum RearrangeType {
    PROJECT_COLUMN = "PROJECT_COLUMN",
    PROJECT_COLUMN_ISSUE = "PROJECT_COLUMN_ISSUE",
}

const ColumnList: FC<Props> = ({ projectID, columns }) => {
    const [handleRearrangeColumn] = useRearrangeColumnMutation()
    const [handleRearrangeIssue] = useRearrangeIssueMutation()

    const columnRearrange = useCallback(
        ({ draggableId, source, destination }: DropResult) => {
            const i = source.index;
            const f = destination!.index;

            if (i !== f) {
                handleRearrangeColumn({
                    variables: {
                        where: {
                            projectID,
                            columnID: draggableId,
                        },
                        data: {
                            initialPosition: i,
                            finalPosition: f,
                        },
                    },
                });
            }
        },
        [handleRearrangeColumn, projectID]
    );

    const issueRearrange = useCallback(
        ({ draggableId: isID, source, destination }: DropResult) => {
            const { index: ip, droppableId: cID } = source;
            const { index: fp, droppableId: dID } = destination!;

            if (cID === dID && ip === fp) {
                return;
            }

            const col = columns.find((col) => col.id == cID)

            console.log(columns)
            console.log(isID)
            console.log(col?.issues)

            // @ts-ignore
            const result = Array.from(col?.issues)
            // ドラッグしたItemを取り除く
            const [removed] = result.splice(ip, 1)
            // ドラッグした地点に配置する
            result.splice(fp, 0, removed)

            console.log(result)

            return


            handleRearrangeIssue({
                variables: {
                    where: {
                        issueID: isID,
                        columnID: cID,
                    },
                    data: {
                        destinationColumnID: dID,
                        initialPosition: ip,
                        finalPosition: fp,
                    },
                },
            });
        },
        [handleRearrangeIssue]
    );

    const handleDragEnd = useCallback(
        (dropResult: DropResult) => {
            console.log("handleDragEnd")
            if (!dropResult.destination) {
                return;
            }

            if (dropResult.type === RearrangeType.PROJECT_COLUMN) {
                return columnRearrange(dropResult);
            }

            return issueRearrange(dropResult);
        },
        [columnRearrange, issueRearrange]
    );

    const list = columns.map((column, index) => (
        <ColumnItem key={column.id} column={column} index={index} />
    ));

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="project-column"
                       direction="horizontal"
                       type={RearrangeType.PROJECT_COLUMN}
                       >
                {provided => {
                    return (
                        <Grid
                            container
                            spacing={2}
                            innerRef={provided.innerRef}
                        >
                            {list}
                            {provided.placeholder}
                        </Grid>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
}

export default memo(ColumnList)
