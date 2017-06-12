import { EnvConfig } from './env-config.interface';

/*
  The following is used when developing with docker
 */
// const DevConfig: EnvConfig = {
//   ENV: 'DEV',
//   API: 'api',
//   HOST: 'http://localhost',
//   PORT: '80'
// };
/*
  The following is used for the demo using blog/demo
 */
const DevConfig: EnvConfig = {
  ENV: 'DEV',
  API: 'api',
  HOST: 'http://localhost',
  PORT: '5555'
};
export = DevConfig;

