import React, { useEffect, useState } from 'react'
import Jobs from './Jobs';
import Job from '../JobPage/Job';
import { useSelector } from 'react-redux';
import store from '@/redux/store/store';

function Browse() {
  const { allJobs } = useSelector(store => store.jobs)
  const [ filterJobs, setFilterJobs ] = useState(allJobs)
  const { searchQuery } = useSelector(store => store.jobs)
  const { user } = useSelector(store => store.auth)

  useEffect(() => {
    const filteredJobs = filterJobs.length > 0 && filterJobs.filter((item) => {
      if (!searchQuery) {
        return true;
      };
      return item?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
    })
    setFilterJobs(filteredJobs)
  }, [searchQuery,allJobs])


  return (
    <>
      <div className='max-w-6xl mx-auto px-4 mt-4 space-y-5'>
        <h1 className='font-semibold text-2xl'>Search Results : {filterJobs.length}</h1>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {
            filterJobs.map((item, index) => {
              return <div key={index}>
                <Job job={item} />
              </div>
            })
          }
        </div>
      </div>

    </>
  )
}

export default Browse