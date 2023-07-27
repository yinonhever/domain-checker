import { Automation } from "../util/types";
import scanDomains from "./scan-domains";

const automations: Automation[] = [
  {
    // Schedule the domain scanning to run at the 1st of every month at 00:00
    interval: "0 0 1 * *",
    action: scanDomains
  }
];

export default automations;
