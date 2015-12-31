const pendingRequests = Object.create(null)

export const requestJsonAsync = async (url, data = {}) => {
  const key = JSON.stringify({data, url}) // TODO: nondeterministic!

  try {
    const pendingRequest = pendingRequests[key] || new Promise((resolve, reject) => {
      const xhr = new window.XMLHttpRequest()

      xhr.onerror = error => reject(error)

      xhr.onload = () => {
        const {responseText, status} = xhr

        try {
          const result = JSON.parse(responseText)

          if (status >= 200 && status < 400) {
            resolve(result)
          } else {
            reject(new Error(result.error))
          }
        } catch (error) {
          reject(error)
        }
      }

      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(data))
    })

    pendingRequests[key] = pendingRequest

    return await pendingRequest
  } finally {
    delete pendingRequests[key]
  }
}
