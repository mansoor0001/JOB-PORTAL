import { setSearchQuery } from '@/redux/features/jobSlice'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
    const [query, setQuery] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // dispatch(setSearchQuery(""))
    const searchHandler = () => {
        if(query && query.length > 0) {
            dispatch(setSearchQuery(query))
            navigate("/browse")
        }

    }
    return (
        <>
            <div className='text-center space-y-5'>
                <div>
                    <span className='text-red-500 bg-gray-100 mx-auto py-1 px-3 rounded-full'>No.1 Job Hunt Website</span>
                </div>
                <div>
                    <h1 className='text-4xl font-semibold'>
                        Search, Apply & <br />
                        Get Your <span className='text-[#6A38C2] '>Dream Jobs</span>
                    </h1>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel eum, quisquam hic autem quae repellendus..</p>
                </div>
                {/* <div className='w-[65%] sm:max-w-[50%] md:max-w-[45%] lg:max-w-[35%] mx-auto'> */}
                <div className='w-[40%] mx-auto relative '>
                    <input
                        onChange={(e)=>setQuery(e.target.value)}
                        value={query}
                        type="text"
                        placeholder='Find your dream jobs'
                        className='shadow-lg border outline-none w-full rounded-full py-2 px-4' />
                    <Search
                        onClick={() => searchHandler()}
                        className='absolute right-0 top-0 bg-[#6A38C2] text-white w-[45px] h-full text-sm rounded-e-full px-3 cursor-pointer hover:bg-[#5b30a6]' />
                </div>
            </div>
        </>
    )
}

export default HeroSection