import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { createTruckCtrl, getTruckCtrl, getTrucksCtrl, updateTruckCtrl } from "../controllers/trucks";
import { createTruckSchema, getTruckSchema, updateTruckSchema } from "../schemas/truck.schema";
import { getDaysSchema } from "../schemas/day.schema";

const router = Router();

router.get('/', checkJwt, schemaValidator(getDaysSchema), getTrucksCtrl);
router.get('/:id', checkJwt, schemaValidator(getTruckSchema), getTruckCtrl);
router.post('/create', checkJwt, schemaValidator(createTruckSchema), createTruckCtrl);
// router.put('/change-status/:id', checkJwt, schemaValidator(updateDayStatuschema), updateDayStatusCtrl);
router.put('/:id', checkJwt, schemaValidator(updateTruckSchema), updateTruckCtrl);
export {router};