import type { RequestHandler } from "express";
import type { DomainRequestData, DomainScanResult } from "../util/types";
import Domain from "../models/domain";

export const addDomain: RequestHandler = async (req, res) => {
  try {
    const { name }: DomainRequestData = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ msg: "No domain name was provided" });
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

export const getDomainCurrentInfo: RequestHandler = async (req, res) => {
  try {
    const { name }: DomainRequestData = req.params;
    if (!name?.trim()) {
      return res.status(400).json({ msg: "No domain name was provided" });
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
