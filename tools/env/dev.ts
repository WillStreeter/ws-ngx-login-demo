import { EnvConfig } from './env-config.interface';


/*
  The following is used when developing with docker

 */
const DevConfig: EnvConfig = {
  ENV: 'DEV',
  API: 'api',
  HOST: 'http://localhost',
  PORT: '80'
};

export = DevConfig;

