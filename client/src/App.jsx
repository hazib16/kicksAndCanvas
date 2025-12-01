import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast'; 
import { selectAuthLoading } from './store/slices/authSlice';
import { useAuthInit } from './hooks/useAuthInit';
import AppRoutes from './routes/appRoutes.jsx';

function App() {
  useAuthInit();
  const loading = useSelector(selectAuthLoading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      
      <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '14px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <AppRoutes />
    </>
  );
}

export default App;
