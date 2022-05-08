import ResponsiveDrawer from "../components/Shared/sidebar";
import SettingsGrid from "../components/Settings/settings";
import { useState, useEffect } from 'react'

export default function Settings(props) {
        const [user, setUser] = useState({})
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUser(JSON.parse(localStorage.getItem('userData')))
        }
    }, [])
    return (
        <ResponsiveDrawer {...props} user={user}>
            <SettingsGrid />
        </ResponsiveDrawer>
    );
}
