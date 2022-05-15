import { useState, useEffect } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createRoom } from '../../services/roomServices'
import cryptoRandomString from 'crypto-random-string'

export default function CreateRoomMoadal(props) {
  const [loading, setLoading] = useState(false)
  const { open, handleModalClose, jwt, user } = props
  const [errors, setErrors] = useState('')
  const [values, setValues] = useState({
    title: '',
    description: '',
    moderatorPassword: '',
    attendieePassword: '',
  })

  const handleChange = (prop) => (event) => {
    if (errors) setErrors('')
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleCreateRoom = async () => {
    setLoading(true)
    const bbbId = `${cryptoRandomString({ length: 10 })}-${cryptoRandomString({
      length: 4,
    })}`
    const res = await createRoom(
      {
        title: values.title,
        description: values.description,
        moderatorPassword: values.moderatorPassword,
        attendieePassword: values.attendieePassword,
        bbbId: bbbId,
        owner: user.id,
        roomSettings: {
          record: true,
          muteOnStart: false,
          skipAudioCheck: false,
          chatStartClosed: false,
        },
      },
      jwt
    )
    if (res.statsCode === 200) {
      setLoading(false)
      handleModalClose()
    } else if (res.statusCode === 400) {
      setErrors(res.errorMessage)
      setLoading(false)
    } else {
      setErrors('Something went wrong. Please try again after some time')
      setLoading(false)
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleModalClose}>
        <DialogTitle>Create a new room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Room Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange('title')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Room Description"
            type="description"
            fullWidth
            variant="standard"
            onChange={handleChange('description')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="moderatorPassword"
            label="Moderator Password"
            type="moderatorPassword"
            fullWidth
            variant="standard"
            onChange={handleChange('moderatorPassword')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="attendieePassword"
            label="Attendiee Password"
            type="attendieePassword"
            fullWidth
            variant="standard"
            onChange={handleChange('attendieePassword')}
          />
        </DialogContent>
        <Typography component="div" sx={{ color: 'red' }}>
          {errors}
        </Typography>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <LoadingButton
            onClick={handleCreateRoom}
            loading={loading}
            variant="contained"
          >
            Create Class
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
