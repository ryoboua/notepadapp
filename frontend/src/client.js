let API_URL = 'http://localhost:3030'

if (process.env.NODE_ENV === "production") {
    API_URL = 'http://notepadapp.whoisreggie.ca/api'
}

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
        .catch(e => console.log(e))
}

const createDemoUser = async name => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name })
    }
    return fetch(`${API_URL}/register/demouser`, options)
        .then(res => res.json())
        .catch(e => console.log(e))
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
        .catch(e => console.log(e))
}

const updateAcc = async userCreds => {
    console.log(userCreds)
    const options = {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${localStorage.npaJWT}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCreds)
    }
    return fetch(`${API_URL}/users/${userCreds.id}`, options)
        .then(res => res.json())
        .catch(e => console.log(e))
}

const getUser = async () => {
    const options = {
        headers: {
            'authorization': `Bearer ${localStorage.npaJWT}`
        },
    }
    return fetch(`${API_URL}/users`, options)
        .then(res => res.json())
        .catch(e => console.log(e))
}

const createNote = async (userId, note) => {
    const options = {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${localStorage.npaJWT}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    }
    return fetch(`${API_URL}/users/${userId}/notes`, options)
        .then(res => res.json())
        .catch(e => console.log(e))
}

const updateNote = async (userId, note) => {
    const options = {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${localStorage.npaJWT}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    }
    return fetch(`${API_URL}/users/${userId}/notes/${note._id}`, options)
        .then(res => res.json())
        .catch(e => console.log(e))
}
const deleteNote = async (userId, note) => {
    const options = {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${localStorage.npaJWT}`,
        },
    }
    return fetch(`${API_URL}/users/${userId}/notes/${note._id}`, options)
        .then(res => res.json())
        .catch(e => console.log(e))
}
export default { register, createDemoUser, login, updateAcc, getUser, createNote, updateNote, deleteNote } 