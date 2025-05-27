"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, User, Briefcase, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Search className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkillScout
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#upload-section"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Upload Resume
          </Link>
          <Link 
            href="#" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <Link 
            href="#" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <SignedOut>
            <SignInButton>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
          
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-col space-y-4 mt-8">
              <Link 
                href="#how-it-works" 
                className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" 
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#upload-section" 
                className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" 
                onClick={() => setIsOpen(false)}
              >
                Upload Resume
              </Link>
              <Link 
                href="#" 
                className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" 
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="#" 
                className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" 
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="justify-start text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 ml-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                Toggle Theme
              </Button>
              
              <div className="pt-4 space-y-2">
                <SignedOut>
                  <SignInButton>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-200 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Get Started
                    </Button>
                  </SignUpButton>
                </SignedOut>
                
                <SignedIn>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Your Account</span>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
