import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom';


function LatestJobsCards({ job }) {
    console.log("the jobs are :",job);
    
    return (
        <> <Link to={`/description/${job?._id}`}>
            <div className='shadow-lg px-2 py-3 space-y-3 rounded-lg mt-5 border cursor-pointer'>
                <div className='space-y-3'>
                    <h3 className='text-2xl font-bold'>{job?.company?.name}</h3>
                    <h3 className='text-gray-600'>{job?.country}</h3>
                    <h3 className='text-xl font-semibold'>{job?.title}</h3>
                    <p className='text-gray-600'>{job?.description}</p>
                </div>
                <div className='flex items-center gap-5'>
                    <Badge variant='ghost' className="text-blue-700 font-bold">{job?.positions} Positions</Badge>
                    <Badge variant='ghost' className="text-[#F83002] font-bold" >{job?.jobType}</Badge>
                    <Badge variant='ghost' className="text-red-400 font-bold" >{job?.salary} LPA</Badge>
                </div>
            </div>
        </Link>
        </>
    )
}

export default LatestJobsCards