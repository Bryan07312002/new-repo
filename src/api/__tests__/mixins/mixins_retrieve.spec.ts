import { describe, it, expect, vi } from "vitest";
import { RetrieveResource } from "@/api/mixins/mixins";
import HttpError from "@/api/http_errors/http_error";
import type { AxiosResponse, AxiosRequestConfig, AxiosResponseHeaders } from "axios";

interface test_props {
  name: string;
}

class test_found extends RetrieveResource {
  public data: Object;

  constructor(test_obj: test_props) {
    super(test_obj);

    this.data = {
      name: test_obj.name ?? "",
    };
  }
}

test_found.prototype.path = "/test/";

test_found.perform_retrieve = async function(path: string, param?: Object | undefined) {
  const response = {
    data: {
      name: "test name"
    },
    status: 200,
    statusText: "",
    headers: {} as AxiosResponseHeaders,
    config: {} as AxiosRequestConfig,
  } as AxiosResponse;
  return response;
};

class test_not_found extends RetrieveResource {
  public data: Object;

  constructor(test_obj: Object) {
    super(test_obj);

    this.data = {
      name: test_obj.name ?? "",
    };
  }
}
test_not_found.prototype.path = "/test/";

test_not_found.perform_retrieve = async function(path: string, param?: Object | undefined) {
  const response = {
    data: null,
    status: 200,
    statusText: "",
    headers: {} as AxiosResponseHeaders,
    config: {} as AxiosRequestConfig,
  } as AxiosResponse;
  return response;
};

class test_error extends RetrieveResource {
  public data: Object;

  constructor(test_obj: Object) {
    super(test_obj);

    this.data = {
      name: test_obj.name ?? "",
    };
  }
}
test_error.prototype.path = "/test/";

test_error.perform_retrieve = async function(path: string, param?: Object | undefined) {
  const response = {
    data: null,
    status: 400,
    statusText: "",
    headers: {} as AxiosResponseHeaders,
    config: {} as AxiosRequestConfig,
  } as AxiosResponse;
  return response;
};

class test_no_path extends RetrieveResource {
  public data: Object;

  constructor(test_obj: Object) {
    super(test_obj);

    this.data = {
      name: test_obj.name ?? "",
    };
  }
}

test_no_path.perform_retrieve = async function(path: string, param?: Object | undefined) {
  const response = {
    data: null,
    status: 404,
    statusText: "",
    headers: {} as AxiosResponseHeaders,
    config: {} as AxiosRequestConfig,
  } as AxiosResponse;
  return response;
};


describe("RetrieveResource", () => {
  it("Should return one obj with the id choosed", async () => {
    const obj = await test_found.retrieve(1);

    expect(obj.right).toBeInstanceOf(test_found);
    expect(obj.right.data.name).toBe("test name");
  });

  it("Should return one obj with the id choosed", async () => {
    const obj = await test_found.retrieve(1);

    expect(obj.right).toBeInstanceOf(test_found);
    expect(obj.right.data.name).toBe("test name");
  });

  it("Should return one obj with the id choosed", async () => {
    const obj = await test_not_found.retrieve(1);

    expect(obj.right).toBe(null);
  });

  it("Should return one obj with the id choosed", async () => {
    const obj = await test_error.retrieve(1);

    expect(obj.left.status).toBe(400);
    expect(obj.right?.status).toBe(undefined);
  });

  it("Should return HttpError", async () => {
    const obj = await test_no_path.retrieve(1);

    expect(obj.left.status).toBe(404);
    expect(obj.left).toBeInstanceOf(HttpError);
    expect(obj.right?.status).toBe(undefined);
  });


});
