import type { Automation } from "../util/types";
import scanDomains from "./scan-domains";

/**
 * Array that contains all the automations that would be scheduled.
 */
const automations: Automation[] = [
  {
    interval: "0 0 1 * *",
    action: scanDomains
  }
];

export default automations;
