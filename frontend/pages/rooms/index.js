import ResponsiveDrawer from '../../components/Shared/sidebar'
import RoomGrid from '../../components/Rooms/roomGrid'

export default function Rooms(props) {
  return (
    <ResponsiveDrawer {...props}>
      <RoomGrid {...props} />
    </ResponsiveDrawer>
  )
}
