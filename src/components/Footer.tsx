import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-center space-x-6">
        <a
          href="https://github.com/Zephyrus02"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/aneesh-raskar/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
      </div>
      <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
        © {new Date().getFullYear()} SkillScout. All rights reserved.
      </p>
    </footer>
  );
};