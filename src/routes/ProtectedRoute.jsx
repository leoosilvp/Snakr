import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Skeleton from '../components/Skeleton'

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return <Skeleton />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
