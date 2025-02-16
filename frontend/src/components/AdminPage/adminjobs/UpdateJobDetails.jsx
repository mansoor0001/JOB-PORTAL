import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store/store';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import axios from 'axios';
import { JOB_UPDATE_END_POINT, POST_JOB_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import useGetJobById from '@/hooks/useGetJobById';


function UpdateJobDetails() {
  useGetAllCompanies()
  useGetJobById();
  const { singleJob } = useSelector(store => store.jobs)
  const [input, setInput] = useState({
    title: "",
    description: "",
    experience: "",
    requirements: "",
    salary: "",
    location: "",
    positions : "",
    jobType: "",
    companyId: ""
  });
  
  
  const { allCompanies } = useSelector(store => store.company)
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const handleChange = (e) => {
      const { name, value } = e.target;
      setInput(prev => ({
      ...prev, [name]: value
    }))
    
  }

 
const submitHandler = async (e) => {
    e.preventDefault();
    const jobId = params.id;

    const config = {
      headers: {
        "Content-Type" : "Application/json",
        Authorization: `Bearer ${user?.accessToken}`
      }
    }

    try {
      
      const { data } = await axios.post(`${JOB_UPDATE_END_POINT}/${jobId}`,input, config)
      if (data?.success) {
        toast.success(data?.message || "Job Successfully Updated")
        navigate("/admin/jobs")
        // console.log("The nob data is :", data);

      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An unexpected error occurred. Please try again.");
      console.log("error at upadate job :",error);
      

    }

  }
  useEffect(() => {
    setInput({
      title: singleJob?.title || "",
      description: singleJob?.description || "",
      experience: singleJob?.experience || "",
      requirements: singleJob?.requirements?.join(",") || "",
      salary:  singleJob?.salary || "",
      location:  singleJob?.company?.location || "",
      positions : singleJob?.positions || "",
      jobType: singleJob?.jobType || "",
      companyId: singleJob?.company?._id || ""
    });

  }, [user,singleJob])


  return (
    <>
      <div className='max-w-3xl mx-auto p-2 rounded-lg  mt-8 '>
        <div className='max-w-2xl px-4 py-2 shadow-lg border rounded-lg border-gray-200'>

          <form action="">
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <Label htmlFor="title" >Title</Label>
                <Input
                  type="text"
                  value={input?.title}
                  name="title"
                  id="title"
                  disabled = {true}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor="description" >Description</Label>
                <Input
                  type="text"
                  value={input?.description}
                  name="description"
                  id="description"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor="requirements" >Requirements</Label>
                <Input
                  type="text"
                  value={input?.requirements}
                  name="requirements"
                  id="requirements"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor="salary" >Salary</Label>
                <Input
                  type="number"
                  value={input?.salary}
                  name="salary"
                  id="salary"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  value={input?.location}
                  name="location"
                  id="location"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor="jobType" >Job Type</Label>
                <Input
                  type="text"
                  value={input?.jobType}
                  name="jobType"
                  id="jobType"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor="experience">Experience Level</Label>
                <Input
                  type="text"
                  value={input?.experience}
                  name="experience"
                  id="experience"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor="job">No of Positions</Label>
                <Input
                  type="number"
                  value={input?.positions}
                  name="positions"
                  id="positions"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <Select
                  value={input.companyId}  
                  disabled={true}
                >

                  <SelectTrigger className="">
                    <SelectValue placeholder="Please Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      allCompanies.length > 0 && allCompanies.map((comp) => {
                        return <SelectItem
                          key={comp?._id}
                          value={comp?._id}
                        >{comp?.name}</SelectItem>

                      })
                    }

                  </SelectContent>
                </Select>


              </div>

            </div>
            <Button
              onClick={(e) => submitHandler(e)}
              className="w-full my-4"
            //   disabled={allCompanies.length <= 0 ? true : false}
            >
              Update Job 
            </Button>
            
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateJobDetails