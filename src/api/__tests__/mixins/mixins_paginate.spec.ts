import { describe, it, expect, vi } from "vitest";
import { Paginate } from "@/api/basic_utils";

interface test_props {
  name: string;
}

class test {
  public name: string;

  constructor(obj: test_props) {
    this.name = obj.name;
  }
}

const response = {
  count: 6,
  previous: null,
  next: "front",
  results: [{ name: "nome" }, { name: "nome2" }, { name: "nome3" }],
};

const response2 = {
  count: 6,
  previous: "back",
  next: null,
  results: [{ name: "nome3" }, { name: "nome4" }, { name: "nome5" }],
};

describe("RetrieveResource", () => {
  it("Should return list of test obj", async () => {
    const expected_response = {
      count: 6,
      previous: null,
      next: "front",
      results: [
        new test({ name: "nome" }),
        new test({ name: "nome2" }),
        new test({ name: "nome3" }),
      ],
    };
    const obj = new Paginate<test>(response, test);

    expect(obj.results).toStrictEqual(expected_response.results);
    expect(obj.count).toBe(expected_response.count);
    expect(obj.previous).toBe(expected_response.previous);
    expect(obj.next).toBe(expected_response.next);
  });

  it("Should ")
});
