import ResponsiveDrawer from '../components/Shared/sidebar'
import IntegrationsGrid from '../components/Integrations/integrations'
import { useState, useEffect } from 'react'

export default function Integrations(props) {
  const [user, setUser] = useState({})
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])
  return (
    <ResponsiveDrawer {...props} user={user}>
      <IntegrationsGrid />
    </ResponsiveDrawer>
  )
}
