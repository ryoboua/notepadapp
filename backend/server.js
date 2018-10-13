import config from './config/config'
import app from './config/app.js';
import mongoose from 'mongoose'

const mongoURI = config.mongo.host
const port = config.port

mongoose.connect(mongoURI, { useNewUrlParser: true });

mongoose.connection.once('open', () => console.log('Connected to Mongo DB'))

mongoose.connection.on('error', () => { throw new Error(`unable to connect to database: ${mongoURI}`) })
  
app.listen(port, () =>  console.log('Server is up! port ' + port))

module.exports = app