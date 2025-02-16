import { setSingleCompany } from '@/redux/features/companySlice'
import store from '@/redux/store/store'
import { GET_COMPANY_BY_ID_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useGetCompanyById(companyId) {
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)
    useEffect(() => {
        
        const companyById = async () => {
            console.log("accessToekn :",user?.accessToken);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                }
                const { data } = await axios.get(`${GET_COMPANY_BY_ID_END_POINT}/${companyId}`,config)
                if(data?.success) {
                    // console.log("useGetCompanyById :",data);
                    dispatch(setSingleCompany(data?.company))
                    
                }
            } catch (error) {
                console.log("Something went wrong at useGetCompanyById  : ",error);
                
            }
        }
        companyById()

    }, [companyId])

return (
    <></>
)
}

export default useGetCompanyById;
