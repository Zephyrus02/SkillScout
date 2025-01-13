import React from 'react';
import { Briefcase } from 'lucide-react';
import { JobPosting } from '../types';

interface JobCardProps {
  job: JobPosting;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{job.title}</h3>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-2.5 py-0.5 rounded">
            {job.matchPercentage}% Match
          </span>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            {job.company}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{job.location}</p>
          <p className="text-gray-800 dark:text-gray-200 font-medium mt-2">{job.salary}</p>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{job.description}</p>
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
};