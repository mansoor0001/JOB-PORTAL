import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CiUser } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store/store';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';
import { setUser } from '@/redux/features/authSlice';




function Navbar() {

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const access = user.accessToken
    

    const logoutHandler = async () => {

        const config = {
            headers: {
                Authorization: `Bearer ${access}`
            },
        }
        try {
            const { data } = await axios.post(`${USER_API_END_POINT}/user/logout`,{}, config)
            if (data.success) {
                toast.success(data.message)
                dispatch(setUser(""))
                localStorage.removeItem("user")
                navigate("/")

            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            console.log("ERROR at logout user :", error);

        }
    }
    return (
        <>

            <div className='bg-white'>
                <div className='flex items-center justify-between h-16 max-w-6xl mx-auto px-4'>
                    <h1 className='text-2xl'>
                        Job <span className='text-[#F83002]'>Portal</span>
                    </h1>
                    <div className='flex items-center justify-center gap-5'>
                        <div>
                            <ul className='flex gap-4 items-center text-[17px]'>
                            {
                                user?.data?.role === "recruiter" ?
                                <>
                                <li><NavLink to="/admin/companies" className={({ isActive }) => (isActive ? 'text-orange-300' : '')}>companies</NavLink></li>
                                <li><NavLink to="/admin/jobs" className={({ isActive }) => (isActive ? 'text-orange-300' : '')}>Jobs</NavLink></li>
                                </> 
                                :
                                    <>
                                    
                                <li><NavLink to="" className={({ isActive }) => (isActive ? 'text-orange-300' : '')}>Home</NavLink></li>
                                <li><NavLink to="/jobs" className={({ isActive }) => (isActive ? 'text-orange-300' : '')}>Jobs</NavLink></li>
                                <li><NavLink to="/browse" className={({ isActive }) => (isActive ? "text-orange-300" : "")} >Browse</NavLink></li>
                                    </>
                                 
                                }
                            </ul>
                        </div>
                        {
                            user && user.data ? (
                                <div >
                                    <Popover >
                                        <PopoverTrigger>
                                            <Avatar>
                                                <AvatarImage src={user?.data?.profile?.profilePhoto} />
                                                {/* <AvatarFallback>CN</AvatarFallback> */}
                                            </Avatar>
                                        </PopoverTrigger>
                                        <PopoverContent >
                                            <div className='flex gap-3'>

                                                <div>
                                                    <Avatar>
                                                        <AvatarImage src={user?.data?.profile?.profilePhoto} />
                                                    </Avatar>
                                                </div>
                                                <div>
                                                    <h1 className='font-medium text-md'>
                                                        {user?.data?.fullname}
                                                    </h1>
                                                    <p className='text-[13px]'>
                                                        {user?.data?.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>

                                                </div>
                                                { 
                                                user?.data?.role === "student" ? 
                                                    (
                                                <div className='flex items-center mt-2'>
                                                    <CiUser className='text-2xl' />
                                                    <Link to="/profile">
                                                        <Button variant="link">View Profile</Button>
                                                    </Link>

                                                </div>

                                                    )
                                                    :<hr className='mt-4'/>
                                            }
                                            </div>
                                            <div className='flex items-center'>
                                                <MdOutlineLogout className='text-2xl' />
                                                <Button
                                                    onClick={logoutHandler}
                                                    variant="link">Logout</Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            ) : (
                                <div className='space-x-2'>
                                    <NavLink to={"/login"}
                                        className={({ isActive }) => `${isActive ? "hidden" : ""}`}
                                    ><Button variant="outline">Login</Button></NavLink>
                                    <NavLink to={"/signup"}
                                        className={({ isActive }) => `${isActive ? "hidden" : ""}`}
                                    ><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button></NavLink>
                                </div>
                            )
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar

// portal - #F83002
// npm i react-router-dom axios @reduxjs/toolkit react-redux