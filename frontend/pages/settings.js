import ResponsiveDrawer from '../components/Shared/sidebar'
import SettingsGrid from '../components/Settings/settings'

export default function Settings(props) {
  return (
    <ResponsiveDrawer {...props}>
      <SettingsGrid />
    </ResponsiveDrawer>
  )
}
