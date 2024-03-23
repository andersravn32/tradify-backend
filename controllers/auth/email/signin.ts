import express from "express";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Config from "../../../utils/Config";
import Token, { TokenType } from "../../../models/Token";

const signin = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  // Find user in database
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({});
  }

  // If password provided does not match
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({});
  }

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

  // Remove old refresh token
  await Token.deleteOne({ type: TokenType.Refresh, user: user._id });

  // Generate refresh token
  const refreshToken = jwt.sign(
    {
      tokenType: TokenType.Refresh,
      objectId: user._id,
    },
    Config.variables.tokens.refreshTokenSecret,
    {
      expiresIn: Config.variables.tokens.refreshTokenExpiresIn,
    }
  );

  // Insert refresh token into database
  await Token.create({
    type: TokenType.Refresh,
    user: user,
    token: refreshToken,
  });

  // Return user object, accessToken and refreshToken
  return res.json({
    user: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

export default signin;
