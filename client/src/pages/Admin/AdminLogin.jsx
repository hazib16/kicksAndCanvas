import React, { useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/authSlice'

const AdminLogin = () => {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const[error, setError] = useState('')
    const[loading, setLoading] = useState(false)


    const handleChange= (e)=>{
        setFormData({...formData,
            [e.target.name]: e.target.value,
        })
    }


    const handleSubmit= async(e) =>{
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response= await axiosInstance.post('/auth/admin-login', formData)
            
            if(response.data.success){
                dispatch(login(response.data.user))

                if(response.data.user.role !== "admin"){
                    setError("Access denied. Admin credentials required.")
                    setLoading(false)
                    return
                }
                navigate('/admin/dashboard', {replace: true}) 
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login Failed')
            setLoading(false)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="w-full max-w-md">
        {/* Admin Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            ADMIN ACCESS
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
                 <h1 className="text-3xl font-black text-gray-900">Admin Portal</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your store</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                     <p className="text-red-600 text-sm">{error}</p>
                    </div>
            )}


            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            </form>

             {/* Back to User Site */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to User Login
            </button>
          </div>

        </div>

         {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            🔒 Secure admin access. Unauthorized access is prohibited.
          </p>
        </div>
    </div>
    </div>
  )
}

export default AdminLogin