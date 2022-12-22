import { describe, it, expect } from "vitest";
import API from "@/api/API";
import Storage from "@/helpers/storage";
import dotenv from "dotenv";

import type {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosResponseHeaders,
} from "axios";

dotenv.config();

describe("Tests Basic object API wich is a basic HTTP client object", () => {
  it("Should instantiate", () => {
    const storage = new Storage<string>();
    const fake_token = "1234";
    storage.setItem("access", fake_token);

    console.log(storage.getItem("access") == fake_token);
    const api = new API();
    api.set_headers({});

    expect(api.headers?.Authorization).toBe(`Bearer ${fake_token}`);
    expect(api.baseURL()).toBe(process.env.API_URL);
  });

  // ------- build_params -------- //
  it("Should retrive correct query params as string", () => {
    const params = API.build_params({ page: "1" });

    expect(params).toBe("?page=1");
  });

  it("Should retrive correct query params as string", () => {
    const params = API.build_params({ page: "1", param: "test" });

    expect(params).toBe("?page=1,param=test");
  });

  it("Should retrive correct query params as string", () => {
    const params = API.build_params({
      page: "1",
      param: "test",
      teste: [1, 2, 3],
    });

    expect(params).toBe("?page=1,param=test,teste=1,2,3");
  });

  it("Should append good in the url header", async () => {
    const api = new API();
    let url: string = "";
    // Path
    const path = "";
    // Mock api call
    api.perform_get = async (path: string) => {
      url = path;
      const response = {
        data: {
          name: "test name",
        },
        status: 200,
        statusText: "",
        headers: {} as AxiosResponseHeaders,
        config: {} as AxiosRequestConfig,
      } as AxiosResponse;
      return response;
    };
    await api.get(path, { page: "1", param: "test" });

    //divide between params and url
    const divide = url.split("?");

    expect(divide[1]).toBe("page=1,param=test");
    expect(divide[0]).toBe(`${process.env.API_URL}${""}`);
  });
});
