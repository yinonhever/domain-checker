import type { RequestHandler } from "express";
import type { DomainRequestData, DomainScanResult } from "../util/types";
import Domain from "../models/domain";
import { isValidDomain } from "../util/functions";

/**
 * Controller for the POST /domains API route, taking a domain name from the request body
 * and adding the domain to the database for future analysis. Returns an error if the domain
 * already exists in the database.
 */
export const addDomain: RequestHandler = async (req, res) => {
  try {
    const { name }: DomainRequestData = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ msg: "No domain name was provided" });
    }
    if (!isValidDomain(name)) {
      return res.status(400).json({ msg: "Invalid domain name" });
    }
    const existingItem = await Domain.findOne({ name }).select("name");
    if (existingItem) {
      return res
        .status(400)
        .json({ msg: "This domain already exists on our system", name });
    }
    const item = new Domain({ name });
    const createdItem = await item.save();
    res
      .status(201)
      .json({ msg: "Added domain to list for analysis", name, createdItem });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Controller for the GET /domains/:name/current API route, taking the domain name from
 * the request's params and retrieving the latest data that's been collected for this domain
 * from the database. If domain doesn't exist yet, it adds the domain for future scanning.
 */
export const getDomainCurrentInfo: RequestHandler = async (req, res) => {
  try {
    const { name }: DomainRequestData = req.params;
    if (!name?.trim()) {
      return res.status(400).json({ msg: "No domain name was provided" });
    }
    if (!isValidDomain(name)) {
      return res.status(400).json({ msg: "Invalid domain name" });
    }
    const existingItem = await Domain.findOne({ name });
    if (!existingItem) {
      const newItem = new Domain({ name });
      const createdItem = await newItem.save();
      return res.status(201).json({
        msg: "Added domain to list for analysis. Please check back later",
        name,
        createdItem
      });
    }
    const { scans } = existingItem;
    scans.sort((a, b) => +b.date - +a.date);
    const whoIs = scans.find(scan => scan.result.whoIs)?.result.whoIs || null;
    const virusTotal =
      scans.find(scan => scan.result.virusTotal)?.result.virusTotal || null;
    if (!whoIs && !virusTotal) {
      return res.json({
        msg: "No data was collected for this domain yet. Please check back later",
        name
      });
    }
    const data: DomainScanResult = { whoIs, virusTotal };
    res.json(data);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
