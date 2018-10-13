import React, { PureComponent } from 'react'
// local components
import ChangeAccount from '../views/ChangeAccount'

class AccountComponent extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <ChangeAccount
                {...this.props}
            />
        )
    }
}

export default AccountComponent