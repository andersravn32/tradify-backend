import express from "express";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Config from "../../../utils/Config";
import Token, { TokenType } from "../../../models/Token";
import EmailService, { EmailType } from "../../../services/EmailService";

const signup = async (req: express.Request, res: express.Response) => {
  const { identifier, email, password } = req.body;

  // Get duplicate entries
  const duplicates = await User.find({
    $or: [{ identifier: identifier }, { email: email }],
  });

  // If duplicates were found, return error
  if (duplicates.length) {
    return res.status(409).json({});
  }

  // Create user in database
  const user = await User.create({
    identifier: identifier,
    email: email,
    password: await bcrypt.hash(password, 10),
  });

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

  // Generate confirmation token
  const confirmationToken = jwt.sign(
    {
      TokenType: TokenType.SignupConfirmation,
      objectId: user._id,
    },
    Config.variables.tokens.confirmationSecret,
    {
      expiresIn: Config.variables.tokens.confirmationExpiresIn,
    }
  );
  // Insert confirmation token into database
  await Token.create({
    type: TokenType.SignupConfirmation,
    user: user,
    token: confirmationToken,
  });

  // Send confirmation email via EmailService
  await EmailService.Send(EmailType.SignupConfirmation, user);

  return res.json({
    user: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

export default signup;
