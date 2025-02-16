import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'
import store from '@/redux/store/store'


function AppliedJobTable() {
    const { appliedJobs } = useSelector(store => store.appliedJobs)

    return (
        <>
            <div>
                <h2 className='font-semibold text-xl'>Applied Jobs </h2>
                <Table>
                    <TableCaption>Applied Jobs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Job Role</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            appliedJobs.map((item, index) => {
                                return <TableRow
                                    key={item?._id}
                                >
                                    <TableCell className="text-sm">
                                        {item?.createdAt.split("T")[0]}
                                    </TableCell>
                                    <TableCell>
                                        {item?.job?.title}
                                    </TableCell>
                                    <TableCell>
                                        {item?.job?.company?.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge className=
                                            {` 
                                        ${item?.status === "rejected" ? "bg-red-400" : item?.status === "pending" ? "bg-gray-400" : "bg-green-400"}    
                                        `}>
                                            {item?.status?.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>

                            })
                        }
                    </TableBody>
                </Table>

            </div>
        </>
    )
}

export default AppliedJobTable