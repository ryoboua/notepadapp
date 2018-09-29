module.exports = {
    validCredentials: {
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
        email: 'test@gmail.com',
        password: 'temp123'
    }
  }

