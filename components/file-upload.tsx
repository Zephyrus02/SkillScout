"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isProcessing: boolean
  uploadedFile: File | null
}

export default function FileUpload({ onFileUpload, isProcessing, uploadedFile }: FileUploadProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file && file.type === "application/pdf") {
        onFileUpload(file)
        simulateProgress()
      }
    },
    [onFileUpload],
  )

  const simulateProgress = () => {
    const steps = [
      { progress: 20, step: "Uploading resume..." },
      { progress: 40, step: "Extracting text content..." },
      { progress: 60, step: "Analyzing skills and experience..." },
      { progress: 80, step: "Matching with job opportunities..." },
      { progress: 100, step: "Generating recommendations..." },
    ]

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < steps.length) {
        setProgress(steps[currentIndex].progress)
        setCurrentStep(steps[currentIndex].step)
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 800)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  })

  if (isProcessing) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analyzing Your Resume</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our AI is processing your resume to find the best job matches
                  </p>
                </div>

                <div className="space-y-4">
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm font-medium text-gray-700">{currentStep}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{progress}% complete</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Upload Your Resume</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your PDF resume and let our AI find the perfect job matches for you
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              {uploadedFile ? (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Resume Uploaded Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Upload Different Resume
                  </Button>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />

                  {isDragActive ? (
                    <div>
                      <h3 className="text-xl font-semibold text-blue-600 mb-2">Drop your resume here</h3>
                      <p className="text-gray-600 dark:text-gray-300">Release to upload your PDF resume</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Drag & drop your resume here
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        or click to browse and select your PDF file
                      </p>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <FileText className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  )}

                  <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                    Supported format: PDF (Max size: 10MB)
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
