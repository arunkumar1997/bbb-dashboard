import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import { createRoom } from '../../services/roomServices'
import * as crypto from 'crypto-js'

export default function CustomizedDialogs({ open, handleModalClose }) {
  const [loading, setLoading] = useState(false)
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
    const res = await createRoom({
      title: values.title,
      description: values.description,
      moderatorPassword: values.moderatorPassword,
      attendieePassword: values.attendieePassword,
      bbbId: crypto.randomBytes(8).toString('hex'),
    })
    console.log(res)
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
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Room Description"
            type="description"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="moderatorPassword"
            label="Moderator Password"
            type="moderatorPassword"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="attendieePassword"
            label="Attendiee Password"
            type="attendieePassword"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleModalClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
