import { Schema, model, models, Model } from "mongoose";
import type {
  WhoIsContactDetails,
  DataItem,
  DomainScan,
  VirusTotalData,
  WhoIsData
} from "../util/types";

interface IDomain {
  name: string;
  whoIs: WhoIsData | null;
  virusTotal: VirusTotalData | null;
  scans: DomainScan[];
}

export type DomainData = DataItem<IDomain, { lastScanDate?: Date }>;

const contactDetailsSchema = new Schema<WhoIsContactDetails>({
  name: String,
  organization: String,
  street_address: String,
  city: String,
  region: String,
  zip_code: String,
  country: String,
  phone: String,
  fax: String,
  email: String
});

const whoIsSchema = new Schema<WhoIsData>({
  domain: String,
  domain_id: String,
  status: String,
  create_date: Date,
  update_date: Date,
  expire_date: Date,
  domain_age: Number,
  whois_server: String,
  registrar: {
    iana_id: String,
    name: String,
    url: String
  },
  registrant: contactDetailsSchema,
  admin: contactDetailsSchema,
  tech: contactDetailsSchema,
  billing: contactDetailsSchema,
  nameservers: [String]
});

const virusTotalSchema = new Schema<VirusTotalData>({
  //
});

const scanSchema = new Schema<DomainScan>({
  date: {
    type: Date,
    required: true
  },
  success: {
    type: Boolean,
    required: true
  }
});

const domainSchema = new Schema<IDomain>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      immutable: true
    },
    whoIs: {
      type: whoIsSchema,
      default: null
    },
    virusTotal: {
      type: virusTotalSchema,
      default: null
    },
    scans: [scanSchema]
  },
  { timestamps: true }
);

const Domain: Model<IDomain> =
  models.Domain || model<IDomain>("Domain", domainSchema);

export default Domain;
