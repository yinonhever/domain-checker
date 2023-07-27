export type DataItem<T = unknown, S = unknown> = T &
  S & {
    _id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  };

export interface DomainRequestData {
  name?: string;
}

export interface DomainScanResult {
  whoIs: WhoIsData | null;
  virusTotal: VirusTotalData | null;
}

export interface DomainScan {
  date: Date;
  result: DomainScanResult;
}

export interface WhoIsData {
  domain: string;
  domain_id: string;
  status: string;
  create_date: Date | string;
  update_date: Date | string;
  expire_date: Date | string;
  domain_age: number;
  whois_server: string;
  registrar: {
    iana_id: string;
    name: string;
    url: string;
  };
  registrant: WhoIsContactDetails;
  admin: WhoIsContactDetails;
  tech: WhoIsContactDetails;
  billing: WhoIsContactDetails;
  nameservers: string[];
}

export interface VirusTotalData {
  last_dns_records: DnsRecord[];
  last_dns_records_date: Date | number;
  jarm: string;
  popularity_ranks: {
    [site: string]: {
      timestamp: Date | number;
      rank: number;
    };
  };
  last_analysis_stats: {
    harmless: number;
    malicious: number;
    suspicious: number;
    undetected: number;
    timeout: number;
  };
  last_analysis_results: {
    [engine: string]: {
      category: string;
      result: string;
      method: string;
      engine_name: string;
    };
  };
  last_https_certificate: HttpsCertificate;
  last_https_certificate_date: Date | number;
  categories: {
    [engine: string]: string;
  };
  reputation: number;
}

export interface WhoIsContactDetails {
  name: string;
  organization: string;
  street_address: string;
  city: string;
  region: string;
  zip_code: string;
  country: string;
  phone: string;
  fax: string;
  email: string;
}

export interface DnsRecord {
  type: string;
  value: string;
  ttl?: number;
  flag?: number;
  tag?: string;
  rname?: string;
  retry?: number;
  minimum?: number;
  refresh?: number;
  expire?: number;
  serial?: number;
}

export interface HttpsCertificate {
  size: number;
  public_key: {
    rsa: {
      key_size: number;
      modulus: string;
      exponent: string;
    };
    algorithm: string;
  };
  thumbprint_sha256: string;
  cert_signature: {
    signature: string;
    signature_algorithm: string;
  };
  validity: {
    not_after: Date | string;
    not_before: Date | string;
  };
  version: string;
  extensions: {
    certificate_policies: string[];
    extended_key_usage: string[];
    authority_key_identifier: {
      keyid: string;
    };
    subject_alternative_name: string[];
    subject_key_identifier: string;
    key_usage: string[];
    "1.3.6.1.4.1.11129.2.4.2": string;
    CA: boolean;
    ca_information_access: {
      "CA Issuers": string;
      OCSP: string;
    };
  };
  thumbprint: string;
  serial_number: string;
  issuer: {
    C: string;
    CN: string;
    O: string;
  };
  subject: {
    CN: string;
  };
}

export interface Automation {
  interval: string;
  action: (...args: any) => any;
}
