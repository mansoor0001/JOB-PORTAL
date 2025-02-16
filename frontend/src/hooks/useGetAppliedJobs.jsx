import { setAppliedJobs } from '@/redux/features/AppliedJobs'
import store from '@/redux/store/store'
import { GET_APPLICANTS_END_POINT, GET_APPLIED_JOBS_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

function useGetAppliedJobs() {
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)

    useEffect(() => {
        
        const fetchAppliedJobs = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            }
            try {
                const { data } = await axios.get(`${GET_APPLIED_JOBS_END_POINT}`, config)
                if (data?.success) {
                    // console.log("Applied jaobs data is :", data);
                    dispatch(setAppliedJobs(data?.appliedJobs))

                }
            } catch (error) {
                toast.error(error?.response?.data?.message || "No Jobs Found,please try again later")
                console.log("Something went wrong at useGetAppliedJobs :", error);


            }
        }
        fetchAppliedJobs()
    }, [user,dispatch])


    return <></>
}

export default useGetAppliedJobs