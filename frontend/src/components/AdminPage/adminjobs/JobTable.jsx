import React, { useEffect, useState } from 'react'
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
import { Edit, Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { GET_ALL_COMPANIES_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from 'react-router-dom'
import store from '@/redux/store/store'
import { setSearchJobByText } from '@/redux/features/jobSlice'



function JobTable() {
  const navigate = useNavigate()
  const { allAdminJobs, searchJobByText } = useSelector(store => store.jobs)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)
  

  useEffect(() => {
    const filteredJobs = allAdminJobs.length > 0 && allAdminJobs.filter((job)=>{
      if(!searchJobByText) {
        return true ;
      };
      return job?.title?.toLowerCase().includes(searchJobByText?.toLowerCase())
    });
    
    setFilterJobs(filteredJobs)
  }, [searchJobByText, allAdminJobs])


  const handleJobUpdate = (jobId) => {
    navigate(`/admin/job/details/${jobId}`)
  }


  return (
    <>
      <div>
        <Table>
          {
            filterJobs.length > 0 ?
              <TableCaption>List of Jobs You Created  .</TableCaption>
              :
              <TableCaption>No Jobs Found</TableCaption>
          }
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              filterJobs.length > 0 && filterJobs.map((job) => {
                return <TableRow key={job?._id}>
                  <TableCell className="font-medium">
                    {job?.company?.name}
                    
                  </TableCell>

                  <TableCell>
                    { job?.title }
                  </TableCell>
                  <TableCell>
                    {
                      job?.createdAt?.split("T")[0]
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger> <MoreHorizontal /> </PopoverTrigger>
                      <PopoverContent className="w-40 space-y-2 ">
                        <div
                          onClick={() => handleJobUpdate(job?._id)}
                          className='flex w-full gap-2 items-center   transition-all delay-50 cursor-pointer hover:bg-gray-200 rounded-sm px-2 py-1 '>
                          <Edit2 className='w-4' />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={()=>navigate(`/admin/job/${job?._id}/applicants`)} 
                          className='flex w-full gap-2 items-center transition-all delay-50 cursor-pointer hover:bg-gray-200 rounded-sm px-2 py-1'>
                          <Eye className='w-4' />
                          <span 
                          >Applicants</span>
                        </div>
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

export default JobTable