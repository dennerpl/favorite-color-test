import { InternalAxiosRequestConfig } from "axios";

const requestAuthenticationMiddleware = async (
  requestConfig: InternalAxiosRequestConfig<any>
) => {
  const token = localStorage.getItem("favorite-color-token");

  if (token) {
    const header = requestConfig.headers || {};
    header.Authorization = `Bearer ${token}`;
    requestConfig.headers = header;
  }
  return requestConfig;
};

export default requestAuthenticationMiddleware;
