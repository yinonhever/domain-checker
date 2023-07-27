import { RequestHandler } from "express";
import { getClientIp } from "request-ip";
import RequestLog from "../models/request-log";

const trackRequest: RequestHandler = async (req, res, next) => {
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
