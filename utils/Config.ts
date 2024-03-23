import dotenv from "dotenv";

export interface ISettings {}

export interface IVariables {
  port: number;
  mongodb: {
    hostname: string;
    username: string;
    password: string;
    database: string;
  };
  tokens: {
    accessTokenSecret: string;
    accessTokenExpiresIn: string;
    refreshTokenSecret: string;
    refreshTokenExpiresIn: string;
    confirmationSecret: string;
    confirmationExpiresIn: string;
  };
}

export default class Config {
  public static get settings(): ISettings {
    return this.settings;
  }

  public static get variables(): IVariables {
    dotenv.config();

    return {
      port: Number(process.env.PORT) || 3000,
      mongodb: {
        hostname: process.env.MONGODB_HOSTNAME as string,
        username: process.env.MONGODB_USERNAME as string,
        password: process.env.MONGODB_PASSWORD as string,
        database: process.env.MONGODB_DATABASE as string,
      },
      tokens: {
        accessTokenSecret: process.env.JWT_ACCESS_SECRET as string,
        accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES as string,
        refreshTokenSecret: process.env.JWT_REFRESH_SECRET as string,
        refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES as string,
        confirmationSecret: process.env.JWT_CONFIRMATION_SECRET as string,
        confirmationExpiresIn: process.env.JWT_CONFIRMATION_EXPIRES as string,
      },
    };
  }
}
