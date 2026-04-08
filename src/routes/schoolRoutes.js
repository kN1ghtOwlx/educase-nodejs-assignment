import { Router } from "express";
import { addSchool, listSchool } from "../controllers/schoolController.js";

const router = Router();

router.post("/addschool", addSchool);
router.get("/listschool", listSchool)

export default router;