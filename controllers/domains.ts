import type { RequestHandler } from "express";
import type { DomainRequestData } from "../util/types";
import Domain, { DomainData } from "../models/domain";

export const getDomainData: RequestHandler = async (req, res) => {
  try {
    const { name }: DomainRequestData = req.query;
    if (!name?.trim()) {
      return res.status(400).json({ msg: "No domain was provided" });
    }
    const existingItem = await Domain.findOne({ name });
    if (!existingItem) {
      const newItem = new Domain({ name });
      const createdItem = await newItem.save();
      return res.status(201).json({
        msg: "This domain name wasn't found on our system. Added domain to list for analysis",
        name,
        createdItem
      });
    }
    const domainData: DomainData = existingItem.toObject();
    domainData.scans.sort((a, b) => +b.date - +a.date);
    domainData.lastScanDate = domainData.scans[0]?.date;
    res.json(domainData);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const addDomain: RequestHandler = async (req, res) => {
  try {
    const { name }: DomainRequestData = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ msg: "No domain name was provided" });
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
