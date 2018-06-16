
class MouseTrapper {

  position = undefined
  
  trap =  (event) =>  {
    this.position = {}
    this.position.x = event.pageX
    this.position.y = event.pageY
    if (!event.pageX)
      this.position = undefined
    //this.point()
  }

  point = () => {
    const tag = document.createElement('div')
    tag.style.width = '14px'
    tag.style.height = '14px'
    tag.style.background = 'rgba(255, 0, 0, 0.5)'
    tag.style.position = 'fixed'
    tag.style.top = ''+(this.position.y-7)+'px'
    tag.style.left = ''+(this.position.x-7)+'px'
    tag.style['box-shadow'] = '0 0 8px green'
    tag.style['z-index'] = '90000'
    tag.style['border-radius'] = '50%'
    document.body.appendChild(tag)
  }

  getTrappedPosition = () => {
    return this.position
  }
}

export default new MouseTrapper

