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

const httpsCertificateSchema = new Schema<HttpsCertificate>({
  size: Number,
  public_key: {
    rsa: {
      key_size: Number,
      modulus: String,
      exponent: String
    },
    algorithm: String
  },
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
  extensions: {
    certificate_policies: [String],
    extended_key_usage: [String],
    authority_key_identifier: {
      keyid: String
    },
    subject_alternative_name: [String],
    subject_key_identifier: String,
    key_usage: [String],
    "1.3.6.1.4.1.11129.2.4.2": String,
    CA: Boolean,
    ca_information_access: {
      "CA Issuers": String,
      OCSP: String
    }
  },
  thumbprint: String,
  serial_number: String,
  issuer: {
    C: String,
    CN: String,
    O: String
  },
  subject: {
    CN: String
  }
});

const virusTotalSchema = new Schema<VirusTotalData>({
  last_dns_records: [dnsRecordSchema],
  last_dns_records_date: Date,
  jarm: String,
  popularity_ranks: {
    type: Map,
    of: {
      timestamp: Date,
      rank: Number
    }
  },
  last_analysis_stats: {
    harmless: Number,
    malicious: Number,
    suspicious: Number,
    undetected: Number,
    timeout: Number
  },
  last_analysis_results: {
    type: Map,
    of: {
      category: String,
      result: String,
      method: String,
      engine_name: String
    }
  },
  last_https_certificate: httpsCertificateSchema,
  last_https_certificate_date: Date,
  categories: {
    type: Map,
    of: String
  },
  reputation: Number
});

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
