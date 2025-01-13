import React, { useState } from 'react';
import { Briefcase, Search, Target } from 'lucide-react';
import { ResumeUpload } from '../components/ResumeUpload';
import { JobCard } from '../components/JobCard';
import { JobPosting } from '../types';

export const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mostSuitedJob, setMostSuitedJob] = useState<JobPosting | null>(null);

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    setIsLoading(true);

    // Simulate file processing and fetching job postings
    setTimeout(() => {
      const mockJobs: JobPosting[] = [
        {
          id: 1,
          title: 'Software Engineer',
          company: 'Tech Corp',
          location: 'San Francisco, CA',
          salary: '$120,000',
          description: 'Develop and maintain web applications.',
          matchPercentage: 85,
        },
        {
          id: 2,
          title: 'Frontend Developer',
          company: 'Web Solutions',
          location: 'New York, NY',
          salary: '$110,000',
          description: 'Create and optimize user interfaces.',
          matchPercentage: 90,
        },
      ];
      setJobs(mockJobs);
      setMostSuitedJob(mockJobs.reduce((prev, current) => (prev.matchPercentage > current.matchPercentage ? prev : current)));
      setIsLoading(false);
    }, 1000); // Simulate a delay for file processing
  };

  return (
    <>
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Your Perfect Job Match Awaits
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Upload your resume and let our AI-powered matching system connect you with your ideal career opportunities. Get personalized job recommendations based on your skills and experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-4">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Precise Matching</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Advanced AI analysis for accurate job matches</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-4">
                <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Smart Search</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Instant access to relevant job opportunities</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mb-4">
                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Career Growth</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Find roles that match your career goals</p>
            </div>
          </div>
        </div>
      </section>

      {!selectedFile && !isLoading && (
        <section className="mb-16">
          <ResumeUpload onFileUpload={handleFileUpload} />
        </section>
      )}

      {isLoading && (
        <section className="flex justify-center items-center mb-16">
          <div className="loader"/>
        </section>
      )}

      {selectedFile && !isLoading && mostSuitedJob && (
        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 dark:text-gray-200">Most Suited Job</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            {mostSuitedJob.title}
          </p>
        </section>
      )}

      {selectedFile && !isLoading && jobs.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      )}
    </>
  );
};