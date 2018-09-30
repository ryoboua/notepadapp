import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import expressValidation from 'express-validation';
import helmet from 'helmet';
import router from '../routes/index.route.js';
//import config from './config';
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

app.use(morgan('dev'))

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use('/', router)


//catch errors
app.use((err,req, res, next) => {
    if (err.status && err.message) {
        //known errors
        const { status, message } = err
        res.status(status).json({ 
            status,
            message
        })
    } else {
        //unkown errors
        res.status(500).send(err)
    }
  });




module.exports = app;
