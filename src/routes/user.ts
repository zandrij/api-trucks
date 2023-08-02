import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { deleteUserSchema, getUserImeiSchema, getUserSchema, getUsersSchema, updateUserSchema } from "../schemas/user.schema";
import { deleteLoginUserCtrl, getUserIdCrtl, getUserImeiCrtl, getUsersCtrl, updateUserCtrl } from "../controllers/users";

const router = Router();

router.get('/', checkJwt, schemaValidator(getUsersSchema), getUsersCtrl);
router.get('/:id', checkJwt, schemaValidator(getUserSchema), getUserIdCrtl);
router.get('/imei/:device', schemaValidator(getUserImeiSchema), getUserImeiCrtl);
router.delete('/:id', checkJwt, schemaValidator(deleteUserSchema), deleteLoginUserCtrl);
router.put('/edit/:id', checkJwt, schemaValidator(updateUserSchema), updateUserCtrl);
export {router};


