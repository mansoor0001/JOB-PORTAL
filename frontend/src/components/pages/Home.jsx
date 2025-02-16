import React, { useContext } from 'react'
import HeroSection from '../homePage/HeroSection'
import CarouselItems from '../homePage/CarouselItems'
import LatestJobs from '../homePage/LatestJobs'
import Footer from '../homePage/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'



function Home() {
  useGetAllJobs()

  return (
    <>
    
    <HeroSection/>
    <CarouselItems/>
    <LatestJobs/>
    </>
  )
}

export default Home