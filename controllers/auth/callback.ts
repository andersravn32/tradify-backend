import express from "express";
import jwt from "jsonwebtoken";
import { Token, User } from "../../models";
import Config from "../../utils/Config";
import Logger from "../../utils/Logger";
import { TokenType } from "../../models/Token";
import { Roles } from "../../models/User";

const callback = (token: string) => {
  return async (req: express.Request, res: express.Response) => {
    const _token = await Token.findOne({ token: token });
    if (!_token) {
      return res.status(404).json({});
    }

    try {
      const decoded = jwt.verify(
        _token.token,
        Config.variables.tokens.callbackSecret
      );

      const user = await User.findById((decoded as any).objectId);
      if (!user) {
        return res.status(404).json({});
      }

      // If token is of type signup confirmation, update user role to member
      if ((decoded as any).tokenType === TokenType.SignupConfirmation) {
        user.role = Roles.Member;
      }

      await user.save();

      // Redirect to destination included in token payload
      return res.redirect((decoded as any).destination);
    } catch (error) {
      await Token.deleteOne({ token: token });
      Logger.Write(error);
      return res.status(401).json({});
    }
  };
};

export default callback;
