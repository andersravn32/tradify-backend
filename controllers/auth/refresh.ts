import express from "express";
import Token, { TokenType } from "../../models/Token";
import jwt from "jsonwebtoken";
import Config from "../../utils/Config";
import User from "../../models/User";
import Logger from "../../utils/Logger";

const refresh = async (req: express.Request, res: express.Response) => {
  const { refreshToken } = req.body;

  // Get refresh token in database
  const token = await Token.findOne({ token: refreshToken });
  if (!token) {
    return res.status(404).json({});
  }
  try {
    // Decode token from database
    const decoded = jwt.verify(
      token.token,
      Config.variables.tokens.refreshTokenSecret
    );

    // Get user from database
    const user = await User.findById((decoded as any).objectId).populate("profile");

    if (!user) return res.status(401).json({});

    // Generate access token
    const accessToken = jwt.sign(
      {
        tokenType: TokenType.Access,
        objectId: user._id,
        identifier: user.identifier,
        verified: user.verified,
        email: user.email,
        role: user.role,
      },
      Config.variables.tokens.accessTokenSecret,
      {
        expiresIn: Config.variables.tokens.accessTokenExpiresIn,
      }
    );

    return res.json({
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    // Remove old token from database
    await Token.deleteOne({token: refreshToken})

    Logger.Write(error);
    return res.status(401).json({});
  }
};

export default refresh;