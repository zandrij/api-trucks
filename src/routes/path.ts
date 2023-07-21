import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { AddUserToPathCtrl, createOnlyPathCtrl, getOnePathCtrl, getOnePathWithUsersCtrl, getPathCtrl, removeUserToPathCtrl, updatePathCtrl } from "../controllers/path";
import { addUserToPathSchema, createOnlyPathSchema, getOnePathSchema, getPathsSchema, removeUserToPathSchema, updatePathSchema } from "../schemas/path.schema";

const router = Router();

router.post('/only', checkJwt, schemaValidator(createOnlyPathSchema), createOnlyPathCtrl);
router.post('/user', checkJwt, schemaValidator(addUserToPathSchema), AddUserToPathCtrl);
router.get('/', checkJwt, schemaValidator(getPathsSchema), getPathCtrl);
router.get('/:id', checkJwt, schemaValidator(getOnePathSchema), getOnePathWithUsersCtrl);
router.delete('/user', checkJwt, schemaValidator(removeUserToPathSchema), removeUserToPathCtrl);
router.put('/:id', checkJwt, schemaValidator(updatePathSchema), updatePathCtrl);
router.get('/only/:id', checkJwt, schemaValidator(getOnePathSchema), getOnePathCtrl);
export {router};


