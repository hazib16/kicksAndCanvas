import { useSelector } from 'react-redux';
import { selectAuthLoading } from './store/slices/authSlice';
import { useAuthInit } from './hooks/useAuthInit';
import AppRoutes from './routes/AppRoutes';

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

  return <AppRoutes />;
}

export default App;
