import ResponsiveDrawer from '../components/Shared/sidebar'
import AnalyticsGrid from '../components/Analytics/analytics'
import { useState, useEffect } from 'react'

export default function Analytics(props) {
  const [user, setUser] = useState({})
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])
  return (
    <ResponsiveDrawer {...props} user={user}>
      <AnalyticsGrid />
    </ResponsiveDrawer>
  )
}
