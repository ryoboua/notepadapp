const baseURL = 'http://localhost:3000'

const register = async userCreds => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userCreds)
    }
    return fetch(`${baseURL}/register`, options)
            .then(res => res.json())
            .catch(e => console.log(e))
}

export default { register }