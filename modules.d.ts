// Define types for our .env
declare namespace NodeJS {
  export interface ProcessEnv {
    REDIS_URL: string;
    REDIS_PORT: string;
    REDIS_PASSWORD: string;
    PORT: string;
    MONGODB_URI: string;
    MONGODB_USER: string;
    MONGODB_PASS: string;
    SILENT: string;
    NICE: string;
  }
}
