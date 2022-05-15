import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardActionArea from '@mui/material/CardActionArea'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import axios from 'axios'
import { joinMeeting } from '../../services/bbbServices'

export default function RoomCard({ room, user }) {
  const router = useRouter()
  const handleRoomCaredClick = (id) => {
    router.push(`/rooms/${id}`)
  }

  async function handleStart() {
    const createParams = {
      name: room.attributes.title,
      meetingID: room.attributes.bbbId,
      attendeePW: room.attributes.attendieePassword,
      moderatorPW: room.attributes.moderatorPassword,
      logoutUrl: new URL(window.location.href).origin,
    }
    const res = await axios.post('/api/bbb/start', createParams)
    if (res.status != 200) {
      alert('Something went wrong, Please check bbb details')
      return
    }
    const joinParams = {
      meetingID: room.attributes.bbbId,
      fullName: `${user.firstName} ${user.lastName}`,
      password: room.attributes.moderatorPassword,
    }
    const joinUrl = joinMeeting(joinParams)
    if (joinUrl) {
      window.location.href = joinUrl
    }
  }
  return (
    <Card sx={{ minWidth: 275, minHeight: 150, maxHeight: 200, boxShadow: 1 }}>
      <CardActionArea onClick={() => handleRoomCaredClick(room.id)}>
        <CardHeader
          title={room.attributes.title}
          subheader={`Last session: ${
            room.attributes.lastSessio
              ? room.attributes.lastSession
              : 'No recent sessions'
          }`}
        />
      </CardActionArea>
      <Box sx={{ mt: 2 }}>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button size="small"> Invite </Button>
          <Button
            size="small"
            onClick={() => {
              handleStart()
            }}
          >
            {' '}
            Start{' '}
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}
