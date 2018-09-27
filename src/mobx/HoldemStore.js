import { configure, observable, decorate, action } from 'mobx'

configure({ 
  enforceActions: true,
  isolateGlobalState: false 
})

class HoldemStore {

  constructor() {
    this.isAuth = false
    this.user = null
  }

  setUser = action((isAuth,user) => {
    this.isAuth = isAuth
    this.user = user
  })
}

decorate(HoldemStore, {
  isAuth: observable
})

export default HoldemStore