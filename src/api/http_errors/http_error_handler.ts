class HttpErrorHandler {
  public status: number;
  public data: Object;
  public handlers = {
    "400": function() {
      console.error(400);
      return;
    },
    "401": function() {
      return;
    },
    "404": function() {
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

    func();
  }
}

export default HttpErrorHandler;
