import HttpErrorHandler from "./http_error_handler";
import type { AxiosResponse } from "axios";

class HttpError {
  public status: number;
  public message: Object;

  constructor(error: AxiosResponse, handle = true) {
    this.status = error.status;
    this.message = error.data;

    if (handle) this.call_handler(error);
  }

  public call_handler(error: AxiosResponse) {
    const handler = new HttpErrorHandler(error);
    handler.handle();
  }

  public static no_path_defined_logger() {
    console.error("No path varible defined at prototype");
  }
}

export default HttpError;
