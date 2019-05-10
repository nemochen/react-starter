import common from './common';

// ----------------------------------
// SERVER
// ----------------------------------
const SERVER_PRODUCTION = ''; // todo: replace to production url
const SERVER_DEVELOPMENT = ''; // todo: replace to development url

const SERVER = __DEV__ ? SERVER_DEVELOPMENT : SERVER_PRODUCTION;

export default {
  ...common(SERVER)
};
