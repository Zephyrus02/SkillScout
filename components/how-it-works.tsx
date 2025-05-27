"use client"

import { Upload, Brain, Briefcase, ExternalLink } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Resume",
      description: "Simply drag and drop your PDF resume or click to browse and upload it securely.",
      color: "blue",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description:
        "Our advanced AI analyzes your skills, experience, education, and projects to understand your profile.",
      color: "purple",
    },
    {
      icon: Briefcase,
      title: "Get Job Matches",
      description: "Receive personalized job recommendations from top job portals ranked by relevance to your profile.",
      color: "indigo",
    },
    {
      icon: ExternalLink,
      title: "Apply Directly",
      description: "Click on any job card to be redirected to the original job portal to apply directly.",
      color: "green",
    },
  ]

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
  }

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">How SkillScout Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get matched with your ideal job in just four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div
                  className={`w-16 h-16 rounded-full ${colorClasses[step.color as keyof typeof colorClasses]} flex items-center justify-center mx-auto mb-6`}
                >
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
