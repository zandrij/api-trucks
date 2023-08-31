import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { createMunicipioSchema, updateMunicipioSchema } from "../schemas/municipio.schema";
import { createOneMunicipioCtrl, getMunicipioCtrl, updateMunicipioCtrl } from "../controllers/municipio";

const router = Router();

router.get('/', checkJwt, getMunicipioCtrl);
router.post('/', checkJwt, schemaValidator(createMunicipioSchema), createOneMunicipioCtrl);
router.put('/:id', checkJwt, schemaValidator(updateMunicipioSchema), updateMunicipioCtrl);
// router.get('/only/:id', checkJwt, schemaValidator(getOnePathSchema), getOnePathCtrl);
// router.delete('/:id', checkJwt, schemaValidator(deleteUserSchema), deleteLogicPathCtrl);
export {router};


