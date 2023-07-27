import { Router } from "express";
import { addDomain, getDomainCurrentInfo } from "../controllers/domains";

const router = Router();

router.post("/", addDomain);
router.get("/:name/current", getDomainCurrentInfo);

export default router;
