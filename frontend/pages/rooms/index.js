import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import ResponsiveAppBar from '../../components/Shared/appBar'
import RoomGrid from '../../components/Rooms/roomGrid'

export default function Rooms(props) {
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')))
  }, [])
  return (
    <>
      <ResponsiveAppBar user={user} />
      <Box sx={{ p: 3 }}>
        <RoomGrid {...props} />
      </Box>
    </>
  )
}
