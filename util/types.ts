export type DataItem<T = unknown, S = unknown> = T &
  S & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  };

export interface DomainRequestData {
  name?: string;
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

export interface WhoIsData {
  domain: string;
  domain_id: string;
  status: string;
  create_date: Date;
  update_date: Date;
  expire_date: Date;
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

export interface VirusTotalData {
  last_dns_records: DnsRecord[];
  // ............
}

export interface DomainScan {
  date: Date;
  success: boolean;
}
