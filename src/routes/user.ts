import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { deleteUserSchema, getUsersSchema, updateUserSchema } from "../schemas/user.schema";
import { deleteLoginUserCtrl, getUsersCtrl, updateUserCtrl } from "../controllers/users";

const router = Router();

router.get('/', checkJwt, schemaValidator(getUsersSchema), getUsersCtrl);
router.delete('/:id', checkJwt, schemaValidator(deleteUserSchema), deleteLoginUserCtrl);
router.put('/edit/:id', checkJwt, schemaValidator(updateUserSchema), updateUserCtrl);
export {router};


