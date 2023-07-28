import { Schema, model, models, Model } from "mongoose";
import type { DataItem, DomainScan } from "../../util/types";
import { whoIsSchema, virusTotalSchema } from "./sub-schemas";

interface IDomain {
  name: string;
  scans: DomainScan[];
}

export type DomainData = DataItem<IDomain>;

const domainSchema = new Schema<IDomain>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      immutable: true
    },
    scans: [
      {
        date: {
          type: Date,
          required: true
        },
        result: {
          whoIs: {
            type: whoIsSchema,
            default: null
          },
          virusTotal: {
            type: virusTotalSchema,
            default: null
          }
        }
      }
    ]
  },
  { timestamps: true }
);

const Domain: Model<IDomain> =
  models.Domain || model<IDomain>("Domain", domainSchema);

export default Domain;
