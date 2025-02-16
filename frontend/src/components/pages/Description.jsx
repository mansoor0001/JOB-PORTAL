import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store/store';
import axios from 'axios';
import { APPLY_JOB_END_POINT, JOB_DES_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';
import { setSingleJob } from '@/redux/features/jobSlice';

function Description() {
  const {singleJob} =useSelector(store => store.jobs)
  const dispatch = useDispatch()
  const { allJobs } = useSelector(store => store.jobs)
  const { id } = useParams()
  const { user } = useSelector(store => store.auth)
  const isApplied = singleJob?.job?.applications?.some(application => 
    application.applicant === user?.data?._id
  );
  
  

  const handleApply = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    }
    try {
      const { data } = await axios.post(`${APPLY_JOB_END_POINT}/${id}`, {}, config)
      if (data.success) {
        toast.success("Job Applied Successfully")
        // console.log("The description data is :", data)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
      console.log("Error at jobDescription : ", error)
    }
  }

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(`${JOB_DES_END_POINT}/${id}`);
        if (data.success) {
          console.log(data);
          dispatch(setSingleJob(data))
        }
      } catch (error) {
        console.log("Something went wrong at description :", error)
      }
    }
    fetchJobDetails()
  }, [user,id,singleJob,isApplied])

  return (
    <>
      <div className='max-w-6xl mx-auto px-4 space-y-5 py-8'>
        <div className='flex justify-between items-center'>
          <div className=' space-y-4'>
            <h1 className='font-semibold text-2xl'> {singleJob?.job?.title} </h1>
            <div className='flex items-center  gap-4'>
              <Badge variant='ghost' className="text-blue-700 font-bold">{singleJob?.job?.positions} Positions</Badge>
              <Badge variant='ghost' className="text-[#F83002] font-bold" >{singleJob?.job?.jobType}</Badge>
              <Badge variant='ghost' className="text-red-400 font-bold" >{singleJob?.job?.salary}LPA</Badge>
            </div>
          </div>
          <Button onClick={handleApply} disabled={isApplied} className={`${isApplied ? "cursor-not-allowed bg-gray-600" : "bg-[#7209b7] hover:bg-[#7c0fe2]"}`}>
            {isApplied ? "Already Applied" : "Apply"}
          </Button>
        </div>

        <div>
          <div className='border-b-2 py-2 border-gray-300'>
            <h2 className='text-xl font-semibold'>{singleJob?.job?.title}</h2>
          </div>
          <div className='space-y-1 mt-5'>
            <h3 className='font-medium'>Role : <span className='m-2 font-normal'>{singleJob?.job?.title}</span></h3>

            <h3 className='font-medium'>Skills : <span className='m-2 font-normal'>{singleJob?.job?.requirements?.join(",")}</span></h3>

            <h3 className='font-medium'>Location : <span className='m-2 font-normal'>{singleJob?.job?.company?.location}</span></h3>
            <h3 className='font-medium'>Description : <span className='m-2 font-normal'>{singleJob?.job?.description}</span></h3>
            <h3 className='font-medium'>Experience : <span className='m-2 font-normal'>{singleJob?.job?.experience} yrs</span></h3>
            <h3 className='font-medium'>Salary : <span className='m-2 font-normal'>{singleJob?.job?.salary} LPA</span></h3>
            <h3 className='font-medium'>Total Applied : <span className='m-2 font-normal'> {singleJob?.job?.applications?.length} </span></h3>
            <h3 className='font-medium'>Posted Date : <span className='m-2 font-normal'>17-07-2024</span></h3>
          </div>
        </div>

      </div>
    </>
  )
}

export default Description