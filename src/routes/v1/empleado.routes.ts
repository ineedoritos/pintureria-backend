import { Router } from "express";
import { empleadoController } from "../../controllers/empleado.controller";
const router = Router();

router.get("/", empleadoController.getAll);
router.get("/:id", empleadoController.getById);
router.post("/", empleadoController.create);
router.put("/:id", empleadoController.update);
router.delete("/:id", empleadoController.delete);

export default router;
