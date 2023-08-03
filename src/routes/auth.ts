import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { changeUserPasswordSchema, loginSchema, recoverPasswordSchema, registerCustomerSchema, registerDriveSchema, registerOwnerSchema } from "../schemas/auth.schema";
import { changePasswordUserCtrl, loginCtrl, recoverPasswordCtrl, registerCustomerCrtl, registerDriveCrtl, registerOwnerCrtl } from "../controllers/auth";
import { checkJwt } from "../middleware/session";

const router = Router();

router.post('/register', schemaValidator(registerOwnerSchema), registerOwnerCrtl);
router.post('/drive', checkJwt, schemaValidator(registerDriveSchema), registerDriveCrtl);
router.post('/customer', checkJwt, schemaValidator(registerCustomerSchema), registerCustomerCrtl);
router.post('/login', schemaValidator(loginSchema), loginCtrl);
router.put('/update-pass', checkJwt, schemaValidator(changeUserPasswordSchema), changePasswordUserCtrl);
router.post('/recover-pass', schemaValidator(recoverPasswordSchema), recoverPasswordCtrl);
export {router};