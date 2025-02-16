import React from 'react'
import Job from '../JobPage/Job'
import FilterCards from '../JobPage/FilterCards'
import AllJobs from '../JobPage/AllJobs'

function Jobs() {
  return (
    <>
      <div className='max-w-6xl mx-auto flex px-4 mt-5'>

        <FilterCards />
        <AllJobs />
      </div>
    </>
  )
}

export default Jobs