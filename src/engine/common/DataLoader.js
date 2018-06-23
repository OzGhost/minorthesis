
class DataLoader {
  load = (target, locate, value) => {
    const output = this.deepClone(target)
    let node = output
    const nodeNames = this.resolveLocation(locate)
    const valueNodeIndex = nodeNames.length - 1
    for (let i = 0; i < valueNodeIndex; i++) {
      node[nodeNames[i]] = node[nodeNames[i]] || {}
      node = node[nodeNames[i]]
    }
    node[nodeNames[valueNodeIndex]] = value
    return output
  }

  resolveLocation = locate => {
    return (''+locate).split('.')
  }

  deepClone = obj => {
    return JSON.parse(JSON.stringify(obj))
  }

  retrieve = (source, locate) => {
    if (typeof(source) === 'undefined')
      return undefined
    let node = source
    const nodeNames = this.resolveLocation(locate)
    const len = nodeNames.length
    for (let i = 0; i < len; i++) {
      if (node[nodeNames[i]])
        node = node[nodeNames[i]]
      else
        return undefined
    }
    return node
  }
}

export default new DataLoader
