
class DeepController {

  depth = 10

  getNextDeepLevel = () => {
    this.depth++
    return this.depth
  }

  pushElement = element => {
    const target = this.findFloatingObject(element)
    if (target)
      target.style.zIndex = this.getNextDeepLevel()
    else
      console.log('cout << Target not found!')
  }

  findFloatingObject = element => {
    let node = element
    while (node.nodeName !== 'HTML' && node.className.indexOf('dialog') < 0)
      node = node.parentNode
    return node.nodeName === 'HTML' ? undefined : node
  }

}

export default new DeepController

