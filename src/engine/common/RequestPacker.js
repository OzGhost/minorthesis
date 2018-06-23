
class RequestPacker {

  packAsPost = data => ({
    method: 'POST',
    ...this.packBody(data)
  })

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

  packAsPut = data => ({
    method: 'PUT',
    ...this.packBody(data)
  })

  packAsDelete = () => ({
    method: 'DELETE',
    headers: this.buildHeader()
  })
}

export default new RequestPacker

