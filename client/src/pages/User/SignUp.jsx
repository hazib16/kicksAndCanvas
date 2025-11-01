import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SignUpForm from '../../components/forms/SignUpForm';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-sm text-gray-600">
          Kicks And Canvas &gt; Sign up
        </div>
      </div>

      <SignUpForm />

      <Footer />
    </div>
  );
};

export default SignUp;
