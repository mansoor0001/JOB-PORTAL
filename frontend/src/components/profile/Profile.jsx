import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialogue from './UpdateProfileDialogue'
import { useSelector } from 'react-redux'
import store from '@/redux/store/store'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

function Profile() {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)
    const resume = user?.data?.profile?.resumeName

    return (
        <>
            <div className='max-w-3xl mx-auto px-4 space-y-6'>
                <div className='shadow-lg p-2 border rounded-lg space-y-5 px-7 py-6 mt-3'>


                    <div className='flex justify-between items-center'>
                        <div className='flex flex-wrap sm:flex-nowrap gap-4 items-center mt-5'>

                            <Avatar className="w-[60px] h-[60px] mx-auto sm:mx-0 ">
                                <AvatarImage src={user?.data?.profile?.profilePhoto} />
                            </Avatar>
                            <div>
                                <h2 className='font-semibold'>{user?.data?.fullname}</h2>
                                <p>{user?.data?.profile?.bio}</p>
                            </div>
                        </div>
                        <div className='px-2'>
                            <Button variant="outline" onClick={() => { setOpen(true) }}>
                                <Pen />
                            </Button>
                        </div>

                    </div>
                    <div className='space-y-2'>
                        <div className='flex gap-2 items-center'>
                            <Mail />
                            <span>{user?.data?.email}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Contact />
                            <span>{user?.data?.contact}</span>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <h2 className='font-semibold'>Skills</h2>
                        <div className='space-x-2 space-y-2'>
                            {
                                user?.data?.profile?.skills?.map((skill, index) => {
                                    return <Badge key={index}>{skill}</Badge>
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h2 className='font-semibold'>
                            Resume
                        </h2>
                        <span className='text-gray-700'>
                            {resume ? 
                            
                            <a href={user?.data?.profile?.resume} target="_blank">
                            {user?.data?.profile?.resumeName}
                        </a>
                            : "No Resume" }

                            </span>
                    </div>

                </div>
                <div>
                    <AppliedJobTable />
                </div>
                {

                    open ? <UpdateProfileDialogue open={open} setOpen={setOpen} /> : ""

                }
            </div>


        </>
    )
}

export default Profile