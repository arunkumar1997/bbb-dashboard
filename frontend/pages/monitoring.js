import ResponsiveDrawer from '../components/Shared/sidebar'
import MonitoringGrid from '../components/Monitoring/monitoring'
import { useState, useEffect } from 'react'

export default function Monitoring(props) {
    const [user, setUser] = useState({})
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUser(JSON.parse(localStorage.getItem('userData')))
        }
    }, [])
    return (
        <ResponsiveDrawer {...props} user={user}>
            <MonitoringGrid />
        </ResponsiveDrawer>
    )
}
