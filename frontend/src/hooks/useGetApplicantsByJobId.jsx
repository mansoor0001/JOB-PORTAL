import { setJobApplicants } from '@/redux/features/applicantsSlice'
import store from '@/redux/store/store'
import { GET_APPLICANTS_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function useGetApplicantsByJobId() {
    const params = useParams()
    const { user } = useSelector(store => store.auth)
    const jobId = params.id;
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchApplicants = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            }
            // console.log("I am working here");
            
            try {
                const { data } = await axios.get(`${GET_APPLICANTS_END_POINT}/${jobId}`, config)
                if(data?.success) {
                    dispatch(setJobApplicants(data?.jobs?.applications))
                    
                }    
            } 
            catch (error) {
              console.log("Something went wrong at getApplicantByJobId :",error);
              toast.error(error?.response?.data?.message || "Applicants not Found ,please try again later")
                
            }
        }
        fetchApplicants()
    }, [jobId,user])


    return null
}

export default useGetApplicantsByJobId