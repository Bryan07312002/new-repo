import * as E from "fp-ts/Either";
import API from "@/api/API";
import HttpError from "../http_errors/http_error";
import { Paginate } from "@/api/basic_utils";
import type { AxiosResponse } from "axios";

type Constructor = new (...args: any[]) => {};

function RetrieveMixin<TBase extends Constructor>(Base: TBase) {
        return class extends Base {
                public static async retrieve(
                        id: number,
                        param?: Object
                ): Promise<E.Either<HttpError, any>> {
                        let path = this.prototype.path ?? null;

                        if (path === null) {
                                HttpError.no_path_defined_logger();
                        }

                        // Build path
                        path = `${path}${id}/`;

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
        };
}

//TODO: Handle all pagination
function RetrieveAllMixin<TBase extends Constructor>(Base: TBase) {
        return class extends Base {
                public static async retrieve_all(
                        id: number,
                        param?: Object
                ): Promise<E.Either<HttpError, any>> {
                        let path = this.prototype.path ?? null;

                        if (path === null) {
                                HttpError.no_path_defined_logger();
                        }

                        const response = await this.perform_retrieve_all(path, param ?? {});

                        if (response.status === 200) {
                                // return null if no register where found
                                if (response.data === null) return E.right(null);

                                const new_resource = new this(response.data);
                                return E.right(new_resource);
                        }

                        // if response not correct return obj empty with error
                        return E.left(new HttpError(response));
                }

                public static async perform_retrieve_all(
                        path: string,
                        param?: Object
                ): Promise<AxiosResponse> {
                        const api = new API();
                        return await api.get(path, param ?? {});
                }
        }
}

function PaginateMixin<TBase extends Constructor>(Base: TBase) {
        return class extends Base {
                public static async retrieve_paginate(
                        param?: Object
                ): Promise<E.Either<HttpError, Paginate<any>>> {
                        const path = this.prototype.path ?? null;

                        if (path === null) {
                                HttpError.no_path_defined_logger();
                        }

                        const response = await this.perform_retrieve_paginate(path, param ?? {});
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

                public static async perform_retrieve_paginate(
                        path: string,
                        param?: Object
                ): Promise<AxiosResponse> {
                        const api = new API();
                        return await api.get(path, param ?? {});
                }
        };
}

function CreateMixin<TBase extends Constructor>(Base: TBase) {
        return class extends Base {
                public create = async (): Promise<E.Either<HttpError, null>> => {
                        const path = this.__proto__.path ?? null;

                        if (path === null) {
                                HttpError.no_path_defined_logger();
                        }

                        const response = await this.perform_create(path, this.data ?? {});
                        if (response.status === 201) {
                                this.data = response.data;
                                return E.right(null);
                        }

                        // if response not correct return obj empty with error
                        return E.left(new HttpError(response));
                };

                public perform_create = async function(
                        path: string,
                        data: Object
                ): Promise<AxiosResponse> {
                        const api = new API();
                        return await api.post(path, data);
                };
        };
}

function UpdateMixin<TBase extends Constructor>(Base: TBase) {
        return class extends Base {
                public update = async (): Promise<E.Either<HttpError, null>> => {
                        const path = this.__proto__.path ?? null;

                        if (path === null) {
                                HttpError.no_path_defined_logger();
                        }

                        const data = this.filter_changed_data(this.data);

                        const response = await this.perform_update(path, data ?? {});
                        if (response.status === 201) {
                                this.data = response.data;
                                return E.right(null);
                        }

                        // if response not correct return obj empty with error
                        return E.left(new HttpError(response));
                }

                public perform_update = async (path: string, data: Object): Promise<AxiosResponse> => {
                        const api = new API();
                        return await api.put(path, data);
                }

                // Return object of fileds that where changed since 
                // the object was instantiated
                public filter_changed_data = (data: Object): Object => {
                        const fields = Object.keys(data);
                        const old_fields = this.old_data;
                        const changed_fields: Object = {};

                        // filter fileds that changed since object was instantiated
                        fields.forEach(field => {
                                if (data[field] !== this.old_data[field]) {
                                        changed_fields[field] = data[field];
                                }
                        })

                        return changed_fields;
                }
        }
}


function DeleteMixin<TBase extends Constructor>(Base: TBase) {
        return class extends Base {
                public delete = async (): Promise<E.Either<HttpError, null>> => {
                        let path = this.__proto__.path ?? null;

                        if (path === null) {
                                HttpError.no_path_defined_logger();
                        }

                        // Build path
                        path = `${path}${this.data.id}/`;

                        const response = await this.perform_delete(path);
                        if (response.status === 204) {
                                this.data = {};
                                return E.right(null);
                        }

                        // if response not correct return obj empty with error
                        return E.left(new HttpError(response));
                }

                public perform_delete = async (path: string): Promise<AxiosResponse> => {
                        const api = new API();
                        return await api.delete(path);
                }
        }
};

const RetrievePaginateMixin = PaginateMixin(RetrieveMixin(class { }));
const CRUD = PaginateMixin(RetrieveMixin(CreateMixin(UpdateMixin(DeleteMixin(class { })))));

export { RetrieveMixin, PaginateMixin, CreateMixin, UpdateMixin, RetrievePaginateMixin, CRUD };
