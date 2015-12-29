export const requestJsonAsync = (url, data = {}) => {
  return new Promise((resolve, reject) => {
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
}
