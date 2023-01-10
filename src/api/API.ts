import axios from "axios";
import Storage from "@/helpers/storage";

import type { AxiosResponse, AxiosRequestHeaders } from "axios";

export enum Method {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete"
}

export interface request_config {
  data?: Object;
  headers?: Object;
  params?: Object;
}

class API {
  private jwt: Function; // The JWT token for authentication
  private custom_url: string | undefined;
  public headers: AxiosRequestHeaders | undefined;

  public baseURL = () => this.custom_url ?? import.meta.env.VITE_API_URL;

  constructor(url?: string) {
    // Save the base URL and JWT token provided
    // and if not provided use deaults
    const storage = new Storage<string>();
    if (url) this.custom_url = url;
    this.jwt = () => storage.getItem("access") ?? "";
  }

  create_request(config: request_config) {
    return axios.create({
      baseURL: this.baseURL(),
      validateStatus: undefined,
      method: config.method ?? Method.GET,
      data: config.data,
      headers: { Authorization: `Bearer ${this.jwt()}`, ...config.headers } as AxiosRequestHeaders,
      params: config.params,
    })
  }

  public async get(path: string, params?: Object, aditional_headers: Object = {}) {
    const request = this.create_request({
      params: params,
      headers: aditional_headers,
    });

    // Make api call
    const response = request.request({ url: path });

    // Return the data from the response
    return response;
  }

  public async post(path: string, data: any, aditional_headers: Object = {}, params?: Object) {
    const request = this.create_request({
      params: params,
      headers: aditional_headers,
      data: data
    });

    // Make api call
    const response = request.post(path, data);

    // Return the data from the response
    return response;
  }

  public async put(path: string, data: any, aditional_headers: Object = {}, params?: Object) {
    const request = this.create_request({
      params: params,
      headers: aditional_headers,
      data: data
    });

    // Make api call
    const response = request.put(path, data);

    // Return the data from the response
    return response;
  }

  public async delete(path: string, aditional_headers: Object = {}, params?: Object) {
    const request = this.create_request({
      params: params,
      headers: aditional_headers,
    });

    // Make api call
    const response = request.delete(path);

    // Return the data from the response
    return response;

  }
}

export default API;
