import { Schema, model, models, Model } from "mongoose";
import type {
  WhoIsContactDetails,
  DataItem,
  DomainScan,
  VirusTotalData,
  WhoIsData,
  HttpsCertificate
} from "../util/types";

interface IDomain {
  name: string;
  scans: DomainScan[];
}

export type DomainData = DataItem<IDomain, { lastScanDate?: Date }>;

const contactDetailsSchema = new Schema<WhoIsContactDetails>(
  {
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
  },
  { _id: false }
);

const whoIsSchema = new Schema<WhoIsData>(
  {
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
  },
  { _id: false }
);

const dnsRecordSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    ttl: Number,
    flag: Number,
    tag: String,
    rname: String,
    retry: Number,
    minimum: Number,
    refresh: Number,
    expire: Number,
    serial: Number
  },
  { _id: false }
);

const httpsCertificateSchema = new Schema<HttpsCertificate>(
  {
    size: Number,
    public_key: Object,
    thumbprint_sha256: String,
    cert_signature: {
      signature: String,
      signature_algorithm: String
    },
    validity: {
      not_after: Date,
      not_before: Date
    },
    version: String,
    extensions: Object,
    thumbprint: String,
    serial_number: String,
    issuer: Object,
    subject: Object
  },
  { _id: false }
);

const virusTotalSchema = new Schema<VirusTotalData>(
  {
    last_dns_records: [dnsRecordSchema],
    last_dns_records_date: Date,
    jarm: String,
    popularity_ranks: Object,
    last_analysis_stats: {
      harmless: Number,
      malicious: Number,
      suspicious: Number,
      undetected: Number,
      timeout: Number
    },
    last_analysis_results: Object,
    last_https_certificate: httpsCertificateSchema,
    last_https_certificate_date: Date,
    categories: Object,
    reputation: Number
  },
  { _id: false }
);

const scanSchema = new Schema<DomainScan>({
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
});

const domainSchema = new Schema<IDomain>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      immutable: true
    },
    scans: [scanSchema]
  },
  { timestamps: true }
);

const Domain: Model<IDomain> =
  models.Domain || model<IDomain>("Domain", domainSchema);

export default Domain;
