import { describe, it, expect, vi } from "vitest";


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

describe("RetrieveResource", () => {
  it("Should return list of test obj", async () => {

  });
});
