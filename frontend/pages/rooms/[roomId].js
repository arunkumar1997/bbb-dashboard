import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import ResponsiveAppBar from '../../components/Shared/appBar'
import RoomDetails from '../../components/Rooms/roomDetails'
import { getRoomById } from '../../services/roomServices'

export default function Room(props) {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [jwt, setJwt] = useState('')
  const { roomId } = router.query
  const [room, setRoom] = useState({})
  const [loading, setLoading] = useState({})
  const fetchRoomById = async (id, token) => {
    try {
      const res = await getRoomById(id, token)
      setRoom(res.data.attributes)
      setLoading(false)
    } catch (error) {
      setRoom(false)
      setLoading(false)
    }
  }

  function setUserData(user, jwt) {
    setUser(user)
    setJwt(jwt)
  }

  useEffect(() => {
    if (!router.isReady) return
    const userData = JSON.parse(localStorage.getItem('userData'))
    const jwtToken = localStorage.getItem('jwt')
    setUserData(userData, jwtToken)
    fetchRoomById(parseInt(roomId), jwtToken)
  }, [router.isReady])

  return (
    <>
      <ResponsiveAppBar user={user} />
      <Box sx={{ p: 3 }}>
        {loading ? (
          'Loading..'
        ) : room ? (
          <RoomDetails user={user} room={room} jwt={jwt} roomId={roomId} />
        ) : (
          'No Room found'
        )}
      </Box>
    </>
  )
}
