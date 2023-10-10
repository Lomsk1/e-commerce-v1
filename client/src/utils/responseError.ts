export class ResponseError<T> extends Error {
    response: T;
  
    constructor(message: string, res: T) {
      super(message);
      this.response = res;
    }
  }
  