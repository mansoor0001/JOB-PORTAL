import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CompanyTable from '../admincompanies/CompanyTable';
import JobTable from './JobTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/features/jobSlice';


function AdminJobs() {
  useGetAllAdminJobs() ;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [search ,setSearch] = useState()

  useEffect(() => {
    dispatch(setSearchJobByText(search))
  }, [search])
  
  return (
    <>
     <div className='max-w-6xl mx-auto px-4 mt-7'>
        <div className='max-w-5xl mx-auto' >
          <div className='flex justify-between'>
            <Input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter By Name"
              className="w-15 text-sm  "
            />
            <Button className="text-sm" onClick={() => { navigate("/admin/job/post") }} >New Jobs</Button>
          </div>
          <JobTable />
        </div>
      </div>
    
    </>
  )
}

export default AdminJobs;