import * as E from "fp-ts/Either";
import API from "@/api/API";
import HttpError from "../http_errors/http_error";
import { Paginate } from "@/api/basic_utils";
import type {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosResponseHeaders,
} from "axios";

class RetrieveResource {
  //TODO: trasformar param em string para dar append em url
  public static async retrieve(
    id: number,
    param?: Object
  ): Promise<E.Either<HttpError, any>> {
    let path = this.prototype.path ?? null;

    if (path === null) {
      HttpError.no_path_defined_logger();
    }
    // Build path
    path = `${path}${id}`;

    const response = await this.perform_retrieve(path, param ?? {});

    if (response.status === 200) {
      // return null if no register where found
      if (response.data === null) return E.right(null);

      const new_resource = new this(response.data);
      return E.right(new_resource);
    }

    // if response not correct return obj empty with error
    return E.left(new HttpError(response));
  }

  public static async perform_retrieve(
    path: string,
    param?: Object
  ): Promise<AxiosResponse> {
    const api = new API();
    return await api.get(path, param ?? {});
  }
}

class RetrieveResourceList {
  public static async retrieve_list(
    param?: Object
  ): Promise<E.Either<HttpError, Paginate<any>>> {
    const path = this.prototype.path ?? null;

    if (path === null) {
      HttpError.no_path_defined_logger();
    }

    const response = await this.perform_retrieve(path, param ?? {});
    if (response.status === 200) {
      // return empty paginate when no register where found
      const self = this;
      if (response.data === null) {
        return E.right(
          new Paginate<typeof self>(
            {
              count: 0,
              next: null,
              previous: null,
              results: [],
            },
            typeof self
          )
        );
      }

      const pagination_obj = new Paginate(response.data, self);
      return E.right(pagination_obj);
    }

    // if response not correct return obj empty with error
    return E.left(new HttpError(response));
  }

  public static async perform_retrieve(
    path: string,
    param?: Object
  ): Promise<AxiosResponse> {
    const api = new API();
    return await api.get(path, param ?? {});
  }
}

export { RetrieveResource, RetrieveResourceList };
