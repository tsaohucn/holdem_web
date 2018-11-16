import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PersonIcon from '@material-ui/icons/Person'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CircularProgress from '@material-ui/core/CircularProgress'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import Search from '@material-ui/icons/Search'
// local components
import Icon from '../views/Icon'
import ui from '../configs/ui'

const height = window.innerHeight
const width = window.innerWidth
const drawerWidth = 240

const styles = theme => {
  return({
    root: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      flex: 1
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    'appBarShift-left': {
      marginLeft: drawerWidth,
    },
    'appBarShift-right': {
      marginRight: drawerWidth,
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    hide: {
      display: 'none',
    },
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
      height: '100%'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    topBlock: {
      ...theme.mixins.toolbar
    },
    contentPaper: {
      position: 'relative',
      width: width - drawerWidth,
      height: '100%'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#ffffff',
      padding: theme.spacing.unit * 2,
      overflow: 'scroll',
      "@media (min-width:0px) and (orientation: landscape)": { height: height - 48 },
      "@media (min-width:600px)": { height: height - 64 },
      height: height - 56,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    'content-left': {
      marginLeft: -drawerWidth,
    },
    'content-right': {
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    'contentShift-left': {
      marginLeft: 0,
    },
    'contentShift-right': {
      marginRight: 0,
    },
    id: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 5,
      lineHeight: 'normal'
    },
    title: {
      marginTop: 'auto',
      marginBottom: 'auto',
      lineHeight: 'normal'
    },
    separate: {
      marginTop: 'auto',
      marginBottom: 'auto',
      lineHeight: 'normal',
      marginLeft: 5,
      marginRight: 5,
      color: '#000000'
    },
    ListItem: {
      marginTop: 'auto'
    },
    silderBarText: {
      marginTop: 'auto',
      marginBottom: 'auto',
      lineHeight: 'normal'
    },
    information: {
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'row'
    }
  })}

class NavigationComponent extends PureComponent {
  state = {
    open: false,
    anchor: 'left',
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    })
  }

  logout = () => {
    this.props.HoldemStore.setUser({
      isAuth: false,
      resource: null,
      id: null,
      account: null,
      password: null,
      clubId: null
    }) 
  }

  goToInformationPage = () => {
    this.props.history.push('/informations/index')
  }

  getUserResource = (user) => {
    switch(user) {
    case 'admins': {
      return '最高權限管理員'
    }
    case 'clubs': {
      return '俱樂部管理員'
    }
    case 'employees': {
      return '員工'
    } 
    case 'referees': {
      return '裁判'
    }
    case 'sales': {
      return '業務'
    }
    default: {
      return '匿名'
    }     
    }
  }

  getRouter = (user) => {
    switch(user) {
    case 'admins': {
      return ui.adminsRouter
    }
    case 'clubs': {
      return ui.clubsRouter
    }
    case 'employees': {
      return ui.employeesRouter
    }
    case 'referees': {
      return ui.refereesRouter
    }
    case 'sales': {
      return ui.salesRouter
    }
    default: {
      return {}
    }    
    }    
  }

  renderSilderBar = () => {       
    const router = this.getRouter(this.props.HoldemStore.resource)
    const router_path = Object.keys(router)
    const router_name = Object.values(router)
    return(
      router_path.map((path,index) => (
        <ListItem className={this.props.classes.ListItem} key={path} button onClick={() => this.props.history.push('/' + path + '/index')}>
          <ListItemIcon>
            <Search/>
          </ListItemIcon>
          <p className={this.props.classes.silderBarText}>{router_name[index]}</p>
        </ListItem>
      ))
    )     
  }

  render() {
    const { classes, theme } = this.props
    const { anchor, open } = this.state
    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classNames(classes.drawerHeader)}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          { this.renderSilderBar() }
        </List>
        <ListItem className={classNames(classes.ListItem)} button onClick={this.logout}>
          <ListItemIcon>
            <PowerSettingsNew/>
          </ListItemIcon>
          <p className={classNames(classes.silderBarText)}>{'登出'}</p>
        </ListItem>
      </Drawer>
    )

    return (
      <div className={classNames(classes.root)}>
        <div>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes['appBarShift-left']]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <div className={classNames(classes.information)}>
              <p className={classNames(classes.id)}>{this.props.HoldemStore.id}</p>
            </div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.goToInformationPage}
              className={classNames(classes.logoutButton)}
            >
              <PersonIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        </div>
        {drawer}
        <div className={classNames(classes.contentPaper)}>
          <div className={classNames(classes.topBlock)}/>
          <main
            className={classNames(classes.content, classes['content-left'], {
              [classes.contentShift]: open,
              [classes['contentShift-left']]: open,
            })}
          >
            { this.props.children }
          </main>
        </div>
      </div>
    )
  }
}

NavigationComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default inject('HoldemStore')(withStyles(styles, { withTheme: true })(NavigationComponent))