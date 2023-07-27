import axios from "axios";

export const whoIsAPI = axios.create({
  baseURL: "https://api.ip2whois.com/v2"
});

export const virusTotalAPI = axios.create({
  baseURL: "https://www.virustotal.com/api/v3",
  headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY }
});
