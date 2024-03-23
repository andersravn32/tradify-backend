import express from "express";

export default class Logger {
  public static HTTP() {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.log(new Date(), req.protocol, req.method, req.path);

      // Invoke next middleware
      return next();
    };
  }

  public static Write(message: string) {
    console.log(new Date(), message);
  }
}
