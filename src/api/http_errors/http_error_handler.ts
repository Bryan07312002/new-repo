import { cons } from "fp-ts/lib/ReadonlyNonEmptyArray";

class HttpErrorHandler {
  public status: number;
  public data: Object;
  public handlers = {
    "400": function() {
      return;
    },
    "401": function() {
      return;
    },
    "404": function() {
      return;
    },
    "500": function() {
      return;
    },
  };

  constructor(error_reponse: AxiosResponse) {
    this.status = error_reponse.status;
    this.data = error_reponse.data;

  }

  public handle() {
    // Call handler
    const func = this.handlers[this.status];

    if (func) {
      func();
    }
  }
}

export default HttpErrorHandler;
