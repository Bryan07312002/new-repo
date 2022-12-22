import axios from "axios";
import Storage from "@/helpers/storage";
import * as dotenv from "dotenv";

import type { AxiosResponse, AxiosRequestHeaders } from "axios";

dotenv.config();

class API {
  private jwt: Function; // The JWT token for authentication
  private custom_url: string | undefined;
  public headers: AxiosRequestHeaders | undefined;

  public baseURL = () => this.custom_url ?? process.env.API_URL;

  static build_params(params: Object) {
    const param_list = Object.keys(params);
    let string: string = "?";
    param_list.forEach((el: string, index: number) => {
      string = string + `${el}=${params[el]}`;

      if (index < param_list.length - 1) string = string + ",";
    });

    return string;
  }

  constructor(url?: string) {
    // Save the base URL and JWT token provided
    // and if not provided use deaults
    const storage = new Storage<string>();
    if (url) this.custom_url = url;
    this.jwt = () => storage.getItem("access") ?? "";
  }

  public set_headers(headers: AxiosRequestHeaders) {
    this.headers = {
      Authorization: `Bearer ${this.jwt()}`,
      ...headers,
    };
  }

  // TODO: Fazer parte de parametros receber um Object e transformar em string
  public async get(path: string, params?: Object, aditional_headers: Object = {}) {
    // Create the headers object with the Authorization header
    this.set_headers(aditional_headers as AxiosRequestHeaders);
    if (params) path = `${path}${API.build_params(params)}`;

    // Create the full URL by concatenating the base URL and the path
    const url = `${this.baseURL()}${path}`;

    const response = await this.perform_get(url);
    // Return the data from the response
    return response;
  }

  // Actualy perform get request so it´s easier to
  // polimorfism when makeing tests
  public async perform_get(url: string): Promise<AxiosResponse> {
    // instance headers
    let headers = {};
    if (this.headers) headers = this.headers;

    return await axios.get(url, headers);
  }

  public async post(path: string, body: any, aditional_headers: Object = {}) {
    // Create the headers object with the Authorization header
    this.set_headers(aditional_headers as AxiosRequestHeaders);

    const response = await this.perform_post(path, body);
    // Return the response
    return response.data;
  }

  // Actualy perform post request so it´s easier to
  // polimorfism when makeing tests
  public async perform_post(path: string, body: any): Promise<AxiosResponse> {
    // Create the full URL by concatenating the base URL and the path
    const url = `${this.baseURL()}${path}`;
    // instance headers
    let headers = {};
    if (this.headers) headers = this.headers;

    return await axios.post(url, body, headers);
  }

  public async put(path: string, body: any, aditional_headers: Object = {}) {
    // Create the headers object with the Authorization header
    this.set_headers(aditional_headers as AxiosRequestHeaders);

    const response = await this.perform_put(path, body);
    // Return the response
    return response;
  }

  // Actualy perform PUT request so it´s easier to
  // polimorfism when makeing tests
  public async perform_put(path: string, body: any): Promise<AxiosResponse> {
    // Create the full URL by concatenating the base URL and the path
    const url = `${this.baseURL()}${path}`;
    // instance headers
    let headers = {};
    if (this.headers) headers = this.headers;

    return await axios.put(url, body, headers);
  }

  public async delete(path: string, aditional_headers: Object = {}) {
    // Create the full URL by concatenating the base URL and the path
    this.set_headers(aditional_headers as AxiosRequestHeaders);

    const response = await this.perform_delete(path);
    // Return the response
    return response;
  }

  // Actualy perform DELETE request so it´s easier to
  // polimorfism when makeing tests
  public async perform_delete(path: string): Promise<AxiosResponse> {
    // Create the full URL by concatenating the base URL and the path
    const url = `${this.baseURL()}${path}`;
    // instance headers
    let headers = {};
    if (this.headers) headers = this.headers;

    return await axios.delete(url, headers);
  }
}

export default API;
