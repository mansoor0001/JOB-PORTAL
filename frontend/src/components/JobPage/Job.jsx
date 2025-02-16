import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../ui/badge';
import { Link } from 'react-router-dom';

function Job({ job }) {
  const jobId = job?._id || 'unknown-id';

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "Unknown date";
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 shadow-lg border space-y-4 rounded-lg">
      <div className="flex items-center justify-between flex-wrap">
        <span className="text-gray-500 text-sm">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </span>

        <Button variant="outline" className="rounded-full h-[40px] w-[40px]">
          <Bookmark />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <span className="bg-gray-300 rounded-lg p-1">
            <Avatar>
              <AvatarImage src={job?.company?.logo || 'fallback-image-url.png'} />
              <AvatarFallback>{job?.company?.name?.[0] || 'C'}</AvatarFallback>
            </Avatar>
          </span>
          <div>
            <h2 className="font-semibold text-lg">{job?.company?.name || 'Company Name Not Available'}</h2>
            <h3 className="text-gray-500">India</h3>
          </div>
        </div>
        <div>
          <p>{job?.description || 'No description provided for this job.'}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="ghost" className="text-blue-700 font-bold">
            {job?.positions || 'N/A'} Positions
          </Badge>
          <Badge variant="ghost" className="text-[#F83002] font-bold">
            {job?.jobType || 'Full-Time'}
          </Badge>
          <Badge variant="ghost" className="text-red-400 font-bold">
            {job?.salary ? `${job.salary} LPA` : 'Salary Not Disclosed'}
          </Badge>
        </div>
        <div className="space-x-5">
          <Link to={`/description/${jobId}`}>
            <Button variant="outline">Details</Button>
          </Link>
          <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Save For Later</Button>
        </div>
      </div>
    </div>
  );
}

export default Job;
