import ResponsiveDrawer from "../components/Shared/sidebar";
import RoomGrid from "../components/Rooms/roomGrid";

export default function Rooms() {
  return (
    <ResponsiveDrawer>
      <RoomGrid />
    </ResponsiveDrawer>
  );
}
