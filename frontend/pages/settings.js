import Box from '@mui/material/Box'
import ResponsiveAppBar from '../components/Shared/appBar'
import SettingsGrid from '../components/Settings/settings'

export default function Settings(props) {
  return (
    <>
      <ResponsiveAppBar {...props} />
      <Box sx={{ p: 3 }}>
        <SettingsGrid />
      </Box>
    </>
  )
}
