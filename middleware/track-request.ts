import type { RequestHandler } from "express";
import { getClientIp } from "request-ip";
import RequestLog from "../models/request-log";

/**
 * Tracks every request sent to a valid route in the API and saves details
 * of the request in the database.
 */
const trackRequest: RequestHandler = (req, res, next) => {
  const { method, params, body, query, originalUrl } = req;
  const domain = params.name || body.name;
  const ip = getClientIp(req);
  const requestLog = new RequestLog({
    path: originalUrl,
    method,
    domain,
    params,
    query,
    body,
    ip
  });
  (async () => {
    try {
      await requestLog.save();
    } catch (error) {
      console.log("Failed to save request in DB", error);
    }
  })();
  next();
};

export default trackRequest;
