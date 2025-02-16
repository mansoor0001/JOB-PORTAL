import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/features/jobSlice'
import { useNavigate } from 'react-router-dom'

function CarouselItems() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const catogories = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Develper",
    "Data Scientist",
    "Graphic Designer",
    "Data Engineering"
  ]
  return (
    <>
    <div className='text-center w-full mt-8'>
    <div className='w-[40%] mx-auto'>
    <Carousel >
  <CarouselContent>
    {
      catogories.map((cat,index) =>{
        return  <CarouselItem key={index} className="rounded-full mx-2 md:basis-1/2 lg:basisi-1/3">
         <Button 
         onClick = {()=>{
          dispatch(setSearchQuery(cat))
          navigate("/browse")
        }}
         variant='outline' 
         className='rounded-full'>
          {cat}
         </Button>
          </CarouselItem>
      }) 
    }
   
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>


    </div>
    </div>
    </>
  )
}

export default CarouselItems