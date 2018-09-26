import app from './config/app.js';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import User from './models/user.model';

const mongoURI = 'mongodb://localhost/notepadapp';
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo DB')
  })
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoURI}`);
});
  
app.listen(3000, () => {
    console.log('Server is up! ', httpStatus.OK)
})

const intializedDatabase = async () => {
    // await User.remove( {} )

    const testUser1 = new User({
        name: 'Reggie',
        email: 'ryoboua@gmail.com',
        password: 'password'
    })
    testUser1.save()
    

    // const testUser2 = new User({
    //     name: 'Reggie1',
    //     email: 'ryoboua@gmail.com',
    //     password: 'ttt'
    // })
    //testUser2.save()
}

intializedDatabase()