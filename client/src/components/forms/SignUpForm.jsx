import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import axios from 'axios';


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    referralCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
    console.log('Signup success:', response.data);
    alert('Account created successfully!');
  } catch (error) {
    console.error('Signup failed:', error.response?.data || error.message);
    alert('Signup failed! Please check your details.');
  }
};


  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked');
  };

  const applyReferralCode = () => {
    console.log('Referral code:', formData.referralCode);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Sign up</h1>

      {/* Google Sign In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-3 px-4 hover:bg-gray-50 transition mb-6"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">OR</span>
        </div>
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <Input
          label="Mobile"
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <div>
          <label
            htmlFor="referralCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Referral Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            <Button type="button" onClick={applyReferralCode}>
              Apply Code
            </Button>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs text-gray-600 mb-4">
            By Creating An Account You Agree With Our{' '}
            <a href="/terms" className="text-black underline">
              Terms Of Service
            </a>
            ,{' '}
            <a href="/privacy" className="text-black underline">
              Privacy Policy
            </a>
            .
          </p>
          <Button type="submit" fullWidth>
            Create account
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-black underline font-medium">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
