import { ENV_TYPE } from "@models/common";

const LOCAL_API_URL = "http://localhost:8083";
const DEVELOPMENT_API_URL = "https://dev.api.asoindex.io/";
const PRODUCTION_API_URL = "https://api.asoindex.io/";

export const getAPIByEnviorment = (): string => {
  const env: ENV_TYPE = (process.env.REACT_APP_ENV_MODE as ENV_TYPE) || "local";
  return env === "local"
    ? LOCAL_API_URL
    : env === "dev"
    ? DEVELOPMENT_API_URL
    : PRODUCTION_API_URL;
};

export type METHOD_TYPE = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
