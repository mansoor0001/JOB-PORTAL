import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Loader2 } from 'lucide-react'
import { setLoading, setUser } from '@/redux/features/authSlice'
import { USER_API_END_POINT } from '@/utils/constants'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth || {})

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    const formData = { email, password, role };
    console.log(formData);
    if (!email.trim() || !password.trim() || !role.trim()) {
      toast.error("All fields are required!");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "Application/json"
      }
    }
    try {
      const { data } = await axios.post(`${USER_API_END_POINT}/user/login`, formData, config)
      if (data.success) {
        dispatch(setUser(data))
        console.log("At login the value of user :", data)
        toast.success(data.message)
        if (data?.data?.role === "recruiter") {
          navigate("/admin/companies")
        } else {
          navigate("/")
        }
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");

      console.log("Something wrong at login :", error)


    }
    finally {
      dispatch(setLoading(false))
    }
  }
  return (
    <>
      <div className='flex justify-center items-center mx-auto mt-10'>
        <form onSubmit={handleSubmit} action="" className='flex flex-col w-[70%] md:w-[60%] lg:w-[45%] gap-3 border border-gray-300 p-3 rounded-md '>
          <h1 className='text-2xl font-medium my-1'>Login</h1>

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

          </div>
          {
            loading ? (
              <Button> <Loader2 className='animate-spin' /> Please Wait ... </Button>
            ) : (<Button type="submit"
              className="text-md bg-[#6A38C2] hover:bg-[#5b30a6]"
            >Login</Button>)
          }

          <span>Don't have an account? <Link to="/signup" className='text-blue-600 underline'>Sign Up</Link> </span>
        </form>


      </div>
    </>
  )
}

export default Login