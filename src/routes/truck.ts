import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { createTruckCtrl, deleteLogicTrucksCtrl, getTruckCtrl, getTrucksCtrl, updateTruckCtrl } from "../controllers/trucks";
import { createTruckSchema, getTruckSchema, getTrucksSchema, updateTruckSchema } from "../schemas/truck.schema";
import { deleteUserSchema } from "../schemas/user.schema";

const router = Router();

router.get('/', checkJwt, schemaValidator(getTrucksSchema), getTrucksCtrl);
router.get('/:id', checkJwt, schemaValidator(getTruckSchema), getTruckCtrl);
router.post('/create', checkJwt, schemaValidator(createTruckSchema), createTruckCtrl);
// router.put('/change-status/:id', checkJwt, schemaValidator(updateDayStatuschema), updateDayStatusCtrl);
router.put('/:id', checkJwt, schemaValidator(updateTruckSchema), updateTruckCtrl);
router.delete('/:id', checkJwt, schemaValidator(deleteUserSchema), deleteLogicTrucksCtrl);
export {router};