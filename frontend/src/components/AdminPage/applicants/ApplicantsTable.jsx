import React from 'react'

import { MoreHorizontal } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useSelector } from 'react-redux'
import store from '@/redux/store/store'
import axios from 'axios'
import { UPDATE_STATUS_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'

function ApplicantsTable() {
    const { jobApplicants } = useSelector(store => store.applicants)
    const shortListed = ["Accepted", "Rejected"]
    const { user } = useSelector(store => store.auth)

    const statusHandler = async (applicantId, status) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        }
        try {
            const { data } = await axios.post(`${UPDATE_STATUS_END_POINT}/${applicantId}` ,{ status },config)
            if(data?.success) {
                toast.success(data?.message || "Successfully Updated")
                
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong , try again later")

        }
    }
    return (
        <>
            <div>
                <Table className="rounded-lg overflow-hidden shadow-sm mt-4">
                    <TableCaption>A list of your recent applied users.</TableCaption>
                    <TableHeader className="bg-blue-50">
                        <TableRow>
                            <TableHead className="">Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            jobApplicants.length > 0 &&
                            jobApplicants.map((applicant) => {
                                return <TableRow 
                                key={applicant?.applicant?._id}
                                className={``}
                                >
                                    <TableCell className="">{applicant?.applicant?.fullname}</TableCell>
                                    <TableCell> {applicant?.applicant?.email} </TableCell>
                                    <TableCell>{applicant?.applicant?.contact}</TableCell>
                                    <TableCell>
                                        {applicant?.applicant?.profile?.resume ? (
                                            <a
                                                href={applicant.applicant.profile.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                                className="text-blue-600 underline"
                                            >
                                                Download Resume
                                            </a>
                                        ) : (
                                            "No Resume Uploaded"
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {applicant?.applicant?.createdAt?.split("T")[0]}

                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger> <MoreHorizontal /> </PopoverTrigger>
                                            <PopoverContent className="px-0 py-2 w-[150px] ">
                                                {
                                                    shortListed.map((res) => {
                                                        return <div
                                                            className='px-5 py-1 cursor-pointer'
                                                            key={`${applicant?._id}-${res}`}
                                                            name={res}
                                                            value ={res}
                                                            onClick={(e) => statusHandler(applicant?._id,res)}
                                                        >{res}</div>
                                                    })
                                                }

                                            </PopoverContent>
                                        </Popover>


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

export default ApplicantsTable