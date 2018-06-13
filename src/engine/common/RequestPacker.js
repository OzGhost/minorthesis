
class RequestPacker {

  packBody = data => ({
    body: JSON.stringify(data),
    headers: this.buildHeader()
  })

  buildHeader = () => {
    const token = localStorage ? localStorage.getItem('token') : undefined
    return token
      ? {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
      : {
        'Content-Type': 'application/json'
      }
  }

  packAsPost = data => ({
    method: 'POST',
    ...this.packBody(data)
  })

  packAsPut = data => ({
    method: 'PUT',
    ...this.packBody(data)
  })
}

export default new RequestPacker

