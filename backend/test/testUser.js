module.exports = {
    validUserCredentials: {
      name: 'John',
      email: 'test@gmail.com',
      password: '8charsmininum'
    },
    invalidPassword: {
        email: 'test@gmail.com',
        password: 'password123'
    },
    invalidEmail: {
      email: 'unknown@gmail.com',
      password: 'password123'
    },
    existingValidUser: {
        name: 'John',
        email: 'random@hotmail.com',
        password: '8charsmininum'
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
    },
    invalidPasswordLength : {
      name: 'Dave',
      email: 'exam@yahoo.com',
      password: '1234567'
    }
  }

