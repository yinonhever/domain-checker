import { Router } from "express";
import { addDomain, getDomainData } from "../controllers/domains";

const router = Router();

router.get("/", getDomainData);
router.post("/", addDomain);

export default router;
