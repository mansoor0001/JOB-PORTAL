import { setAllCompanies } from '@/redux/features/companySlice'
import { GET_ALL_COMPANIES_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

function useGetAllCompanies() {
    const dispatch = useDispatch()
    const {user} = useSelector(store => store.auth)
    useEffect(() => {
        const fetchCompanies = async () => {
          const config = {
            headers: {
              Authorization: `Bearer ${user.accessToken}`
            }
          }
          try {
            const { data } = await axios.get(`${GET_ALL_COMPANIES_END_POINT}`, config)
            if(data?.success) {
                dispatch(setAllCompanies(data.data || []))
            //   setAllCompanies(data.data)
              
            }
          } catch (error) {
            toast.error(error?.response?.data?.message || "An error occured, No companies found ")
            console.log(error);
            
            
          }
        }
        fetchCompanies()      
      }, [user,dispatch])
    return (
        <></>
  )
}

export default useGetAllCompanies