import { host } from './Constants'

class Cacher {
  role = -1
  targetOfUse = []

  loadTOU() {
    if (this.targetOfUse.length > 1)
      return
    fetch(host+'/target-of-use')
    .then(res=>res.json())
    .then(res=>this.targetOfUse=res)
  }
  
  setRole = role => { 
    this.role = role
  }

  getRole = () => this.role

  getTOUByCode = code => {
    const len = this.targetOfUse.length
    for(let i = 0; i < len; i++)
      if (this.targetOfUse[i].code === code)
        return this.targetOfUse[i].name
    return code
  }
}

export default new Cacher
