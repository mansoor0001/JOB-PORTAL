import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Edit, Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { GET_ALL_COMPANIES_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from 'react-router-dom'
import { setSearchByText } from '@/redux/features/companySlice'



function CompanyTable() {
  const navigate = useNavigate()
  const { allCompanies, searchByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState(allCompanies)
  // console.log("allcompanies are :",allCompanies)
  useEffect(() => {
    const filteredCompany = allCompanies.length > 0 && allCompanies.filter((company)=>{
      if(!searchByText) {
        return true ;
      };
      return company?.name?.toLowerCase().includes(searchByText?.toLowerCase())
    });
    
    setFilterCompany(filteredCompany)
  }, [setSearchByText, allCompanies])


  const handleCompanyUpdate = (companyId) => {
    navigate(`/admin/company/details/${companyId}`)
  }


  return (
    <>
      <div>
        <Table>
          {
            filterCompany.length > 0 ?
              <TableCaption>Your's List of Companies .</TableCaption>
              :
              <TableCaption>No Companies Found</TableCaption>
          }
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              filterCompany.length > 0 && filterCompany.map((comp) => {
                return <TableRow key={comp._id}>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage src={comp?.logo} />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    {comp?.name}
                  </TableCell>
                  <TableCell>
                    {
                      comp?.createdAt?.split("T")[0]
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger> <MoreHorizontal /> </PopoverTrigger>
                      <PopoverContent className="w-32 h-7 flex ">
                        <div
                          onClick={() => handleCompanyUpdate(comp?._id)}
                          className='flex gap-2 items-center cursor-pointer bg-red-500'>
                          <Edit2 className='w-4' />
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>

                  </TableCell>
                </TableRow>
              })
            }
          </TableBody>

        </Table>

      </div>

    </>
  )
}

export default CompanyTable