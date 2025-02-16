import React, { useState } from 'react'

import useGetApplicantsByJobId from '@/hooks/useGetApplicantsByJobId'
import { useSelector } from 'react-redux'
import store from '@/redux/store/store'
import ApplicantsTable from './ApplicantsTable';



function Applicants() {
  useGetApplicantsByJobId();
  const { jobApplicants } = useSelector(store => store.applicants)

  return (
    <>
      <div className='max-w-6xl mx-auto px-3 mt-4'>
        <div>
          <h2 className='text-xl font-medium py-3'>Applicants ( {jobApplicants?.length} )  </h2>
        </div>
        <div>
          <ApplicantsTable />

        </div>
      </div>
    </>
  )
}

export default Applicants