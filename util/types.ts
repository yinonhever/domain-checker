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
  public_key: object;
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
  extensions: object;
  thumbprint: string;
  serial_number: string;
  issuer: Object;
  subject: object;
}

export interface VirusTotalApiResponse {
  data: {
    attributes: VirusTotalData;
  };
}

export interface Automation {
  interval: string;
  action: (...args: any) => any;
}
