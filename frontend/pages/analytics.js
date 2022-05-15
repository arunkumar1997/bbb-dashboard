import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import ResponsiveAppBar from '../components/Shared/appBar'
import AnalyticsGrid from '../components/Analytics/analytics'

export default function Analytics(props) {
  const [user, setUser] = useState({})
  const [jwt, setJWT] = useState({})
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')))
    setJWT(localStorage.getItem('jwt'))
  }, [])
  return (
    <>
      <ResponsiveAppBar user={user} />
      <Box sx={{ p: 3 }}>
        <AnalyticsGrid jwt={jwt} />
      </Box>
    </>
  )
}
