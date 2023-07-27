import type { RequestHandler } from "express";
import type {
  DomainCurrentInfoResponse,
  DomainRequestData
} from "../util/types";
import Domain from "../models/domain";

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
        msg: "This domain wasn't found on our system. Added domain to list for analysis",
        name,
        createdItem
      });
    }
    const [lastSuccessfulScan] = existingItem.scans.sort(
      (a, b) => +b.date - +a.date
    );
    if (!lastSuccessfulScan) {
      return res.json({
        msg: "No data was collected for this domain yet. Please check back later",
        name
      });
    }
    const data: DomainCurrentInfoResponse = {
      currentResult: lastSuccessfulScan.result,
      lastScanDate: lastSuccessfulScan.date
    };
    res.json(data);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
