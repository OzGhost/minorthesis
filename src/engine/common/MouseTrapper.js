
class MouseTrapper {

  position = undefined
  
  trap =  (event) =>  {
    this.position = {}
    this.position.x = event.pageX
    this.position.y = event.pageY
  }

  getTrappedPosition = () => {
    let pos = {...this.position}
    this.position = undefined
    return pos
  }
}

export default new MouseTrapper

