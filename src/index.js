import './env';

import ConfigMS from '@npm-kryptotech/configuration_center_ms';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import * as errorHandler from './middlewares/errorHandler';
import json from './middlewares/json';

const configMS = new ConfigMS();

function initConfiguration() {}

function endConfiguration() {}

async function init(app) {
  // Conexión a configuration.center-MS
  await configMS.init(process.env.app_id, process.env.app_pwd, process.env.app_env, initConfiguration, endConfiguration);

  const routes = require('./routes').default;
  const logger = configMS.getLogger();

  const APP_PORT = (process.env.node_env === 'test' ? process.env.test_app_port : process.env.app_port) || process.env.port || '3000';
  const APP_HOST = process.env.app_host || '0.0.0.0';

  app.set('port', APP_PORT);
  app.set('host', APP_HOST);

  app.locals.title = process.env.app_name;
  app.locals.version = process.env.app_version;

  app.use(cors());
  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Pass to next layer of middleware
    next();
  });
  app.use(helmet());
  app.use(compression());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(errorHandler.bodyParser);
  app.use(json);

  // API Routes
  app.use('/api', routes);

  // Security Middleware
  app.use(configMS.securityMiddleware.express);

  // Error Middlewares
  app.use(errorHandler.genericErrorHandler);
  app.use(errorHandler.methodNotAllowed);

  app.listen(app.get('port'), app.get('host'), () => {
    logger.log('info', `Server started at http://${app.get('host')}:${app.get('port')}`);
  });
}

const app = express();

init(app);

export default app;
