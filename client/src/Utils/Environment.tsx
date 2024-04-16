export const {
  NODE_ENV: VITE_NODE_ENV,
  VITE_USER_NODE_ENV,
  VITE_API_URL,
  VITE_CLIENT_URL,
  VITE_SHUAL_DOMAIN,
  VITE_TOKEN,
  VITE_STATIC_KEY,
  VITE_MODULE_KEY,
  MODE,
} = import.meta.env;

export const NODE_ENV = VITE_NODE_ENV || process.env.NODE_ENV || VITE_USER_NODE_ENV || MODE;
export const isEnvProduction = NODE_ENV === 'preProduction' || NODE_ENV === 'production';
export const isEnvTest = NODE_ENV === 'test';
export const IS_ENV_DEVELOPMENT = NODE_ENV === 'development' || NODE_ENV === 'developmentLocal';
export const CLIENT_URL = VITE_CLIENT_URL;
export const SHUAL_DOMAIN = VITE_SHUAL_DOMAIN;
export const TOKEN = VITE_TOKEN;
