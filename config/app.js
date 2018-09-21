import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
//import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import helmet from 'helmet';
import routes from '../routes/index';
//import config from './config';
//import APIError from '../helpers/APIError';
import path from 'path';
import appRoot from 'app-root-path';
import fs from 'fs';

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
//app.use(compress());
//app.use(methodOverride());

//setup logging
const accessLogStream = fs.createWriteStream(path.join(appRoot.toString(), 'access.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))


// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

export default app;
