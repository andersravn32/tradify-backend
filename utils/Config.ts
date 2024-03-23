import dotenv from "dotenv"

export interface ISettings {}

export interface IVariables {
  mongodb: {
    hostname: string;
    username: string;
    password: string;
    database: string;
  };
}

export default class Config {
  public static get settings(): ISettings {
    return this.settings;
  }

  public static get variables(): IVariables {
    dotenv.config()

    return {
      mongodb: {
        hostname: process.env.MONGODB_HOSTNAME as string,
        username: process.env.MONGODB_USERNAME as string,
        password: process.env.MONGODB_PASSWORD as string,
        database: process.env.MONGODB_DATABASE as string,
      },
    };
  }
}
