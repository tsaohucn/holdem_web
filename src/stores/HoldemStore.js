import { configure, observable, decorate, action } from 'mobx'

configure({ 
  enforceActions: true,
  isolateGlobalState: false 
})

class Store {

  constructor() {
    this.isAuth = false
    this.resource = null
    this.id = null
    this.account = null
    this.password = null
    this.clubId = null
    this.clubKey = null
  }

  setUser = action(({isAuth,resource,id,account,password,clubId,clubKey}) => {
    this.isAuth = isAuth
    this.resource = resource
    this.id = id
    this.password = password
    this.account = account
    this.clubId = clubId
    this.clubKey = clubKey
  })

}

decorate(Store, {
  isAuth: observable,
  resource: observable,
  id: observable,
  account: observable,
  password: observable,
  clubId: observable,
  clubKey: observable
})

const HoldemStore = new Store()

export default HoldemStore 