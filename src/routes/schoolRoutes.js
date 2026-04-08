import { Router } from "express";
import { addSchool } from "../controllers/schoolController.js";

const router = Router();

router.post("/addschool", addSchool);

export default router;