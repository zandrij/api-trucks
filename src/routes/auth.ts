import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { loginSchema, registerCustomerSchema, registerDriveSchema, registerOwnerSchema } from "../schemas/auth.schema";
import { loginCtrl, registerCustomerCrtl, registerDriveCrtl, registerOwnerCrtl } from "../controllers/auth";
import { checkJwt } from "../middleware/session";

const router = Router();

router.post('/register', checkJwt, schemaValidator(registerOwnerSchema), registerOwnerCrtl);
router.post('/drive', checkJwt, schemaValidator(registerDriveSchema), registerDriveCrtl);
router.post('/customer', checkJwt, schemaValidator(registerCustomerSchema), registerCustomerCrtl);
router.post('/login', schemaValidator(loginSchema), loginCtrl);
export {router};