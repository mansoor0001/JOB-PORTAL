import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { setLoading } from '@/redux/features/authSlice';
import { setSingleCompany } from '@/redux/features/companySlice';
import { UPDATE_COMPANY_DETAILS_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { ArrowLeft, ArrowLeftSquare, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useGetCompanyById from '@/hooks/useGetCompanyById';


function CompanyDetails() {
  const params = useParams()
  const companyId = params.id;
  useGetCompanyById(companyId)
  const { user } = useSelector(store => store.auth)
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { singleCompany } = useSelector(store => store.company)
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });
  

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany?.name || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        logo: "",
      });
    }
  }, [singleCompany]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev, [name]: value
    }))
    // console.log(input);

  }
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput((prev) => ({
        ...prev,
        logo: file,
      }))
      
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    // console.log("Company id :",singleCompany?._id);
    dispatch(setLoading(true))
    const formData = new FormData();
    formData.append("name", input?.name);
    formData.append("description", input?.description);
    formData.append("website", input?.website);
    formData.append("location", input?.location);
    if (input?.logo) {
      formData.append("logo", input?.logo)
    }
    
    const config = {
      headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.accessToken}`
      },
  }
   
    try {
      const { data } = await axios.post(`${UPDATE_COMPANY_DETAILS_END_POINT}/${singleCompany._id}`, formData, config)
      if (data?.success) {
        toast.success(data?.message)
        navigate("/admin/companies")
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
      console.log("Something went wrong at CompannyDetails :", error);


    }
    finally {
      dispatch(setLoading(false))
    }

  }

  return (
    <>
      <div className='max-w-6xl px-4 mx-auto'>
        <div>
          <div className='max-w-3xl mx-auto mt-8'>
            <div>
              <div className='block sm:flex items-cent gap-4 space-y-2'>
                <Button variant="outline" onClick={() => { navigate("/admin/companies") }} >
                  <ArrowLeft className='font-semibold' />
                  Back
                </Button>
                <h1 className='text-2xl font-semibold relative bottom-1 '>Company Setup</h1>
              </div>
              <form action="" method="POST" enctype="multipart/form-data" >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 '>

                  <div className='space-y-1'>
                    <label htmlFor="company">Company Name</label>
                    <Input
                      value={input?.name}
                      onChange={(e) => handleChange(e)}
                      name="name"
                      type="text"
                      className="text-sm"
                      id="company"
                      required
                    />
                  </div>
                  <div className='space-y-1'>
                    <label htmlFor="description">Description</label>
                    <Input
                      value={input?.description}
                      className="text-sm"
                      type="text"
                      id="description"
                      name="description"
                      onChange={(e) => { handleChange(e) }}
                    />
                  </div>

                  <div className='space-y-1'>
                    <label htmlFor="website">Website</label>
                    <Input
                      value={input?.website}
                      className="text-sm"
                      type="text"
                      id="website"
                      name="website"
                      onChange={(e) => { handleChange(e) }}
                    />
                  </div>
                  <div className='space-y-1'>
                    <label htmlFor="location">Location</label>
                    <Input
                      value={input?.location}
                      className="text-sm"
                      type="text"
                      id="location"
                      name="location"
                      onChange={(e) => { handleChange(e) }}
                    />
                  </div>

                  <div className='space-y-1'>
                    <label htmlFor="logo">Logo</label>
                    <Input
                      type="file"
                      className="text-sm"
                      id="logo"
                      name="logo"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => handleFile(e)}
                    />
                  </div>

                </div>
                <div className='mt-[30px]'>

                  {
                    loading ? <Button className="w-full"> <Loader2 className='animate-spin' />Please wait... </Button>
                      :
                      <Button className='w-full'
                        onClick={(e) => handleSubmit(e)}
                      >Update</Button>
                  }
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default CompanyDetails