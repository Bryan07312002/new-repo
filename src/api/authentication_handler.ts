import API from "./API";
import Storage from "@/helpers/storage";
import jwt_decode from "jwt-decode";
import { isJwtExpired } from 'jwt-check-expiration';
import * as E from "fp-ts/Either"
import type { AxiosResponse } from "axios";
import HttpError from "./http_errors/http_error";

export interface login_form {
  username: string;
  password: string;
}

export interface DecodedToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: number;
}

class AuthenticationHandler extends API {
  routes = {
    login: "/auth/login/",
    refresh: "/auth/login/refresh/",
    logout: "/auth/logout/",
  };
  access_token_key = "access";
  refresh_token_key = "refresh";

  constructor(url?: string) {
    super(url);
  }

  public async login(form: login_form): Promise<E.Either<HttpError, null>> {
    const response = await this.send_login(form)


    // Check login status
    if (response?.status === 200) {
      // Store tokens at local storage
      const access = response?.data.access;
      const refresh = response?.data.refresh;
      this.set_tokens(access, refresh);

      // If all ok returns null
      return E.right(null);
    }

    // Return error
    return E.left(new HttpError(response));
  }

  // Send login
  public async send_login(form: login_form) {
    return await this.post(this.routes.login, form);
  }

  public set_tokens(access?: string, refresh?: string) {
    const storage = new Storage<string>();
    if (access) storage.setItem(this.access_token_key, access);
    if (refresh) storage.setItem(this.refresh_token_key, refresh);
  }

  // Check jwt exp date an returns true
  // if is expired or false if is ok
  public is_token_expired(): Boolean {
    const storage = new Storage<String>();
    const decoded_token = this.decode_jwt();
    //console.log(storage.getItem("access"), isJwtExpired(storage.getItem("access")));
    if (decoded_token.exp == undefined || decoded_token.exp == null) return true;

    const is_token_expired = decoded_token.exp <= Date.now() / 1000;
    return is_token_expired;
  }

  // Check auth and if "try_refresh" is true
  // will try to send the refresh hash
  public async is_auth(try_refresh = false) {
    const is_token_expired = this.is_token_expired();
    if (!is_token_expired) return true;

    if (try_refresh) {
      const response = await this.refresh();
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  // Sends refresh token and handles response tokens data
  public async refresh(): Promise<AxiosResponse> {
    const storage = new Storage<string>();
    const refresh_token = storage.getItem(this.refresh_token_key) || "";

    const response = await this.send_refresh(refresh_token).catch(err => { return err.response });

    // If success save new tokens
    if (response.status === 200) {
      this.set_tokens(
        response.data[this.refresh_token_key],
        response.data[this.refresh_token_key]
      );
    }
    return response;
  }

  public async send_refresh(token: string) {
    return await this.post(this.routes.refresh, { refresh: token });
  }

  public async logout() {
    const storage = new Storage<string>();
    const refresh_token = storage.getItem(this.refresh_token_key) || "";
    this.purge_auth();

    const response = await this.send_logout(refresh_token).catch(err => { return err.response });

    return response;
  }

  public async send_logout(token: string) {
    return await this.post(this.routes.logout, { refresh: token });
  }

  // Delete all data from local storage
  // such as tokens and user data saved localy
  public purge_auth() {
    const storage = new Storage<string>();
    storage.clear();
  }

  // Decode jwt token
  public decode_jwt(token?: string): DecodedToken {
    const storage = new Storage<string>();
    token = token ?? storage.getItem(this.access_token_key) ?? "";
    try {
      const decoded_token = jwt_decode(token);
      return decoded_token as DecodedToken;
    } catch (error) {
      // TODO: make a log obj to detect and dont log in test mode
      //console.log(error.message);
    }
    return {} as DecodedToken;
  }
}

export default AuthenticationHandler;
