import React, { Component } from 'react'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import StarIcon from '@material-ui/icons/Star'
import SendIcon from '@material-ui/icons/Send'
import MailIcon from '@material-ui/icons/Mail'
import DeleteIcon from '@material-ui/icons/Delete'
import ReportIcon from '@material-ui/icons/Report'

const Icon = (props) => {
  const components = {
      InboxIcon,
      DraftsIcon,
      StarIcon,
      SendIcon,
      MailIcon,
      DeleteIcon,
      ReportIcon
  }

  const {
    tag
  } = props ? props : {}

  const TagName = components[tag || 'InboxIcon']
  return <TagName/>
}
/*
class Icon extends Component {

  components = {
      InboxIcon,
      DraftsIcon,
      StarIcon,
      SendIcon,
      MailIcon,
      DeleteIcon,
      ReportIcon
  }

  render() {
     const TagName = this.components[this.props.tag || 'InboxIcon']
     return <TagName/>
  }
}
*/
export default Icon