// node_module
import React from 'react'
import { withAlert } from 'react-alert'
import withSecret from '../../../hocs/withSecret'
import withHoldemBar from '../../../hocs/withHoldemBar'

const ClubSecretScreen = withSecret({
	test: 'ClubSecretScreen',
})

export default withHoldemBar(withAlert((ClubSecretScreen)))