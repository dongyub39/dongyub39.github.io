import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { logVisit } from '../utils/visitLogger'

export default function VisitLogger() {
  const location = useLocation()

  useEffect(() => {
    logVisit(location.pathname)
  }, [location.pathname])

  return null
}
