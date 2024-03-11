import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ----------------------------------------------------------------------

export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []) // Remove the 'pathname' dependency from the array

  return null
}
