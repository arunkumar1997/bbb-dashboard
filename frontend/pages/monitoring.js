import ResponsiveDrawer from '../components/Shared/sidebar'
import MonitoringGrid from '../components/Monitoring/monitoring'

export default function Monitoring(props) {
  return (
    <ResponsiveDrawer {...props}>
      <MonitoringGrid />
    </ResponsiveDrawer>
  )
}
