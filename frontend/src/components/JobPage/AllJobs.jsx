import React, { useEffect, useState } from 'react'
import Job from './Job'
import { useSelector } from 'react-redux'
import store from '@/redux/store/store'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'

function AllJobs() {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.jobs);
    const [filterJobs, setFilterJobs] = useState([]);
    const { filterQuery } = useSelector(store => store.jobs)
    console.log(allJobs);


    useEffect(() => {
        let lSalary;
        let uSalary;
        if (filterQuery?.Salary) {
            const salary = filterQuery.Salary.split("-");

            lSalary = salary[0];
            lSalary = lSalary.split("k")[0];
            lSalary *= 1000;

            uSalary = salary[1];
            uSalary = uSalary?.split("k")[0];
            uSalary *= 1000;


        }
        if (!allJobs || allJobs.length === 0) {
            setFilterJobs([]);
            return;
        }

        const filteredJobs = allJobs.filter((job) => {
            if (filterQuery) {

                const locationMatch = filterQuery?.Location?.length > 0 ? job?.location?.toLowerCase().includes(filterQuery?.Location?.toLowerCase()) ||
                    job?.description?.toLowerCase().includes(filterQuery?.Location?.toLowerCase()) : true;

                const industryMatch = filterQuery?.Industry?.length > 0 ? job?.title?.toLowerCase().includes(filterQuery?.Industry?.toLowerCase()) ||
                    job?.description?.toLowerCase().includes(filterQuery?.Industry?.toLowerCase()) : true;

                const salaryMatch = filterQuery?.Salary?.length > 0 ? job?.salary >= lSalary && job?.salary <= uSalary : true;

                return locationMatch && industryMatch && salaryMatch;

            }
            else {
                return true;
            }
        })
        setFilterJobs(filteredJobs)

    }, [filterQuery, allJobs])

    return (
        <>
            <div className='flex flex-1 pl-10'
            >
                <div className='grid grid-cols-1 gap-7 md:grid-cols-2 '>
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job) => <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, z: -100 }}
                            transition={{ duration: 0.3 }}
                            key={job._id}
                        >
                            <Job job={job} />
                        </motion.div>
                        )
                    ) : (
                        <p>No jobs found</p>
                    )}
                </div>

            </div>
        </>
    )
}

export default AllJobs