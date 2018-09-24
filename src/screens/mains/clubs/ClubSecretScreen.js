// node_module
import React from 'react'
import { withAlert } from 'react-alert'
// local components
import withSecret from '../../../hocs/withSecret'
import withNavigation from '../../../hocs/withNavigation'

const ClubSecretScreen = withSecret({
	test: 'ClubSecretScreen',
})

export default withNavigation(withAlert((ClubSecretScreen)))