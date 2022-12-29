import { describe, it, expect, vi } from "vitest";
import { PaginateMixin } from "@/api/mixins/mixins";
import { Paginate } from "@/api/basic_utils";
import type {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosResponseHeaders,
} from "axios";

interface test_props {
  name: string;
}

const test_found = PaginateMixin(
  class {
    public data: Object;

    constructor(test_obj: test_props) {
      this.data = {
        name: test_obj.name ?? "",
      };
    }
  }
)

test_found.prototype.path = "/test/";

test_found.perform_retrieve_paginate = async function(path: string, param?: Object | undefined) {
  const response = {
    data: {
      count: 3,
      previous: "",
      next: "",
      results: [{ name: "nome" }, { name: "nome2" }, { name: "nome3" }],
    },
    status: 200,
    statusText: "",
    headers: {} as AxiosResponseHeaders,
    config: {} as AxiosRequestConfig,
  } as AxiosResponse;
  return response;
};

describe("RetrieveResource", () => {
  it("Should return list os test obj", async () => {
    const expected_response = new Paginate<typeof test_found>(
      {
        count: 3,
        previous: "",
        next: "",
        results: [{ name: "nome" }, { name: "nome2" }, { name: "nome3" }]
      },
      test_found
    );
    const obj = await test_found.retrieve_paginate();

    expect(obj.right).toStrictEqual(expected_response);
  });
});
