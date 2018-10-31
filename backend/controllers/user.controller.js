import User from '../models/user.model'
import { demoUserPassword } from '../config/config'
import { shouldPasswordBeUpdated } from '../helpers/user.helper'
import { sendAPIError } from '../helpers/APIError'



function createUser(req, res, next) {
    const { name, email , password } = req.body
    const user = new User({
        name,
        email,
        password,
    })
    user.save(function(err, result){
        if (err && err.errors.email) { 
            sendAPIError(err.errors.email.message, 400, next, 'email')
        } 
        else if (err && err.errors.password) {
            sendAPIError(err.errors.password.message, 400, next, 'password')
        } 
        else if (err) {
            sendAPIError(err, 500, next)
        } 
        else {
            //remove password from user payload
            result.password = undefined
            req.user = result
            next()
        }
    })
}

function createDemoUser(req, res, next, offset = 0) {
    const { name } = req.body
    User.countDocuments({ email: { $regex: /@whoisreggie.ca$/ }}, function(err, count){
        const user = new User({
            name,
            email: `demo${count + offset + 1}@whoisreggie.ca`,
            password: demoUserPassword,
        })
        user.save(function(err, result){
            if (err) {
                createDemoUser(req, res, next, offset + 1)
            } 
            else {
                //remove password from user payload
                result.password = undefined
                req.user = result
                req.isDemoUser = true
                next()
            }
        })
    })
}

function updateUser(req, res, next) {
    const { _id } = req.user
    const { name, email , password, newPassword_1: pass1, newPassword_2: pass2 } = req.body
        User.findById(_id, function(err, user) {
            if (err) {
                sendAPIError(err, 400, next)
            } else if (user) {
                user.comparePassword(password, function(err, matches) {
                    if (err) sendAPIError(err, 500, next)
                    if(matches) {
                        user.set({
                            name,
                            email,
                        })
                        if (shouldPasswordBeUpdated(pass1, pass2)) user.set({ password: pass1 })
                        user.save(function(err, updatedUser) {
                            if (err && err.errors.email) { 
                                sendAPIError(err.errors.email.message, 400, next, 'email')
                            } 
                            else if (err && err.errors.password) {
                                sendAPIError(err.errors.password.message, 400, next, 'password')
                            } 
                            else if (err) {
                                sendAPIError(err, 500, next)
                            } 
                            else {
                                //remove password from user payload
                                updatedUser.password = undefined
                                req.user = updatedUser;
                                next()   
                            }
                        })
                    } else {
                        sendAPIError('The password provided does not match the current password', 400, next, 'password')
                    }
                })
                    } else {
                        sendAPIError('Unable to update user', 400, next)
            }
        })
}

function createUserResponse(req, res, next) {
    if (req.user && req.token) {
        //remove password before sending user data
        req.user.password = undefined
        res.json({
            user: req.user,
            JWT: req.token,
            isDemoUser: req.isDemoUser,
        })
    } else {
        next()
    }
}

function createNote(req, res, next) {
    const user_id = req.user_id
    User.findById({ _id: user_id}, function(err, user){
        if (err) {
            sendAPIError(err, 400, next)
        } else if (user){
            const { title, content, created, lastUpdated, backgroundColor } = req.body
            // push note to notes array
            user.notes.push({
                title,
                content,
                created,
                lastUpdated,
                backgroundColor,
            })
            //save changes to db and send new array of notes
            user.save(function(err, updatedUser) {
                if (err) {
                    sendAPIError(err, 400, next)
                } else {
                    res.json({
                        notes: updatedUser.notes
                    });
                }
            })
        } else {
            sendAPIError('Unable to find user', 400, next)
        }
    })
}

function updateNote(req, res, next) {
    const user_id = req.user_id
    User.findById({ _id: user_id }, function(err, user){
        if (err) {
            sendAPIError(err, 400, next)
        } else if (user){
            //if a note is returned then update else sendAPIError
            const note = user.notes.id(req.params.note_id)

            if (note) {
                const { title, content, backgroundColor } = req.body

                note.title = title
                note.content = content
                note.backgroundColor = backgroundColor

                user.notes.map (n => n.id === note.id ? note : n)
                user.save(function(err, updatedUser) {
                    if (err) {
                        sendAPIError(err, 400, next)
                    } else {
                        res.json({
                            notes: updatedUser.notes
                        });
                    }
                })
            } else {
                sendAPIError('Unable to find note', 400, next)
            }
        } else {
            sendAPIError('Unable to find user', 400, next)
        }
    })
}

function deleteNote(req, res ,next) {
    const user_id = req.user_id
    User.findById({ _id: user_id}, function(err, user){
        if (err) {
            sendAPIError(err, 400, next)
        } else if (user){
            user.notes.id(req.params.note_id).remove()
            user.save(function(err, updatedUser) {
                if (err) {
                    sendAPIError(err, 400, next)
                } else {
                    res.json({
                        notes: updatedUser.notes
                    });
                }
            })
        } else {
            sendAPIError('Unable to find user', 400, next)
        }
    })
}
module.exports = { 
    createUser, 
    createDemoUser,
    updateUser, 
    createUserResponse,
    createNote,
    updateNote,
    deleteNote,
}