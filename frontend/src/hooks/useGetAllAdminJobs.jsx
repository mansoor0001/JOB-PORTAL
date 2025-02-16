import { setAllAdminJobs } from '@/redux/features/jobSlice'
import { GET_ADMIN_JOBS_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useGetAllAdminJobs() {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    
    
    
    useEffect(() => {
        
        const fetchJobs = async () => {
            const config = {
                headers: {
                  Authorization: `Bearer ${user.accessToken}`
                }
              }
            try {
                const { data } = await axios.get(`${GET_ADMIN_JOBS_END_POINT}`, config)
                if(data?.success) {
                    dispatch(setAllAdminJobs(data?.adminJobs))
                    
                }
            } catch (error) {
                console.log("Something went wrong at useGetAllAdminJobs:",error);
                
            }
        }
        fetchJobs()
    }, [user?.accessToken])

    return null
}

export default useGetAllAdminJobs