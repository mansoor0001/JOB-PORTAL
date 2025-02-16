import { GET_ALL_JOBS_END_POINT } from '@/utils/constants'
import { setAllJobs } from '@/redux/features/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
function useGetAllJobs() {
    const dispatch = useDispatch()
    useEffect(() => {
        const getAllJobs = async () => {
            try {
                const { data } = await axios.get(`${GET_ALL_JOBS_END_POINT}`)
                if (data) {
                    // console.log("All jobs are :", data.data)
                    dispatch(setAllJobs(data.data))
                }

            } catch (error) {
                console.log("Something went wrong at useGetAllJobs :", error)
                toast.error(error?.response?.data?.message || "An expected error occurred, please try again later")

            }

        }
        getAllJobs();
    }, [])


    return (
        <>
        </>
    )
}

export default useGetAllJobs