const checkIfEmailAlreadyInUse = function(value, isValid){
    const self = this;
    return self.constructor.findOne({ email: value })
    .exec(function(err, user){
        if(err){
            throw err;
        }
        else if(user) {
            if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
                return isValid(true);
            }
            return isValid(false);  
        }
        else{
            return isValid(true);
        }
    })
}

const shouldPasswordBeUpdated = function(pass1, pass2){
    if( (pass1 && pass2) && (pass1 === pass2) && (pass1.length >= 8 && pass2.length >= 8) ) {
        return true
    } else {
        return false
    }
}

module.exports = { checkIfEmailAlreadyInUse, shouldPasswordBeUpdated }