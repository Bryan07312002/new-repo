import { expect, describe, it } from "vitest";
import { CreateMixin } from "@/api/mixins/mixins";
import HttpError from "@/api/http_errors/http_error";
import type { AxiosResponse } from "axios";

const test = CreateMixin(
  class {
    public data: Object = {};

    constructor(data: Object) {
      this.data = { name: data.name };
    }
  }
);

test.prototype.path = "test";

const response = {
  status: 201,
  data: {
    name: "foo",
    created: new Date(),
  }
} as AxiosResponse;

const response_fail = {
  status: 400,
  data: {
    name: "cannot be empty",
  }
} as AxiosResponse;

const Mock_sucess = async (): Promise<AxiosResponse> => {
  return response;
}
const Mock_failed = async (): Promise<AxiosResponse> => {
  return response_fail;
}

describe("Create Mixin", () => {
  it("should create a new resource", async () => {
    const new_resource = new test({name: "foo"});
    new_resource.perform_create = Mock_sucess;

    const result = await new_resource.create();
    expect(result.right).toBe(null);
    expect(new_resource.data).toStrictEqual((await Mock_sucess()).data);
  });

  it("should return a HttpError", async () => {
    const new_resource = new test({name: "foo"});
    new_resource.perform_create = Mock_failed; 

    const result = await new_resource.create();
    expect(result.left).toBeInstanceOf(HttpError);
    expect(new_resource.data).toStrictEqual({name: "foo"});
  })
});
