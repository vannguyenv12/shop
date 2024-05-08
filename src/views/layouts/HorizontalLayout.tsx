import { NextPage } from 'next'

// ** MUI
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import IconifyIcon from 'src/components/Icon'
import UserDropdown from 'src/components/user-dropdown'
import { useAuth } from 'src/hooks/useAuth'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

type TProps = {
  open: boolean
  toggleDrawer: () => void
  isHideMenu?: boolean
}

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHideMenu }) => {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <AppBar position='absolute' open={open}>
      <Toolbar
        sx={{
          pr: '24px' // keep right padding when drawer closed
        }}
      >
        {isHideMenu && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <IconifyIcon icon='ic:round-menu' />
          </IconButton>
        )}
        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        {user ? (
          <UserDropdown />
        ) : (
          <Button
            type='submit'
            variant='contained'
            sx={{ width: 'auto' }}
            onClick={() => router.push(ROUTE_CONFIG.LOGIN)}
          >
            Sign In
          </Button>
        )}
        {/* <IconButton color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <IconifyIcon icon='iconamoon:notification' />
          </Badge>
        </IconButton> */}
      </Toolbar>
    </AppBar>
  )
}

export default HorizontalLayout
