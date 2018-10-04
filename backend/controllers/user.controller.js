import User from '../models/user.model'
import { sendAPIError } from '../helpers/APIError'


function createUser(req, res, next) {
    const { name, email , password } = req.body
    const user = new User({
        name,
        email,
        password,
    })
    user.save(function(err, result){
        if (err) {
            sendAPIError(err.errors.email.message, 400, next)
        } else {
            //remove password from user payload
            result.password = undefined
            req.user = result
            next()
        }
    })
}
function createUserResponse(req, res, next) {
    if (req.user && req.token) {
        res.json({
            user: req.user,
            JWT: req.token,
        })
    } else {
        next()
    }
}

function updateUser(req, res, next) {
    const { user_id } = req;
    const { name, email , password } = req.body
 
    User.findById(user_id, function(err, user) {
        if (err) {
            sendAPIError(err, 400, next)
        } else if (user) {
            user.set({
                name,
                email,
                password,
            })
            user.save(function(err, updatedUser) {
                if (err) {
                    sendAPIError(err, 400, next)
                } else {
                    //remove password from user payload
                    updatedUser.password = undefined
                    req.user = updatedUser;
                    next()   
                }
            })
                } else {
                    sendAPIError('Unable to update user', 400, next)
        }
    })
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
    User.findById({ _id: user_id}, function(err, user){
        if (err) {
            sendAPIError(err, 400, next)
        } else if (user){
            const { title, content, backgroundColor } = req.body
            const updatedNote = user.notes.id(req.params.note_id)
            updatedNote.title = title
            updatedNote.content = content
            updatedNote.backgroundColor = backgroundColor
            user.notes.map ( note => {
                if(note.id === updatedNote.id) {
                    return updatedNote
                } else {
                    return note
                }
            } )
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
    updateUser, 
    createUserResponse,
    createNote,
    updateNote,
    deleteNote,
}