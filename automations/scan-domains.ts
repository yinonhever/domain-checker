import Domain from "../models/domain";
import { getVirusTotalData, getWhoIsData } from "../util/functions";

/**
 * Receives a domain name, fetches security information about the domain
 * and saves the data as a new scan in the database.
 */
export const scanDomain = async (domain: string) => {
  console.log(`Getting data for domain ${domain}...`);
  const scanDate = new Date();
  const [whoIs, virusTotal] = await Promise.all([
    getWhoIsData(domain),
    getVirusTotalData(domain)
  ]);
  const item = await Domain.findOne({ name: domain });
  if (!item) return;
  item.scans.push({
    date: scanDate,
    result: { whoIs, virusTotal }
  });
  await item.save();
  console.log(`Saved scan result for domain ${domain} on ${scanDate}`);
};

/**
 * Runs over all the domains stored in the database and adds a new scan
 * for each of them.
 */
export default async function scanDomains() {
  console.log("Started scan of all domains...", new Date());
  const domains = await Domain.find();
  for (const domain of domains) {
    await scanDomain(domain.name);
  }
  console.log("Finished scan of all domains", new Date());
}
