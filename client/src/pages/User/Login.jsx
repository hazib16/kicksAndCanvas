import React from 'react'
import Header from '../../components/layout/Header.jsx'
import LoginForm from '../../components/forms/LoginForm.jsx'
import Footer from '../../components/layout/Footer.jsx'


const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-sm text-gray-600">
          KICKS AND CANVAS &gt; Login
        </div>
      </div>

      <LoginForm/>    

      <Footer/>

    </div>
  )
}

export default Login