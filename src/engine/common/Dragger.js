class Dragger {

  trap = e => {
    this._target = e.target.parentNode
    this._prevTop = this._target.style.top
    this._prevLeft = this._target.style.left

    this._prevTop = +this._prevTop.substring(0, this._prevTop.length - 2)
    this._prevLeft = +this._prevLeft.substring(0, this._prevLeft.length - 2)

    this._prevCursorPosition= this.getCursorPosition(e)

    document.addEventListener('mousemove', this.drag)
    document.addEventListener('mouseup', this.release)
  }

  getCursorPosition = event => {
    return {
      x: event.pageX,
      y: event.pageY
    }
  }

  drag = e => {
    var currentCursorPosition = this.getCursorPosition(e)

    var dx = currentCursorPosition.x - this._prevCursorPosition.x
    var dy = currentCursorPosition.y - this._prevCursorPosition.y

    var nextTop = this._prevTop + dy
    var nextLeft = this._prevLeft + dx

    // moving target
    this._target.style.top = nextTop + 'px'
    this._target.style.left = nextLeft + 'px'

    this._prevTop = nextTop
    this._prevLeft = nextLeft
    this._prevCursorPosition = currentCursorPosition
  }

  release = () => {
    document.removeEventListener('mousemove', this.drag)
    document.removeEventListener('mouseup', this.release)
  }
}

export default (new Dragger).trap

