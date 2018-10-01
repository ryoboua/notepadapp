import Joi from 'joi';

//POST /register
const createUser = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}
//POST /userId
const updateUser = {
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
//POST /notes
const createNote = {
    body: {
        title: Joi.string().required(),
        content:Joi.string().required(),
        created: Joi.string().isoDate().default(Date.now()),
        backgroundColor: Joi.string().default('#ffffff'),
    }
}

module.exports = { createUser, login, updateUser, createNote }