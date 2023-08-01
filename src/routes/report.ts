import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { generateExcelReportSchema, getReportSchema } from "../schemas/report.schema";
import { generateExcelReportCtrl, getCustomerBuyCtrl, getDriverDayEndCtrl, getPathWithDaysCtrl } from "../controllers/report";
// import { AddUserToPathCtrl, createOnlyPathCtrl, getOnePathCtrl, getOnePathWithUsersCtrl, getPathCtrl, removeUserToPathCtrl, updatePathCtrl } from "../controllers/path";
// import { addUserToPathSchema, createOnlyPathSchema, getOnePathSchema, getPathsSchema, removeUserToPathSchema, updatePathSchema } from "../schemas/path.schema";

const router = Router();

router.get('/clients', checkJwt, schemaValidator(getReportSchema), getCustomerBuyCtrl);
router.get('/paths', checkJwt, schemaValidator(getReportSchema), getPathWithDaysCtrl);
router.get('/drive', checkJwt, schemaValidator(getReportSchema), getDriverDayEndCtrl);
router.get('/', checkJwt, schemaValidator(generateExcelReportSchema), generateExcelReportCtrl);
export {router};


