import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import RoomRecordingTable from '../Rooms/roomRecordings'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useState, forwardRef } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import { updateRoom } from '../../services/roomServices'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function RoomDetails({ room, jwt, roomId }) {
  const router = useRouter()
  const [value, setValue] = useState(0)
  const [showAlert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState(
    'Room Setting Updated Successfully'
  )
  const [error, setError] = useState(false)
  const [disableSaveButton, setSaveButton] = useState(true)
  const [state, setState] = useState(room.roomSettings)

  const handleCheckBoxChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.checked })
    setSaveButton(false)
  }

  const handleSave = async () => {
    const res = await updateRoom(roomId, { roomSettings: state }, jwt)
    if (res.statsCode == 200) {
      setAlert(true)
      setSaveButton(true)
    }
    if (res.statsCode != 200) {
      setAlertMessage(res.errorMessage)
      setError(true)
      setAlert(true)
      setSaveButton(true)
    }
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => {
          setAlert(false)
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={() => {
            setAlert(false)
          }}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={2}
      >
        <Stack
          spacing={2}
          sx={{ mb: 3 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ArrowBackIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => router.back()}
            color="primary"
          />
          <Stack
            spacing={2}
            sx={{ mb: 3 }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {value == 0 ? (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpen(true)
                  }}
                  endIcon={<PlayArrowIcon />}
                >
                  Start
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpen(true)
                  }}
                  endIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button
                disabled={disableSaveButton}
                variant="contained"
                onClick={handleSave}
                endIcon={<SaveIcon />}
              >
                Save
              </Button>
            )}
          </Stack>
        </Stack>
        <Box sx={{ justifyContent: 'flex-start', mb: 4 }}>
          <Typography variant="h4" gutterBottom component="div">
            {room.title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {room.description}
          </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Recordings" {...a11yProps(0)} />
              <Tab label="Room Settings" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <RoomRecordingTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ display: 'flex' }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.record}
                        onChange={handleCheckBoxChange('record')}
                        name="Enable recording"
                      />
                    }
                    label="Enable recording"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.muteOnStart}
                        onChange={handleCheckBoxChange('muteOnStart')}
                        name="Mute on start"
                      />
                    }
                    label="Mute on start"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.skipAudioCheck}
                        onChange={handleCheckBoxChange('skipAudioCheck')}
                        name="Skip audio check"
                      />
                    }
                    label="Skip audio check"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.chatStartClosed}
                        onChange={handleCheckBoxChange('chatStartClosed')}
                        name="Chat start closed"
                      />
                    }
                    label="Chat start closed"
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </TabPanel>
        </Box>
      </Stack>
    </Box>
  )
}
