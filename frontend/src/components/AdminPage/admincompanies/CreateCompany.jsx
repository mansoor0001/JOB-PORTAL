import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { REGISTER_COMPANY_END_POINT } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { setSingleCompany } from '@/redux/features/companySlice';

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.auth)
  const singleCompany  = useSelector(store => store.company)


  const registerCompany = async (e) => {
    // console.log("Company Name :",user?.accessToken);

    
    const config = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${user?.accessToken}`
      }
    }
    
    try {
      const { data } = await axios.post(`${REGISTER_COMPANY_END_POINT}`, { name: companyName }, config)
      if (data?.success) {
        console.log("Company data is :",data);

        dispatch(setSingleCompany(data?.company))
        // console.log("company:,", singleCompany);
        // toast.success(data?.message || "Company created successfully")
        
        navigate(`/admin/company/details/${data?.company?._id}`)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An unexpected error occurred. Please try again.")
      console.log("Error at createCompany :", error);

    }
  }

  return (
    <>
      <div className='max-w-6xl px-4 mx-auto'>
        <div>
          <div className='max-w-3xl mx-auto flex flex-col gap-5 mt-8'>
            <div className='space-y-2'>
              <h1 className='font-semibold text-2xl'>Your Company Name</h1>
              <p className='text-gray-500'>
                What would you like to give your company name ? You can change this later
              </p>
            </div>
            <div className='space-y-2'>
              <label
                htmlFor="company"
                className='font-semibold'
              >Company Name</label>
              <Input
                placeholder="JobHunt, Microsoft etc..."
                className="text-sm"
                id="company"
                onChange={(e) => { setCompanyName(e.target.value) }}
              />
            </div>
            <div className='space-x-4'>
              <Button
                variant="outline"
                onClick={() => { navigate("/admin/companies") }}>Cancel</Button>
              <Button
                onClick={() => registerCompany()}
              >Continue</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateCompany