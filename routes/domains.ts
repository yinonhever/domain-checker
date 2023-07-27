import { Router } from "express";
import { addDomain, getDomainCurrentInfo } from "../controllers/domains";
import trackRequest from "../middleware/track-request";

const router = Router();

router.post("/", trackRequest, addDomain);
router.get("/:name/current", trackRequest, getDomainCurrentInfo);

export default router;
