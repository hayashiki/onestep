import {ColumnFragmentFragment} from "@/generated/graphql";
import {Grid, GridProps, makeStyles, Typography} from "@material-ui/core";
import React, {FC, memo, useCallback} from "react";
import ColumnIssueItem from "@/components/rrr/Project/ColumnIssueItem";
import {Droppable} from "react-beautiful-dnd";
import {RearrangeType} from "@/components/rrr/Project/ColumnList";

type Props = {
    droppableId: string;
    issues: ColumnFragmentFragment["issues"];
};

type P = {
    dragging: boolean;
};

const useStyles = makeStyles(
    ({ palette: { primary }, shape: { borderRadius } }) => {
        return {
            grid: ({ dragging }: P) => ({
                background: dragging ? primary.light : "none",
                borderRadius,
                transition: "all 0.3s ease-in-out",
            }),
        };
    }
);

const StyledGrid: FC<GridProps & P> = ({ dragging, ...props }) => {
    const styles = useStyles({ dragging });

    return <Grid className={styles.grid} {...props} />;
};

const ColumnIssueList: FC<Props> = ({ issues = [], droppableId }) => {
    const renderIssueList = useCallback(
        (dragging: boolean) => {
            if (!issues.length) {
                return (
                   !dragging && (
                       <Grid item xs={12}>
                           <Typography variant="caption">
                               No Issue...
                           </Typography>
                       </Grid>
                   )
                )
            }

            return issues.map(
                (issue, index) =>
                    issue && (
                        <ColumnIssueItem
                            key={issue.id}
                            issue={issue}
                            index={index}
                        />
                    )
            );

        }, [issues]
    )

    return (
        <Droppable droppableId={droppableId}
                   direction="vertical"
                   type={RearrangeType.PROJECT_COLUMN_ISSUE}
                   >
            {(provided, { isDraggingOver }) => (
                <StyledGrid
                    container
                    spacing={1}
                    innerRef={provided.innerRef}
                    dragging={isDraggingOver}
                >
                    {renderIssueList(isDraggingOver)}
                    {provided.placeholder}
                </StyledGrid>
            )}
        </Droppable>
    )
}

export default memo(ColumnIssueList)
