import React, { useContext } from 'react'
import LatestJobsCards from './LatestJobsCards';
import { useSelector } from 'react-redux';
import store from '@/redux/store/store';

function LatestJobs() {
  const { allJobs } = useSelector(store => store.jobs)

  return (
    <>
      <div className='max-w-6xl mx-auto mt-10'>
        <div>

          <h1 className='px-4 text-3xl font-semibold'><span className='text-[#6A38C2]'> Latest & Top</span> Job Openings</h1>
          <div className=' px-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 '>
            {
              allJobs?.slice(0,6).map((job, index) => {
                return <LatestJobsCards key={index} job ={job} />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default LatestJobs