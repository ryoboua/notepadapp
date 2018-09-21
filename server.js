import app from './config/app.js';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost/notepadapp';
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo DB')
  })
mongoose.connection.on('error', () => {
    console.log(`unable to connect to database: ${mongoUri}`)
    //throw new Error(`unable to connect to database: ${mongoUri}`);
});
  

app.listen(3000, () => {
    console.log('Server is up! ', httpStatus.OK)
})