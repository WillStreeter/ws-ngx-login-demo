import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  API: 'api',
  HOST: 'https://ws-demo',
  PORT: '8080'
};

export = ProdConfig;

