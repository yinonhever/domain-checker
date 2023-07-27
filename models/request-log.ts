import { Schema, model, models, Model } from "mongoose";

interface IRequestLog {
  path: string;
  method: string;
  domain: string;
  params: { [x: string]: any };
  query: { [x: string]: any };
  body: { [x: string]: any };
  ip: string | null;
}

const requestScehma = new Schema<IRequestLog>(
  {
    path: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    domain: {
      type: String,
      required: true
    },
    params: Object,
    query: Object,
    body: Object,
    ip: String
  },
  { timestamps: true }
);

const RequestLog: Model<IRequestLog> =
  models.Log || model("RequestLog", requestScehma);

export default RequestLog;
