import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { loginSchema, registerDriveSchema, registerOwnerSchema } from "../schemas/auth.schema";
import { loginCtrl, registerDriveCrtl, registerOwnerCrtl } from "../controllers/auth";
import { checkJwt } from "../middleware/session";

const router = Router();

router.post('/register', schemaValidator(registerOwnerSchema), registerOwnerCrtl);
router.post('/drive', checkJwt, schemaValidator(registerDriveSchema), registerDriveCrtl);
router.post('/login', schemaValidator(loginSchema), loginCtrl);
export {router};