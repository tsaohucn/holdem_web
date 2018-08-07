import { configure, observable, decorate } from 'mobx'

configure({ 
  enforceActions: true,
  isolateGlobalState: false 
})

class Holdem {

  constructor() {
    this.user = "none"
  }

  setUser = (user) => {
    this.user = user
  }

}

decorate(Holdem, {
  user: observable
})

const HoldemStore = new Holdem()
export default HoldemStore