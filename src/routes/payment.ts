import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { getPaymentSchema, reporterPaymentSchema, updatePaymentRefSchema, updatePaymentStatuschema } from "../schemas/payment.schema";
import { getPaymentsCtrl, reportPaymentCtrl, updatePaymentStatusCtrl, uploadPaidCtrl } from "../controllers/payment";
import multerMiddleware from "../middleware/file";

const router = Router();

router.get('/', checkJwt, schemaValidator(getPaymentSchema), getPaymentsCtrl);
// router.get('/drive', checkJwt, getDayOfDriverCtrl);
// router.post('/create', checkJwt, schemaValidator(createDaySchema), createDayCtrl);
router.put('/status/:id', checkJwt, schemaValidator(updatePaymentStatuschema), updatePaymentStatusCtrl);
router.put('/paid/:id', checkJwt, multerMiddleware.single('file'), schemaValidator(updatePaymentRefSchema), uploadPaidCtrl);
// router.put('/change-route/:id', checkJwt, schemaValidator(updateDayRouteschema), updateDayRouteCtrl);
router.get('/reports', checkJwt, schemaValidator(reporterPaymentSchema), reportPaymentCtrl)
export {router};