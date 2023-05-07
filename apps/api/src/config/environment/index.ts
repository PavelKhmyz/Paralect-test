import { configUtil } from 'utils';

const env = process.env.APP_ENV || 'development';

const base = {
  env,
  port: process.env.PORT || 3001,
  isDev: env === 'development' || env === 'development-docker',
  mongo: {
    connection: process.env.MONGO_CONNECTION || '',
    dbName: '',
  },
  apiUrl: '',
  webUrl: '',
  redis:
    process.env.REDIS_CONNECTION ||
    'redis://:super-secured-password@redis-master.redis.svc.cluster.local:6379',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  cloudStorage: {
    credentials: {
      projectId: process.env.CLOUD_STORAGE_PROJECT_ID || '',
      clientEmail: process.env.CLOUD_STORAGE_CLIENT_EMAIL || '',
      privateKey: process.env.CLOUD_STORAGE_PRIVATE_KEY || '',
    },
    storageBucket: process.env.CLOUD_STORAGE_BUCKET || '',
    databaseURL: process.env.CLOUD_STORAGE_URL || '',
  },
  adminKey: process.env.ADMIN_KEY || '',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  mixpanel: {
    apiKey: process.env.MIXPANEL_API_KEY || '',
  },
};

const config = configUtil.loadConfig(base, env, __dirname);

export default config;
