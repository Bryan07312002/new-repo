import { describe, it, expect } from "vitest";
import API from "@/api/API";
import { Method } from "@/api/API";
import Storage from "@/helpers/storage";
import dotenv from "dotenv";
import axios from "axios";

import type {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosResponseHeaders,
} from "axios";

dotenv.config();

describe("Tests Basic object API wich is a basic HTTP client object", () => {
  it("Should create correctly the request object", async () => {
    const api = new API();
    const storage = new Storage<string>();

    storage.setItem("access", "my token")
    const request_data = {
      method: Method.POST,
      data: { hello: "world" },
      headers: { "Content-Type": "multipart/form-data" },
      params: { query: "one" },
    }

    const request = api.create_request(request_data);

    expect(request.defaults.data).toStrictEqual(request_data.data);
    expect(request.defaults.params).toStrictEqual(request_data.params);
    expect(request.defaults.headers).toContain(request_data.headers);
    expect(request.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);

    // Should send authorizations token
    expect(request.defaults.headers).toHaveProperty("Authorization")
    expect(request.defaults.headers.Authorization).toBe("Bearer " + storage.getItem("access"));
  })
});
