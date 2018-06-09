
class RequestPacker {

  packBody = data => ({
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

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

