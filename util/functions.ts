import { whoIsAPI, virusTotalAPI } from "./axios";
import type { VirusTotalApiResponse, VirusTotalData, WhoIsData } from "./types";
import cloneDeep from "clone-deep";

/**
 * Receives a domain name and returns WhoIs data about the domain, which is
 * fetched from the third-party IP2Location.io REST API.
 */
export const getWhoIsData = async (domain: string) => {
  try {
    const { data } = await whoIsAPI.get<WhoIsData>("/", {
      params: { key: process.env.WHOIS_API_KEY, domain }
    });
    return convertWhoIsData(data);
  } catch (error: any) {
    console.log(
      `Failed to get WhoIs data for domain ${domain}`,
      error.response?.data || error
    );
    return null;
  }
};

/**
 * Receives a domain name and returns security analysis about the domain,
 * which is fetched from the third-party VirusTotal REST API.
 */
export const getVirusTotalData = async (domain: string) => {
  try {
    const { data } = await virusTotalAPI.get<VirusTotalApiResponse>(
      `/domains/${domain}`,
      { headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY } }
    );
    return convertVirusTotalData(data.data.attributes);
  } catch (error: any) {
    console.log(
      `Failed to get VirusTotal data for domain ${domain}`,
      error.response?.data || error
    );
    return null;
  }
};

/**
 * Receives data returned from the WhoIs API and returns a converted version of it,
 * transforming string into Date where needed.
 */
const convertWhoIsData = (data: WhoIsData) => {
  data = cloneDeep(data);
  data.create_date = new Date(data.create_date);
  data.update_date = new Date(data.update_date);
  data.expire_date = new Date(data.expire_date);
  return data;
};

/**
 * Receives data returned from the VirusTotal API and returns a converted version of it,
 * transforming string/number into Date where needed.
 */
const convertVirusTotalData = (data: VirusTotalData) => {
  data = cloneDeep(data);
  const {
    last_dns_records_date,
    last_https_certificate_date,
    last_https_certificate: { validity },
    popularity_ranks
  } = data;
  data.last_dns_records_date = new Date(
    (last_dns_records_date as number) * 1000
  );
  data.last_https_certificate_date = new Date(
    (last_https_certificate_date as number) * 1000
  );
  for (const site in popularity_ranks) {
    const { timestamp } = popularity_ranks[site];
    popularity_ranks[site].timestamp = new Date((timestamp as number) * 1000);
  }
  const { not_after, not_before } = validity;
  validity.not_after = new Date(not_after);
  validity.not_before = new Date(not_before);
  return data;
};
