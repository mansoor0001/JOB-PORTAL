import { setSingleJob } from '@/redux/features/jobSlice'
import store from '@/redux/store/store'
import { JOB_BY_ID_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function useGetJobById() {
    const params = useParams()
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    // const { singleJob } = useSelector(store => store.jobs)

    const jobId = params.id;
    // console.log("The id of the job is :", id);
    // jobId ?
    if (jobId) {
        useEffect(() => {
            const fetchJob = async () => {

                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                }
                try {
                    const { data } = await axios.get(`${JOB_BY_ID_END_POINT}/${jobId}`, config)
                    if (data?.success) {
                        dispatch(setSingleJob(data?.job))
                        console.log("I am working :", data);

                    }
                } catch (error) {

                }
            }
            fetchJob()
        }, [user, jobId])
    } else {
        dispatch(setSingleJob(""))
    }
    return null
}

export default useGetJobById