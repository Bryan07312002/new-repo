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
function RetrieveListMixin<TBase extends Constructor>(Base: TBase) {
        return class extends Base {
                public static async retrieve_list(
                        param?: Object
                ): Promise<E.Either<HttpError, any>> {
                        let path = this.prototype.path ?? null;

                        if (path === null) {
                                HttpError.no_path_defined_logger();
                        }

                        const response = await this.perform_retrieve_list(path, param ?? {});

                        if (response.status === 200) {
                                // return null if no register where found
                                if (response.data === null) return E.right(null);

                                return E.right(response.data);
                        }

                        // if response not correct return obj empty with error
                        return E.left(new HttpError(response));
                }

                public static async perform_retrieve_list(
                        path: string,
                        param?: Object
                ): Promise<AxiosResponse> {
                        const api = new API();
                        return await api.get(path + "list/", param ?? {});
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

                public perform_create = async function (
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
                        let path = this.__proto__.path ?? null;

                        if (path === null) {
                                HttpError.no_path_defined_logger();
                        }

                        // Build path
                        path = `${path}${this.data.id}/`;

                        const { data, partial_update } = this.filter_changed_data(this.data);

                        let response;
                        if (partial_update) {
                                response = await this.perform_partial_update(path, data ?? {});
                        } else {
                                response = await this.perform_update(path, data ?? {});
                        }
                        
                        if (response.status >= 200 && response.status < 300) {
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

                public perform_partial_update = async (path: string, data: Object): Promise<AxiosResponse> => {
                        const api = new API();
                        return await api.patch(path, data);
                }

                // Return object of fileds that where changed since 
                // the object was instantiated
                public filter_changed_data = (data: Object): {data: any, partial_update: boolean } => {
                        const fields = Object.keys(data);
                        const changes_object: any = {};
                        let partial_update = false;

                        // filter fileds that changed since object was instantiated
                        fields.forEach(key => {
                                const currentProperty = data[key]
                                const oldProperty = this.old_data[key]
                                if (typeof currentProperty === 'object' && typeof oldProperty === 'object') {
                                        if (this.compareObjects(currentProperty, oldProperty)) {
                                                changes_object[key] = currentProperty;
                                        }
                                } else {
                                        if (currentProperty != oldProperty) {
                                                changes_object[key] = currentProperty
                                        }
                                }
                        })

                        if (Object.keys(changes_object).length != fields.length) {
                                partial_update = true;
                        }
                        return {
                                data: changes_object, 
                                partial_update
                        };
                }

                private compareObjects(objectOne: any, objectTwo: any) {
                        let isDifferent = false;
                        const keys = Object.keys(objectOne)
                        keys.forEach((key) => {
                                const currentParam = objectOne[key]
                                const oldParam = objectTwo[key]
                                if (typeof currentParam === 'object' && typeof oldParam === 'object') {
                                        if (this.compareObjects(currentParam, oldParam)) {
                                                isDifferent = true;
                                        }
                                } else {
                                        if (currentParam != oldParam) {
                                                isDifferent = true;
                                        }
                                }
                        })
                        return isDifferent
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
const CRUD = PaginateMixin(RetrieveMixin(CreateMixin(UpdateMixin(DeleteMixin(RetrieveListMixin(class { }))))));

export { RetrieveMixin, PaginateMixin, CreateMixin, UpdateMixin, RetrievePaginateMixin, CRUD };
