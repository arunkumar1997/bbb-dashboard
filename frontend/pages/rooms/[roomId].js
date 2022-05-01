import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ResponsiveDrawer from "../../components/Shared/sidebar";
import RoomDetails from "../../components/Rooms/roomDetails";
import { getRoomById } from "../../services/roomServices";

export default function Room() {
  const router = useRouter();
  const { roomId } = router.query;
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState({});
  const fetchRoomById = async (id) => {
    try {
      const res = await getRoomById(id);
      setRoom(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setRoom(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchRoomById(parseInt(roomId));
  }, [router.isReady]);

  return (
    <ResponsiveDrawer>
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
