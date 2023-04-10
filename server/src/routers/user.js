import express from "express";
import { create, get, getAll, remove, update } from "../controllers/user";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/users", checkPermission, getAll);
router.get("/users/:id", checkPermission, get);
router.post("/users", checkPermission, create)
router.delete("/users/:id", checkPermission, remove);
router.patch("/users/:id", checkPermission, update);

export default router;
