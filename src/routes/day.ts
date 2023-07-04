import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { createDayCtrl, getDayOfDriverCtrl, getDaysCtrl, updateDayRouteCtrl, updateDayStatusCtrl } from "../controllers/day";
import { createDaySchema, getDaysSchema, updateDayRouteschema, updateDayStatuschema } from "../schemas/day.schema";

const router = Router();

router.get('/', checkJwt, schemaValidator(getDaysSchema), getDaysCtrl);
router.get('/drive', checkJwt, getDayOfDriverCtrl);
router.post('/create', checkJwt, schemaValidator(createDaySchema), createDayCtrl);
router.put('/change-status/:id', checkJwt, schemaValidator(updateDayStatuschema), updateDayStatusCtrl);
router.put('/change-route/:id', checkJwt, schemaValidator(updateDayRouteschema), updateDayRouteCtrl);
export {router};