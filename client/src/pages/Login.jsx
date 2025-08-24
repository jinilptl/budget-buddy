import { useState } from 'react';
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-500 mb-2">Budget Buddy</h1>
          <h2 className="text-xl text-gray-900 mb-2">Sign in to your account</h2>
          <p className="text-sm text-gray-600">Track your expenses and manage your budget</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete='email'
                name='email'
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete='current-password'
                  name='password'
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <HiEyeOff className="h-4 w-4" /> : <HiEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <button className="text-teal-500 hover:text-teal-600 font-medium">
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
