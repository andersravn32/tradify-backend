import { IUser } from "../models/User";

export enum EmailType {
  SignupConfirmation,
}

export default class EmailService {
    public static async Send(type: EmailType, user: IUser){
        
    }
}
