import ResponsiveDrawer from '../components/Shared/sidebar'
import AnalyticsGrid from '../components/Analytics/analytics'

export default function Analytics(props) {
  return (
    <ResponsiveDrawer {...props}>
      <AnalyticsGrid />
    </ResponsiveDrawer>
  )
}
