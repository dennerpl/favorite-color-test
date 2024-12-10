import axios, { AxiosInstance, AxiosResponse } from "axios";

import requestAuthenticationMiddleware from "./middlewares/request-authentication.middleware";
import unauthorizedErrorHandler from "./response-error-handlers/unauthorized-error-handler";

const paramsSerializer = (queryParams: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];

    if (value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      return value.forEach((subValue: string) =>
        searchParams.append(key, subValue)
      );
    }

    return searchParams.append(key, value);
  });

  return searchParams.toString();
};

class Service {
  instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.BACKEND_URL || "http://localhost:3000",
  });
  instanceTable: AxiosInstance = axios.create({});

  constructor() {
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => unauthorizedErrorHandler(error, this.instance)
    );
    this.instance.interceptors.request.use(requestAuthenticationMiddleware);
  }

  fetchPaginatedData = async (
    endpoint: string,
    params?: { [key: string]: any }
  ): Promise<Record<string, any>> => {
    const response = await this.instance.get(endpoint, {
      params,
      paramsSerializer,
    });

    const { content, totalPages, totalElements, number, size } = response.data;

    return {
      data: content ?? [],
      totalDataRecords: totalElements,
      currPage: number,
      totalPages,
      pageSize: size,
    };
  };

  updatePatch = async (
    endpoint: string,
    body: any
  ): Promise<AxiosResponse<any>> => {
    const response = await this.instance.patch(endpoint, body);
    return response;
  };

  update = async (endpoint: string, body: any): Promise<AxiosResponse<any>> => {
    const response = await this.instance.post(endpoint, body);
    return response;
  };

  retrieve = async <T = any>(endpoint: string, filters?: any) => {
    const response = await this.instance.get<T>(endpoint, {
      params: filters,
      paramsSerializer,
    });
    return response;
  };

  create = async (endpoint: string, body: any) => {
    const request = await this.instance.post(endpoint, body);
    return request.data;
  };

  delete = async (endpoint: string) => {
    const request = await this.instance.delete(endpoint);
    return request.data;
  };
}

export const ApiService = new Service();
