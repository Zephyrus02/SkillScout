import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useUserData, useSignOut, useAuthenticationStatus } from '@nhost/react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  const user = useUserData();
  const { signOut } = useSignOut();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    onLogout();
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center mb-12">
      <Link to="/" className="text-4xl font-bold text-gray-800 dark:text-white">
        SkillScout
      </Link>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={user?.avatarUrl || '/default-avatar.png'}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </button>
            {isProfileOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20"
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsProfileOpen(false)}
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
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
              to="/signup"
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