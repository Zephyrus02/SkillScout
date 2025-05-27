"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import JobResults from "@/components/job-results"
import FileUpload from "@/components/file-upload"
import jobData from "@/data.json" // Import directly

// Map the data.json structure to match the Job interface expected by JobResults
function mapJobData(jobs: any[]) {
  return jobs.map((job) => ({
    ...job,
    // Add any missing fields required by the Job interface
    type: job.employmentType || "",
    salary: job.salaryRange || "",
    matchScore: Math.floor(Math.random() * 30) + 70, // Add random match scores between 70-99%
    // Ensure all required properties are present
    logo: job.logo || job.image || "/placeholder.svg",
  }))
}

export default function HomePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    setIsProcessing(true)
    setShowResults(false)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 4000))

    setIsProcessing(false)
    setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <div id="upload-section">
          <SignedIn>
            <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} uploadedFile={uploadedFile} />
          </SignedIn>
          <SignedOut>
            <div className="container px-4 mx-auto text-center py-20">
              <h3 className="text-3xl font-bold mb-4">Sign in to upload your resume</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Create an account or sign in to upload your resume and get matched with job opportunities.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <SignInButton>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 h-auto"
                  >
                    Create Account
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </SignedOut>
        </div>
        {showResults && <JobResults jobs={mapJobData(jobData.jobs)} />}
      </main>
      <Footer />
    </div>
  )
}
