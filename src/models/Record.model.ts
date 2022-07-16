import { Schema, model } from "mongoose";
import { IRecord } from "../interfaces";

export const RecordSchema = new Schema<IRecord>(
  {
    _id: { type: String, required: true },
    subject: { type: String, required: true },
  },
  { collection: "authenticator.mongostore" }
);

export const RecordModel = model<IRecord>("Record", RecordSchema);
