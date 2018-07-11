import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

const renderToolList = (props) => (
  <div>
    <ListItem button onClick={() => { props.alert.show('Oh look, an alert!') }}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="俱樂部資料表" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="裁判資料表" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="會員資料表" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="員工資料表" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="報表" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="桌次現況" />
    </ListItem>
  </div>
);


export default renderToolList