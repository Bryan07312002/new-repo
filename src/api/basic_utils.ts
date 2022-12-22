import * as E from "fp-ts/Either";
import API from "@/api/API";
import HttpError from "@/api/http_errors/http_error";
import type {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosResponseHeaders,
} from "axios";

export interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

class Paginate<T> {
  public count: number;
  public next: string | null;
  public previous: string | null;
  public results: T[] = [];
  public result_type: any;

  constructor(data: PaginatedResponse, type: any) {
    this.result_type = type;
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    data.results.forEach((el) => {
      this.results.push(new type(el));
    });
  }

  // Get next list of Objects from API
  async next_page(): Promise<E.Either<HttpError, Paginate<T>>> {
    const response = await this.api_fetch("next");
    if (response.status !== 200) return E.left(new HttpError(response));

    return E.right(new Paginate<T>(response.data, this.result_type));
  }

  // Get previous list of Objects from API
  async previous_page(): Promise<E.Either<HttpError, Paginate<T>>> {
    const response = await this.api_fetch("previous");
    if (response.status !== 200) return E.left(new HttpError(response));
    return E.right(new Paginate<T>(response.data, this.result_type));
  }

  // Get previous list of Objects from API
  async page(
    page_number: number,
    base_url?: string
  ): Promise<E.Either<HttpError, Paginate<T>>> {
    let url: string;
    // If has no previous and next return a reponse  404
    if (this.next || this.previous === null) {
      // create 404 error
      const response = {
        data: {
          not_found: "",
        },
        status: 404,
        statusText: "",
        headers: {} as AxiosResponseHeaders,
        config: {} as AxiosRequestConfig,
      } as AxiosResponse;

      return E.left(new HttpError(reponse));
    }
    url = this.next || this.previous;

    const response = await this.api_fetch("", url, page_number);
    if (response.status !== 200) return E.left(new HttpError(response));

    return E.right(new Paginate<T>(response.data, this.result_type));
  }

  async api_fetch(
    type: string,
    custom_url: string,
    page_number: number = 1
  ): Promise<AxiosResponse> {
    const api = new API();
    if (type === "next") return await api.get(this.next || "");
    if (type === "previous") return await api.get(this.previous || "");

    return await api.get(custom_url, { page: page_number });
  }
}

export { Paginate };
