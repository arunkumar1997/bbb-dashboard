import ResponsiveDrawer from '../components/Shared/sidebar'
import StreamingGrid from '../components/Streaming/streaming'

export default function Streaming(props) {
  return (
    <ResponsiveDrawer {...props}>
      <StreamingGrid />
    </ResponsiveDrawer>
  )
}
