import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Footer from '../homePage/Footer'
import { Button } from '../ui/button'
import { Biohazard, Loader2 } from 'lucide-react'
import { data } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store/store'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { setUser } from '@/redux/features/authSlice'

function UpdateProfileDialogue({ open, setOpen }) {
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)
     const [loading, setLoading] = useState(false)

    const [input, setInput] = useState({
        fullname: user?.data?.fullname || "",
        email: user?.data?.email || "",
        contact: user?.data?.contact || "",
        bio: user?.data?.profile?.bio || "",
        skills: user?.data?.profile?.skills?.map(skill => skill) || "",
        file: user?.data?.profile?.resume || ""
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData();
        formData.append("fullname", input.fullname),
            formData.append("email", input.email),
            formData.append("contact", input.contact),
            formData.append("bio", input.bio),
            formData.append("skills", input.skills)
        if (input.file) {
            formData.append("resume", input.file)
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user?.accessToken}`
            },
        }
        try {
            const { data } = await axios.post(`${USER_API_END_POINT}/user/profile/update`, formData, config)
            if (data.success) {
                toast.success(data.message)
                setOpen(false)
                dispatch(setUser(data))
            }
        } catch (error) {

            toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");


        }
        finally {
            setLoading(false)
        }
    };


    return (
        <>
            <div className="">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>Open</DialogTrigger>
                    <DialogContent onInteractOutside={() => setOpen(false)}>
                        <DialogHeader>
                            <DialogTitle>Update Profile</DialogTitle>

                        </DialogHeader>
                        <DialogDescription>
                            <form action="" method="POST" onSubmit={submitHandler} enctype="multipart/form-data">
                                <div className='grid gap-4'>

                                    <div className='grid grid-cols-4'>
                                        <label htmlFor="name" className='text-[15px]'>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullname"
                                            id="name"
                                            value={input.fullname}
                                            onChange={(e) => handleChange(e)}
                                            className='border col-span-3 outline-none py-1 px-2 rounded-lg' />
                                    </div>
                                    <div className='grid grid-cols-4'>
                                        <label htmlFor="email"
                                            className='text-[15px]'>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={input.email}
                                            onChange={(e) => handleChange(e)}
                                            className='border col-span-3 outline-none py-1 px-2 rounded-lg' />
                                    </div>
                                    <div className='grid grid-cols-4'>
                                        <label htmlFor="contact" className='text-[15px]'>
                                            Contact
                                        </label>
                                        <input
                                            type="number"
                                            name="contact"
                                            id="contact"
                                            value={input.contact}
                                            onChange={(e) => handleChange(e)}
                                            className='border col-span-3 outline-none py-1 px-2 rounded-lg' />
                                    </div>
                                    <div className='grid grid-cols-4'>
                                        <label htmlFor="bio" className='text-[15px]'>
                                            Bio
                                        </label>
                                        <input
                                            type="text"
                                            name="bio"
                                            id="bio"
                                            value={input.bio}
                                            onChange={(e) => handleChange(e)}
                                            className='border col-span-3 outline-none py-1 px-2 rounded-lg' />
                                    </div>
                                    <div className='grid grid-cols-4'>
                                        <label htmlFor="skills" className='text-[15px]'>
                                            Skills
                                        </label>
                                        <input
                                            type="text"
                                            name="skills"
                                            id="skills"
                                            value={input.skills}
                                            onChange={(e) => handleChange(e)}
                                            className='border col-span-3 outline-none py-1 px-2 rounded-lg' />
                                    </div>
                                    <div className='grid grid-cols-4'>
                                        <label htmlFor="resume" className='text-[15px]'>
                                            Resume
                                        </label>
                                        <input
                                            type="file"
                                            name="resume"
                                            id="resume"
                                            // value={input.file.filename}
                                            // accept='application/pdf'
                                            onChange={(e) => handleFileChange(e)}
                                            className='border 
                                        col-span-3 outline-none py-1 px-2 rounded-lg' />
                                    </div>
                                </div>
                                <DialogFooter className="mt-6">
                                    {
                                        loading ? (
                                            <Button> <Loader2 className='animate-spin' /> Please Wait ... </Button>
                                        ) : (<Button type="submit"
                                            className="text-md bg-[#6A38C2] hover:bg-[#5b30a6]"
                                        >Update</Button>)
                                    }
                                </DialogFooter>
                            </form>
                        </DialogDescription>

                    </DialogContent>
                </Dialog>

            </div>
        </>
    )
}

export default UpdateProfileDialogue