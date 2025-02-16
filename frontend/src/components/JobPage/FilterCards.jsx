import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch, useSelector } from 'react-redux';
import { setFilterQuery, setSearchQuery } from '@/redux/features/jobSlice';
import { Button } from '../ui/button';
import { Menu, MenuIcon, Sidebar, X } from 'lucide-react';

function FilterCards() {
  const [selectedValue, setSelectedValue] = useState({
    Location: "",
    Industry: "",
    Salary: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const dispatch = useDispatch();

  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Data Engineering", "UX/UI Designer", "DevOps Engineer", "Cybersecurity Analyst"]
    },
    {
      filterType: "Salary",
      array: ["0-40k", "42k-100k", "100k - 500k"]
    },
  ];


  const selectHandler = (filterType, value) => {
    setSelectedValue((prev) => ({
      ...prev, [filterType]: value
    }))
  }

  useEffect(() => {
    dispatch(setFilterQuery(selectedValue))
  }, [selectedValue])


  return (
    <>
     <div
  className={`fixed inset-y-0 left-0 bg-white z-50 w-3/4 max-w-[300px] transform transition-transform duration-300 ease-in-out ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:relative md:translate-x-0 md:w-[20%] md:h-[80vh] md:pr-4 font-semibold text-2xl text-start overflow-y-auto`}
>
  <h2 className="ml-4 py-3 text-2xl md:ml-0 md:py-0">Filter Jobs</h2>
  <hr className="my-1" />
  <div>
    {filterData.map((filter, index) => (
      <div key={index} className="mb-4 ml-4 md:ml-0">
        <h1 className="text-xl md:font-semibold font-bold">{filter.filterType}</h1>
        <RadioGroup
          onValueChange={(value) => selectHandler(filter.filterType, value)}
          value={selectedValue[filter.filterType]}
        >
          {filter.array.map((option, idx) => (
            <div key={idx} className="space-x-1 md:pt-1">
              <RadioGroupItem value={option} className="text-blue-600" id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    ))}
  </div>
</div>

      <div className='md:hidden'>
        <Button variant="outline" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </Button>
      </div>
      {isSidebarOpen && (
        <div
        className={`fixed inset-0 bg-black transition-opacity ease-in-out duration-300 ${
          isSidebarOpen ? "opacity-50 z-40" : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setIsSidebarOpen(false)}
      />
      )}
    </>
  );
}

export default FilterCards;
