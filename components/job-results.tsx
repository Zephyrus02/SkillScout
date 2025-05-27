"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin, Clock, DollarSign, Star, Briefcase, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"

interface Job {
  id: number | string
  title: string
  company: string
  logo?: string
  image?: string
  description: string
  salary: string
  location: string
  type: string
  employmentType: string
  datePosted: string
  salaryRange?: string
  portal?: string
  portalUrl?: string
  matchScore?: number
  jobProviders: Array<{
    jobProvider: string
    url: string
  }>
}

interface JobResultsProps {
  jobs: Job[]
}

export default function JobResults({ jobs }: JobResultsProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  
  const handleJobClick = (url: string) => {
    window.open(url, "_blank")
  }
  
  const openJobDetails = (job: Job) => {
    setSelectedJob(job)
  }
  
  const closeJobDetails = () => {
    setSelectedJob(null)
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Job Matches</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We found {jobs.length} job opportunities that match your profile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {job.image || job.logo ? (
                      <Image
                        src={job.image || job.logo || "/favicon.ico"}
                        alt={`${job.company} logo`}
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg overflow-hidden">
                        <Image
                          src="/favicon.ico"
                          alt="SkillScout Logo"
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{job.company}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {job.employmentType}
                  </div>
                  {job.datePosted && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      Posted: {job.datePosted}
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => openJobDetails(job)}
                  >
                    View More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
      
      <Dialog open={selectedJob !== null} onOpenChange={closeJobDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-3 mb-2">
                  {selectedJob.image || selectedJob.logo ? (
                    <Image
                      src={selectedJob.image || selectedJob.logo || "/favicon.ico"}
                      alt={`${selectedJob.company} logo`}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="h-15 w-15 rounded-lg overflow-hidden">
                      <Image
                        src="/favicon.ico"
                        alt="SkillScout Logo"
                        width={60}
                        height={60}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                    <DialogDescription className="text-lg font-medium">{selectedJob.company}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{selectedJob.employmentType}</span>
                </div>
                {selectedJob.datePosted && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    <span>Posted: {selectedJob.datePosted}</span>
                  </div>
                )}
              </div>
              
              {selectedJob.salaryRange && (
                <div className="mb-6 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                  <span className="font-medium">{selectedJob.salaryRange}</span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {selectedJob.description}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Apply on:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedJob.jobProviders.map((provider, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="flex items-center justify-between"
                      onClick={() => handleJobClick(provider.url)}
                    >
                      <span>{provider.jobProvider}</span>
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
