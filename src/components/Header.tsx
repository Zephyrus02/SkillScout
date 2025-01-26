import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useUser, UserButton } from '@clerk/clerk-react';

export const Header = () => {
  const { isSignedIn, user } = useUser();

  return (
    <header className="flex justify-between items-center mb-12">
      <Link to="/" className="text-4xl font-bold text-gray-800 dark:text-white">
        SkillScout
      </Link>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {isSignedIn ? (
          <div className="relative">
            <UserButton />
            <div className="ml-4">
              <Link
                to="/profile"
                className="text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {user?.firstName} {user?.lastName}
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};