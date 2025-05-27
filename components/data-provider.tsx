"use client"

import { useState } from "react"
import FileUpload from "./file-upload"
import JobResults from "./job-results"
import jobData from "../data.json"

// Map the data.json structure to match the Job interface expected by JobResults
function mapJobData(jobs: any[]) {
  return jobs.map(job => ({
    ...job,
    // Add any missing fields required by the Job interface
    type: job.employmentType || "", // Use employmentType as type if needed
    salary: job.salaryRange || "",
    matchScore: Math.floor(Math.random() * 30) + 70, // Add random match scores between 70-99%
    // Ensure all required properties are present
    logo: job.logo || job.image || "/placeholder.svg",
  }))
}

export default function DataProvider() {
  const [showResults, setShowResults] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  
  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setIsProcessing(true)
    
    // Simulate processing time with multiple steps
    setTimeout(() => {
      setIsProcessing(false)
      setShowResults(true)
    }, 5000) // 5 seconds of simulated processing
  }
  
  return (
    <div>
      {!showResults ? (
        <FileUpload 
          onFileUpload={handleFileUpload} 
          isProcessing={isProcessing}
          uploadedFile={uploadedFile}
        />
      ) : (
        <JobResults jobs={mapJobData(jobData.jobs)} />
      )}
    </div>
  )
}