import { Store } from "@apikee/authenticator-common";
import { JwtPayload } from "jsonwebtoken";
import mongoose, { ConnectOptions } from "mongoose";
import { RecordModel } from "./models";

export class MongoStore extends Store {
  constructor(
    private _connectionString: string,
    private _connectionOptions: ConnectOptions = {},
    private _connectionCallback?: () => void
  ) {
    super();
    this._connect();
  }

  private _connect = async () => {
    await mongoose.connect(this._connectionString, this._connectionOptions);
    this._connectionCallback && this._connectionCallback();
  };

  addToken = async (
    token: string,
    subject: string,
    replace: boolean = false
  ) => {
    try {
      if (replace) {
        await RecordModel.deleteMany({ subject });
      }

      await RecordModel.create({ _id: token, subject });
    } catch (error) {
      console.log("Cannot addToken", error);
    }
  };

  findSubjectByToken = async (token: string) => {
    try {
      const record = await RecordModel.findOne({ _id: token });
      return record?.subject as string;
    } catch (error) {
      console.log("Cannot findSubjectByToken", error);
      return "";
    }
  };

  deleteToken = async (token: string) => {
    try {
      await RecordModel.deleteOne({ _id: token });
    } catch (error) {
      console.log("Cannot deleteToken", error);
    }
  };

  deleteAllTokensForSubject = async (subject: string) => {
    try {
      await RecordModel.deleteMany({ subject });
    } catch (error) {
      console.log("Cannot deleteAllTokensForSubject", error);
    }
  };

  clearExpiredTokens = async (
    validateToken: (
      type: "access" | "refresh",
      token: string
    ) => JwtPayload | string | null
  ) => {
    try {
      const records = await RecordModel.find();

      await Promise.all(
        records.map(async ({ _id: token }) => {
          if (!validateToken("refresh", token)) {
            await this.deleteToken(token);
          }
        })
      );
    } catch (error) {
      console.log("Cannot clearExpiredTokens", error);
    }
  };
}
