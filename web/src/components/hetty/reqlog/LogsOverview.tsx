import React, {FC} from "react";
import { useRouter } from "next/router"
import {Box} from "@material-ui/core";
import RequestList, {log} from "@/components/hetty/reqlog/RequestLog";

const LogsOverviews: FC = () => {
    const router = useRouter()
    const handleLogClick = (reqId: number) => {
        router.push("/proxy/logs?id=" + reqId, undefined, {
            shallow: false
        })
    }

    const logs = [] as log[]

    const hoge = {
        "id": 1,
        "method": "string",
        "url": "https://example.com?query=hoge",
        "response": "string",
    } as log

    logs.push(hoge)

    return (
        <div>
            <Box mb={2}>
                <RequestList
                    onLogClick={handleLogClick}
                    logs={logs}
                 />
            </Box>
        </div>
    )
}

export default LogsOverviews
