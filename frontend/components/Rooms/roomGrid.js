import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import RoomCard from './roomCard'
import CreateRoomMoadal from './createRoomModal'
import AddIcon from '@mui/icons-material/Add'
import { getRooms } from '../../services/roomServices'
import Typography from '@mui/material/Typography'

export default function RoomGrid(props) {
  const [rooms, setRooms] = useState([])
  const [user, setUser] = useState({})
  const [jwt, setJwt] = useState('')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchRooms(id, jwt) {
      const res = await getRooms(id, jwt)
      setUser(userData)
      setJwt(jwt)
      setRooms(res.data)
      setLoading(false)
    }
    const userData = JSON.parse(localStorage.getItem('userData'))
    const jwt = localStorage.getItem('jwt')
    fetchRooms(userData.id, jwt)
  }, [open])

  const handleModalClose = () => {
    setOpen(false)
  }
  const handleModalOpen = () => {
    setOpen(true)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <CreateRoomMoadal
        {...props}
        user={user}
        jwt={jwt}
        open={open}
        handleModalClose={handleModalClose}
      />
      <Stack
        spacing={2}
        sx={{ mb: 3 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Rooms</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true)
          }}
          endIcon={<AddIcon />}
        >
          Add room
        </Button>
      </Stack>
      <Grid
        container
        spacing={2}
        rowGap={2}
        direction={{ xs: 'column', md: 'row', sm: 'column' }}
      >
        {loading
          ? 'Loading...'
          : rooms && rooms.length > 0
          ? rooms.map((room) => {
              return (
                <Grid key={room.id} item xs={12} md={6} lg={4}>
                  <RoomCard room={room} user={user} />
                </Grid>
              )
            })
          : ''}
      </Grid>
    </Box>
  )
}
