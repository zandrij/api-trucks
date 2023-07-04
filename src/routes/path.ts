import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { createOnlyPathCtrl, getPath, getPathCtrl } from "../controllers/path";
import { createOnlyPathSchema, getOnePathsSchema, getPathsSchema } from "../schemas/path.schema";
import { getPathOne } from "../services/path.service";

const router = Router();

router.post('/only', checkJwt, schemaValidator(createOnlyPathSchema), createOnlyPathCtrl);
router.get('/', checkJwt, schemaValidator(getPathsSchema), getPathCtrl);
router.get('/:id', checkJwt, schemaValidator(getOnePathsSchema), getPath);
export {router};


