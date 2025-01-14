import React, { useState } from 'react';
import { useUserData, useChangePassword, useNhostClient } from '@nhost/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Profile: React.FC = () => {
  const user = useUserData();
  const nhost = useNhostClient();
  const { changePassword, isLoading: isChangingPassword, isError: isChangePasswordError, error: changePasswordError } = useChangePassword();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isPasswordFormVisible, setIsPasswordFormVisible] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      const changePasswordResponse = await nhost.auth.changePassword({
        newPassword,
      });

      if (changePasswordResponse.error) {
        alert(`Failed to update password: ${changePasswordResponse.error.message}`);
        return;
      }

      alert('Password updated successfully.');
      setIsPasswordFormVisible(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(`An unexpected error occurred: ${error.message}`);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Profile</h2>
      <div className="mb-6 space-y-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 w-32">First Name:</span>
          <span className="text-sm text-gray-900 dark:text-gray-100">{user?.displayName?.split(' ')[0]}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 w-32">Last Name:</span>
          <span className="text-sm text-gray-900 dark:text-gray-100">{user?.displayName?.split(' ')[1]}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 w-32">Email:</span>
          <span className="text-sm text-gray-900 dark:text-gray-100">{user?.email}</span>
        </div>
      </div>
      {isPasswordFormVisible && (
        <form onSubmit={handleChangePassword} className="space-y-6">
          <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-200">
            <li>Minimum 10 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
            <li>At least one special character</li>
          </ul>
          <div className="relative">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              New Password
            </label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-400"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="relative">
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Confirm New Password
            </label>
            <input
              type={showConfirmNewPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-400"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            >
              {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isChangingPassword}
          >
            {isChangingPassword ? 'Updating Password...' : 'Submit'}
          </button>
          {isChangePasswordError && <p className="mt-4 text-sm text-red-600">{changePasswordError?.message}</p>}
        </form>
      )}
      <button
        onClick={() => setIsPasswordFormVisible(!isPasswordFormVisible)}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
      >
        {isPasswordFormVisible ? 'Cancel' : 'Update Password'}
      </button>
    </div>
  );
};