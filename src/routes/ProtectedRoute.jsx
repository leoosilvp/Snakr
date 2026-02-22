import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Skeleton from '../components/skeletons/Skeleton'
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton'
import CatalogSkeleton from '../components/skeletons/CatalogSkeleton'

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth()

  const location = useLocation()

  if (loading) {
    const path = location.pathname

    if (path === '/profile') {
      return <ProfileSkeleton />
    }

    else if (path === '/home') {
      return <Skeleton />
    }

    else if (path === '/catalog') {
      return <CatalogSkeleton />
    }

    return <Skeleton />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
