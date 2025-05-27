"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react"
import { SignUpButton, useAuth } from "@clerk/nextjs"

export default function HeroSection() {
  const { isSignedIn } = useAuth();
  
  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))]" />
      
      {/* Wavy shiny effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10%] w-[120%] h-[120%] shine-wave"></div>
        <div className="absolute -inset-[10%] w-[120%] h-[120%] shine-wave animation-delay-1000"></div>
        <div className="absolute -inset-[10%] w-[120%] h-[120%] shine-wave animation-delay-2000"></div>
      </div>

      <div className="relative container px-4 mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20 px-4 py-2 text-sm font-medium text-blue-700 mb-8">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Job Matching
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
            Find Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Perfect Job
            </span>{" "}
            Match
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Upload your resume and let our AI analyze your skills, experience, and projects to find the most relevant
            job opportunities from top job portals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {isSignedIn ? (
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 h-auto"
                onClick={scrollToUpload}
              >
                Upload Resume Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 h-auto"
                >
                  Upload Resume Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
            )}
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                AI analyzes your resume to find the most relevant opportunities
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Get job recommendations in seconds, not hours</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">All Portals</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Search across LinkedIn, Indeed, Glassdoor, and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
