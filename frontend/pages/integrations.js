import ResponsiveDrawer from '../components/Shared/sidebar'
import IntegrationsGrid from '../components/Integrations/integrations'

export default function Integrations(props) {
  return (
    <ResponsiveDrawer {...props}>
      <IntegrationsGrid />
    </ResponsiveDrawer>
  )
}
