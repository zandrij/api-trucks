import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { createOnlyPathCtrl, getPathCtrl } from "../controllers/path";
import { createOnlyPathSchema, getPathsSchema } from "../schemas/path.schema";

const router = Router();

router.post('/only', checkJwt, schemaValidator(createOnlyPathSchema), createOnlyPathCtrl);
router.get('/', checkJwt, schemaValidator(getPathsSchema), getPathCtrl);
export {router};


