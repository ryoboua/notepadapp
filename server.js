import config from './config/config'
import app from './config/app.js';
import mongoose from 'mongoose';
import User from './models/user.model';

const mongoURI = config.mongo.host;
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo DB')
  })
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoURI}`);
});
  
app.listen(3000, () => {
    console.log('Server is up! port 3000')
})



const intializedDatabase = async () => {
    //await User.remove({})
    // const testUser1 = new User({
    //     name: 'John',
    //     email: 'test@gmail.com',
    //     password: 'temp123',
    //     notes: [
    //         { 
    //             title: 'Note1',
    //             content: 'long text...',
    //          },
    //     ]
    // })
    // const user = await testUser1.save()
}
intializedDatabase()

module.exports = app