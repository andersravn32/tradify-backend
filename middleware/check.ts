import express from "express";
import Token from "../models/Token";
import jwt from "jsonwebtoken";
import Config from "../utils/Config";
import User, { Roles } from "../models/User";
import Logger from "../utils/Logger";

export default class Check {
  public static async Auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({});
    }

    // Split token value from "Bearer <token> in header"
    const token = header.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        Config.variables.tokens.accessTokenSecret
      );

      // Get user from database
      const user = await User.findById((decoded as any).objectId).populate(
        "profile"
      );
      if (!user) {
        return res.status(401).json({});
      }

      // Set user on Express.Request object
      req.user = user;

      // Invoke next middleware
      next();
    } catch (error) {
      Logger.Write(error);
      return res.status(401).json({});
    }
  }

  public static Role(role: Roles) {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // If user is not signed in
      if (!req.user) {
        return res.status(401).json({});
      }

      // If user role numerical value is not higher than role
      if (!(req.user.role >= role)) {
        return res.status(401).json({});
      }

      return next();
    };
  }
}
