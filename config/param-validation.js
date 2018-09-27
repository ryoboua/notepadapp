import Joi from 'joi';

//POST /register
const createUser = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}
const login = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}

export default { createUser, login }