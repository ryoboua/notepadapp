const API_URL = process.env.REACT_APP_API_URL

const register = async userCreds => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(userCreds)
    }
    return fetch(`${API_URL}/register`, options)
            .then(res => res.json())
            .catch(e => e)
}

const login = async userCreds => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(userCreds)
    }
    return fetch(`${API_URL}/auth/login`, options)
            .then(res => res.json())
            .catch(e => e)
}

const getUser = async () => {
    const options = {
        headers : {
            authorization: `Bearer ${localStorage.npaJWT}`
        }
    }
    return fetch(`${API_URL}/users`, options)
            .then(res => res.json())
            .catch(e => e)
}

export default { register, login, getUser } 