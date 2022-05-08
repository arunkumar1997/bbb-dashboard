import ResponsiveDrawer from "../components/Shared/sidebar";
import StreamingGrid from "../components/Streaming/streaming";
import { useState, useEffect } from 'react'

export default function Streaming(props) {
    const [user, setUser] = useState({})
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])
    return (
        <ResponsiveDrawer  {...props} user={user}>
            <StreamingGrid />
        </ResponsiveDrawer>
    );
}
