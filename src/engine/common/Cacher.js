
class Cacher {
  role = -1
  
  setRole = role => { 
    this.role = role
  }

  getRole = () => this.role
}

export default new Cacher
