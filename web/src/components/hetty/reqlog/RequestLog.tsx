import React from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography, withTheme
} from "@material-ui/core";

interface Props {
    logs: log[]
    selectedReqLogId?: number
    onLogClick(requestId: number): void;
    theme: Theme
}

const RequestList: React.FC<Props> = ({ onLogClick, logs }) => {
    return (
        <div>
            <RequestListTable onLogClick={onLogClick} logs={logs}>
                {logs.length === 0 && (
                    <Box my={1}>
                        <Paper>
                            <Typography>No logs found.</Typography>
                        </Paper>
                    </Box>
                )}
            </RequestListTable>
        </div>
        )
}

export interface log {
    id: number
    method: string
    url: string
    response: string
}

interface RequestListTableProps {
    logs?: log[];
    selectedReqLogId?: number; // 色付けするためだけの用途
    onLogClick(requestId: number): void;
    theme?: Theme;
}

const RequestListTable: React.FC<RequestListTableProps> = ({logs, onLogClick}) => {
    return (
        <TableContainer
            component={Paper}
            style={{
                minHeight: logs?.length ? 200 : 0,
                height: logs?.length ? "24vh" : "inherit",
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Method</TableCell>
                        <TableCell>Origin</TableCell>
                        <TableCell>Path</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs && logs.map(({id, method, url, response}) => {
                        const { origin, pathname, search, hash } = new URL(url);

                        const cellStyle = {
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        } as any;

                        return (
                            <TableRow
                                key={id}
                                onClick={()=> onLogClick(id)}
                            >
                                <TableCell style={{...cellStyle, width: "100px"}}>
                                    <code>{method}</code>
                                </TableCell>
                                <TableCell style={{...cellStyle, width: "100px"}}>
                                    {origin}
                                </TableCell>
                                <TableCell style={{...cellStyle, width: "200px"}}>
                                    {decodeURIComponent(pathname + search + hash)}
                                </TableCell>
                                <TableCell style={{...cellStyle, width: "100px"}}>
                                    {response}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default withTheme(RequestList)
