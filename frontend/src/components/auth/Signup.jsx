import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/features/authSlice'
import store from '@/redux/store/store'
import { Loader2 } from 'lucide-react'



function Signup() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState()
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth || {})
  console.log(loading)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    const formData = { fullname, contact, email, password, role };

    console.log(formData);
    if (!fullname.trim() || !email.trim() || !contact.trim() || !password.trim() || !role.trim()) {
      toast.error("All fields are required!");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const res = await axios.post(`http://localhost:8000/api/user/register`, formData, config);

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      }

    } catch (error) {
      toast.error(error.message)
      console.log("Something wrong while posting the data from frontend to backend;");

    }
    finally {
      dispatch(setLoading(false))
    }

  }

  return (
    <>
      <div className='flex justify-center items-center mx-auto mt-5'>
        <form onSubmit={handleSubmit} action="" className='flex flex-col w-[70%] md:w-[60%] lg:w-[45%] gap-3 border border-gray-300 p-3 rounded-md '>
          <h1 className='text-2xl font-medium my-1'>Sign Up</h1>
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Eg. Andrew sigmoid"
              className="decoration-none"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}

            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Eg. Andrew01@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Contact Number</Label>
            <Input
              name="contact"
              type="number"
              placeholder="Eg. 1234567890"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className=''>
            <Label>Role</Label>
            {/* <RadioGroup defaultValue="option-one"> */}
            <div className='flex space-x-2'>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="r1"
                  name="role"
                  value="Student"
                  className="cursor-pointer"
                  onChange={() => setRole("student")}
                  checked={role === 'student'}
                />
                <Label htmlFor="r1" className="cursor-pointer">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="r2"
                  name="role"
                  value="Recruiter"
                  className="cursor-pointer"
                  onChange={() => setRole("recruiter")}
                  checked={role === 'recruiter'}
                />
                <Label htmlFor="r2" className="cursor-pointer">Recruiter</Label>

              </div>
            </div>
            {/* </RadioGroup> */}



          </div>
          {
            loading
              ? (<Button className="" > <Loader2 className='animate-spin ' />  Please Wait ...</Button>) :
              (<Button type="submit" className="text-md bg-[#6A38C2] hover:bg-[#5b30a6]">Sign Up</Button>)
          }

          <span>Already have an account? <Link to="/login" className='text-blue-600 underline'>Login</Link> </span>
        </form>


      </div>
    </>
  )
}

export default Signup