import { describe, it, expect, vi } from "vitest";
import AuthenticationHandler from "../authentication_handler";
import Storage from "@/helpers/storage";
import jwt from "jsonwebtoken";
import HttpError from "../http_errors/http_error";
import type { login_form } from "../authentication_handler";

const authentication_handler = new AuthenticationHandler();
const storage = new Storage<string>();

class test extends AuthenticationHandler { }

// Fake data
const not_expired_jwt = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 3600 }, "fake_key");
const expired_jwt = jwt.sign({ exp: Math.floor(Date.now() / 1000) - 3600 }, "fake_key");
const invalid_token = "invalid token string";

const fake_login_sucess = {
  status: 200,
  data: {
    access: "token access",
    refresh: "token refresh",
  },
};
const fake_refresh_sucess = {
  status: 200,
  data: {
    access: "token access",
    refresh: "token refresh",
  },
};
const fake_logout_sucess = {
  status: 200,
  data: {
    access: "token access",
    refresh: "token refresh",
  },
};

// Set fake return functions ss tests doesnt call backend
authentication_handler.send_login = async () => {
  return fake_login_sucess;
};
authentication_handler.send_refresh = async () => {
  return fake_refresh_sucess;
};
authentication_handler.send_logout = async () => {
  return fake_logout_sucess;
};

describe("AuthenticatorHandler", () => {
  // --- login ---- //
  it.skip("Should save tokens if sucess to login", async () => {
    const response = await authentication_handler.login({ username: "Bryan", password: "123" });
    const a = new test();
    a.decode_jwt()

    // Get tokens stored localy
    const stored_token_access = storage.getItem(
      authentication_handler.access_token_key
    );
    const stored_token_refresh = storage.getItem(
      authentication_handler.refresh_token_key
    );

    expect(stored_token_access).toBe(fake_login_sucess.data.access);
    expect(stored_token_refresh).toBe(fake_login_sucess.data.refresh);
    expect(response.right).toBe(null);
  });

  // --- is_token_expired ---- //
  it("Should read jwt correctly and be valid", () => {
    storage.setItem("access", not_expired_jwt);

    const is_expired = authentication_handler.is_token_expired();

    expect(is_expired).toBe(false);
  });

  it("Should not read jwt and not be valid", () => {
    storage.setItem("access", invalid_token);

    const is_expired = authentication_handler.is_token_expired();

    expect(is_expired).toBe(true);
  });

  it("Should read jwt and and not be valid", () => {
    storage.setItem("access", expired_jwt);

    const is_expired = authentication_handler.is_token_expired();

    expect(is_expired).toBe(true);
  });

  // --- is_auth ---- //
  it("Should be auth with valid token", async () => {
    storage.setItem("access", not_expired_jwt);
    const spy = vi.spyOn(authentication_handler, "send_refresh");

    const is_auth = await authentication_handler.is_auth();

    expect(is_auth).toBe(true);
    expect(spy).not.toBeCalled();
  });

  it("Should not auth with invalid token", async () => {
    storage.setItem("access", invalid_token);
    const spy = vi.spyOn(authentication_handler, "send_refresh");

    const is_auth = await authentication_handler.is_auth();

    expect(is_auth).toBe(false);
    expect(spy).not.toBeCalled();
  });

  it("Should not auth with valid token", async () => {
    storage.setItem("access", expired_jwt);
    const spy = vi.spyOn(authentication_handler, "send_refresh");

    const is_auth = await authentication_handler.is_auth();

    expect(is_auth).toBe(false);
    expect(spy).not.toBeCalled();
  });

  it("Should be auth with valid but expired token and call refresh", async () => {
    storage.setItem("access", expired_jwt);
    const spy = vi.spyOn(authentication_handler, "send_refresh");

    const is_auth = await authentication_handler.is_auth(true);

    expect(is_auth).toBe(true);
    expect(spy).toBeCalled();
  });

  it("Should be auth with valid token and not call refresh", async () => {
    storage.setItem("access", not_expired_jwt);
    const spy = vi.spyOn(authentication_handler, "send_refresh");

    const is_auth = await authentication_handler.is_auth(true);

    expect(is_auth).toBe(true);
    expect(spy).not.toBeCalled();
  });

  // --- logout ---- //
  it("Should be auth with valid token and not call refresh", async () => {
    storage.setItem("access", not_expired_jwt);
    storage.setItem("refresh", not_expired_jwt);
    storage.setItem("teste", not_expired_jwt);
    const spy = vi.spyOn(authentication_handler, "send_logout");

    authentication_handler.logout();

    const access = storage.getItem("access");
    const refresh = storage.getItem("refresh");
    const teste = storage.getItem("teste");

    expect(spy).toHaveBeenCalledOnce();
    expect(access).toBeNull();
    expect(refresh).toBeNull();
    expect(teste).toBeNull();
  });

});

describe("Calling web API", () => {
  const api_caller = new AuthenticationHandler();
  it.skip("login", async () => {
    const login: login_form = {
      username: "super",
      password: "123",
    };

    const logged = await api_caller.login(login);
    console.log(logged.status);
  });

  it.skip("login", async () => {
    const login: login_form = {
      username: "no existent",
      password: "123",
    };

    const logged = await api_caller.login(login);
    console.log(logged.status);
  });
});
