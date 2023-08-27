import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { createDayCtrl, finallyDayCtrl, getDayCtrl, getDayOfDriverCtrl, getDaysCtrl, updateDayCtrl, updateDayStatusCtrl } from "../controllers/day";
import { createDaySchema, getDaySchema, getDaysSchema, updateDayRouteschema, updateDaySchema, updateDayStatuschema, updateFinallyDaySchema } from "../schemas/day.schema";

const router = Router();

router.get('/', checkJwt, schemaValidator(getDaysSchema), getDaysCtrl);
router.get('/drive', checkJwt, schemaValidator(getDaysSchema), getDayOfDriverCtrl);
router.get('/:id', checkJwt, schemaValidator(getDaySchema), getDayCtrl);
router.post('/create', checkJwt, schemaValidator(createDaySchema), createDayCtrl);
router.put('/change-status/:id', checkJwt, schemaValidator(updateDayStatuschema), updateDayStatusCtrl);
router.put('/end/:id', checkJwt, schemaValidator(updateFinallyDaySchema), finallyDayCtrl);
router.put('/:id', checkJwt, schemaValidator(updateDaySchema), updateDayCtrl);
// router.put('/change-route/:id', checkJwt, schemaValidator(updateDayRouteschema), updateDayRouteCtrl);
export {router};