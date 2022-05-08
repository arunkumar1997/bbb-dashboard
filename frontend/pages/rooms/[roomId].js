import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ResponsiveDrawer from "../../components/Shared/sidebar";
import RoomDetails from "../../components/Rooms/roomDetails";
import { getRoomById } from "../../services/roomServices";

export default function Room(props) {
  const router = useRouter();
  const { roomId } = router.query;
  const [room, setRoom] = useState({});
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState({});
  const fetchRoomById = async (id) => {
    try {
      const res = await getRoomById(id);
      setRoom(res);
      setLoading(false);
    } catch (error) {
      setRoom(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(localStorage.getItem('userData')))
    }
    if (!router.isReady) return;
    fetchRoomById(parseInt(roomId));
  }, [router.isReady]);

  return (
    <ResponsiveDrawer {...props} user={user}>
      {loading ? (
        "Loading.."
      ) : room ? (
        <RoomDetails room={room} />
      ) : (
        "No Room found"
      )}
    </ResponsiveDrawer>
  );
}
