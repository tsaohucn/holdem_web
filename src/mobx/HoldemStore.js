import { configure, observable, decorate, action } from 'mobx'

configure({ 
  enforceActions: true,
  isolateGlobalState: false 
})

class HoldemStore {

  constructor() {
    this.isAuth = false
    this.resource = null
    this.account = null
  }

  setUser = action((isAuth,resource,account) => {
    this.isAuth = isAuth
    this.resource = resource
    this.account = account
  })
}

decorate(HoldemStore, {
  isAuth: observable,
  resource: observable,
  account: observable
})

export default HoldemStore