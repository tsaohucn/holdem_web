import { configure, observable, decorate, action } from 'mobx'

configure({ 
  enforceActions: true,
  isolateGlobalState: false 
})

class HoldemStore {

  constructor() {
    this.isAuth = false
    this.resource = null
    this.id = null
  }

  setUser = action((isAuth,resource,id) => {
    this.isAuth = isAuth
    this.resource = resource
    this.id = id
  })
}

decorate(HoldemStore, {
  isAuth: observable,
  resource: observable,
  id: observable
})

export default HoldemStore