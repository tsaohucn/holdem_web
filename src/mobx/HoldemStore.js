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
    this.account = null
    this.password = null
    this.clubId = null
  }

  setUser = action(({isAuth,resource,id,account,password,clubId}) => {
    this.isAuth = isAuth
    this.resource = resource
    this.id = id
    this.password = password
    this.account = account
    this.clubId = clubId
  })

}

decorate(HoldemStore, {
  isAuth: observable,
  resource: observable,
  id: observable,
  account: observable,
  password: observable,
  clubId: observable
})

export default HoldemStore