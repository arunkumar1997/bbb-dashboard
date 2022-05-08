import { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import SchoolIcon from '@mui/icons-material/School'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import VideocamIcon from '@mui/icons-material/Videocam'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import SettingsIcon from '@mui/icons-material/Settings'
import { useRouter } from 'next/router'
const settings = ['Profile', 'Subscription', 'Need Help?', 'Logout']
const getIcon = (text) => {
  const icons = {
    Rooms: <SchoolIcon />,
    Analytics: <AnalyticsIcon />,
    Streaming: <VideocamIcon />,
    Integrations: <SchoolIcon />,
    Monitoring: <MonitorHeartIcon />,
    Settings: <SettingsIcon />,
  }
  return icons[text]
}

const drawerWidth = 240

function ResponsiveDrawer(props) {
  const { user } = props
  const router = useRouter()
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(localStorage.removeItem('userData')))
      setUser(JSON.parse(localStorage.removeItem('jwt')))
    }
    router.push('/')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const drawer = (
    <div>
      <Toolbar sx={{ flexGrow: 1, justifyContent: 'center' }}>
        <Typography sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
          Logo
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {['Rooms', 'Analytics', 'Integrations', 'Streaming', 'Monitoring'].map(
          (text, index) => (
            <ListItem
              button
              key={text}
              className={
                router.pathname.includes(text.toLowerCase())
                  ? 'Mui-selected'
                  : ''
              }
            >
              <ListItemIcon>{getIcon(text)}</ListItemIcon>
              <Link href={`/${text.toLocaleLowerCase()}`}>
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ),
        )}
      </List>
      <Divider />
      <List>
        {['Settings'].map((text, index) => (
          <ListItem
            button
            key={text}
            className={
              router.pathname === `/${text.toLocaleLowerCase()}`
                ? 'Mui-selected'
                : ''
            }
          >
            <ListItemIcon>{getIcon(text)}</ListItemIcon>
            <Link href={`/${text.toLocaleLowerCase()}`}>
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            flexGrow: 1,
            justifyContent: { xs: 'space-between', sm: 'end' },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sx: 'block', sm: 'none' } }}
          >
            Logo
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={`${user.firstName} ${user.lastName}`}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem key="Subscription" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Subscription</Typography>
              </MenuItem>
              <MenuItem key="NeedHelp" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Need Help?</Typography>
              </MenuItem>
              <MenuItem key="Logout" onClick={handleLogout}>
                <Typography textAlign="center"> Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default ResponsiveDrawer
