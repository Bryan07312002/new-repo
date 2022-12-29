import { expect, describe, it } from "vitest";
import { UpdateMixin } from "@/api/mixins/mixins";
import HttpError from "@/api/http_errors/http_error";
import type { AxiosResponse } from "axios";

const test = UpdateMixin(class {
    public data = {}
    public old_data = {}

    constructor (data: Object) {
        this.data = {
            name: data.name,
            age: data.age,
        }

        this.old_data = { ...this.data }
    }
})

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

describe("UpdateMixin", () => {
    it("should update the properties of current resource", async () => {
        const new_resource = new test({name: "foo"});
        new_resource.perform_update = Mock_sucess;

        new_resource.data.name = "bar";
        const result = await new_resource.update();

        expect(result.right).toBe(null);
        expect(new_resource.data).toStrictEqual(response.data);
    })

    it("should not update the properties of current resource and return HttpError", async () => {
        const new_resource = new test({name: "foo"});
        new_resource.perform_update = Mock_failed;

        new_resource.data.name = "bar";
        const result = await new_resource.update();

        expect(result.left).toBeInstanceOf(HttpError);
        expect(new_resource.data).not.toStrictEqual(response.data);
    })

    //---filter_fields--//
    it("should not update the properties of current resource and return HttpError", () => {
        const new_resource = new test({name: "foo"});
        const mock_data = {age: 10};
        const filtred = new_resource.filter_changed_data(mock_data);

        expect(filtred).toStrictEqual({age:10});
    })
})