import ResponsiveDrawer from '../../components/Shared/sidebar'
import RoomGrid from '../../components/Rooms/roomGrid'
import { useState, useEffect } from 'react'
export default function Rooms(props) {
  const [user, setUser] = useState({})
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])
  return (
    <ResponsiveDrawer {...props} user={user}>
      <RoomGrid />
    </ResponsiveDrawer>
  )
}
