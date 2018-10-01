module.exports = {
    validUserCredentials: {
      name: 'John',
      email: 'test@gmail.com',
      password: 'temp123'
    },
    invalidPassword: {
      invalidUserCredentials: {
        email: 'test@gmail.com',
        password: 'password'
      } 
    },
    invalidEmail: {
      email: 'unknown@gmail.com',
      password: 'password'
    },
    existingValidUser: {
        name: 'John',
        email: 'random@hotmail.com',
        password: 'temp123'
    },
    validRegistrationCredentials: {
      name: 'Dave',
      email: 'exam@gmail.com',
      password: 'infite123'
    },
    validJWTToken: {
      user_id: '',
      name: '',
      token: ''
    }
  }

