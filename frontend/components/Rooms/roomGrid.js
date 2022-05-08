import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import RoomCard from './roomCard'
import CustomizedDialogs from './createRoomModal'
import { getRooms } from '../../services/roomServices'

export default function RoomGrid() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchRooms() {
      const res = await getRooms()
      setRooms(res)
      setLoading(false)
    }
    fetchRooms()
  }, [])

  const showRooms = (rooms) => {
    if (rooms && rooms.length > 0) {
      rooms.map((room) => {
        return (
          <Grid key={room.id} item xs={12} md={6} lg={4}>
            <RoomCard room={room} />
          </Grid>
        )
      })
    } else {
      return (
        <Button
          variant="text"
          onClick={() => {
            setOpen(true)
          }}
        >
          Create a Room
        </Button>
      )
    }
  }

  const handleModalClose = () => {
    setOpen(false)
  }
  const handleModalOpen = () => {
    setOpen(true)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <CustomizedDialogs open={open} handleModalClose={handleModalClose} />
      <Grid
        container
        spacing={2}
        rowGap={2}
        direction={{ xs: 'column', md: 'row', sm: 'column' }}
      >
        {loading ? 'Loading...' : showRooms(rooms)}
      </Grid>
    </Box>
  )
}
