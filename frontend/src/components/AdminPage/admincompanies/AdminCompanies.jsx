import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import useGetAllCompanies from '../../../../../useGetAllCompanies'

import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchByText } from '@/redux/features/companySlice'

function AdminCompanies() {
  useGetAllCompanies()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { singleCompany } = useSelector(store => store.company)
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(setSearchByText(search))
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
            <Button className="text-sm" onClick={() => { navigate("/admin/createCompany") }} >New Company</Button>
          </div>
          <CompanyTable />
        </div>
      </div>
    </>
  )
}

export default AdminCompanies