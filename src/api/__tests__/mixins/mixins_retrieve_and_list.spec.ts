import { describe, it, expect, vi } from "vitest";
import { RetrievePaginateMixin } from "@/api/mixins/mixins";
import { Paginate } from "@/api/basic_utils";
import type { AxiosResponse } from "axios";

interface test_props {
  name: string;
}

const response = {
  status: 200,
  data:{
    count: 6,
    previous: null,
    next: "front",
    results: [{ name: "nome" }, { name: "nome2" }, { name: "nome3" }],
  },
};

const response2 = {
  status: 200,
  data:{
    name: "nome",
  },
};

class test extends RetrievePaginateMixin {
  public name: string;

  constructor(obj: test_props) {
    super();
    this.name = obj.name;
  }
}

test.perform_retrieve_paginate = async () => {
  return response as AxiosResponse;
}
test.perform_retrieve = async () => {
  return response as AxiosResponse;
}

describe("RetrieveResource", () => {
  it("Should return list of test obj", async () => {
    console.log()
    //const test_paginate = await test.retrieve_paginate();
    //expect(test_paginate.right).toBeInstanceOf(Paginate)
  });

  it("Should return an intance of test", async () => {
    //const test_paginate = await test.retrieve(1);
    //expect(test_paginate.right).toBeInstanceOf(test)
  })
});
