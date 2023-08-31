import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { changeUserPasswordSchema, loginSchema, recoverPasswordSchema, registerCustomerSchema, registerDriveSchema, registerOwnerSchema } from "../schemas/auth.schema";
import { changePasswordUserCtrl, loginCtrl, recoverPasswordCtrl, registerCustomerCrtl, registerDriveCrtl, registerOwnerCrtl } from "../controllers/auth";
import { checkJwt } from "../middleware/session";

const router = Router();
/**
 * Post user
 * @openapi
 * /auth/register:
 *  post:
 *      tags:
 *          - auth
 *      summary: "Registrar administrador"
 *      description: Registrar usuario administrador
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/InputOwner"
 *      responses:
 *          '200':
 *              description: Retorna el usuario y token
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.post('/register', schemaValidator(registerOwnerSchema), registerOwnerCrtl);

/**
 * Post user
 * @openapi
 * /auth/drive:
 *  post:
 *      tags:
 *          - auth
 *      summary: "Registrar un conductor"
 *      description: Registrar usuario conductor
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/InputDrive"
 *      responses:
 *          '200':
 *              description: Retorna el usuario
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.post('/drive', checkJwt, schemaValidator(registerDriveSchema), registerDriveCrtl);

/**
 * Post user
 * @openapi
 * /auth/customer:
 *  post:
 *      tags:
 *          - auth
 *      summary: "Registrar un cliente"
 *      description: Registrar usuario cliente
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/InputCustomer"
 *      responses:
 *          '200':
 *              description: Retorna el usuario
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.post('/customer', checkJwt, schemaValidator(registerCustomerSchema), registerCustomerCrtl);

/**
 * Post user
 * @openapi
 * /auth/login:
 *  post:
 *      tags:
 *          - auth
 *      summary: "Login de usuarios"
 *      description: Login de usuarios (todos los usuarios). los usuarios conductores pueden ingresar con dni y los cliente
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/auth"
 *      responses:
 *          '200':
 *              description: Retorna el usuario y token
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.post('/login', schemaValidator(loginSchema), loginCtrl);

/**
 * Put user
 * @openapi
 * /auth/update-pass:
 *  put:
 *      tags:
 *          - auth
 *      summary: "Actualizar contraseña"
 *      description: Actualiza la contraseña cuando estas logueado (no necesitas pasar el id porque lo toma del token de auth)
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/updatePassword"
 *      responses:
 *          '200':
 *              description: solo retorna el mensaje exitoso
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.put('/update-pass', checkJwt, schemaValidator(changeUserPasswordSchema), changePasswordUserCtrl);

/**
 * Put user
 * @openapi
 * /auth/recover-pass:
 *  put:
 *      tags:
 *          - auth
 *      summary: "Recuperar contraseña"
 *      description: Recuperar contraseña cuando el usuario la olvida (para todos los usuarios)
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/recoverPassword"
 *      responses:
 *          '200':
 *              description: solo retorna el mensaje exitoso
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.post('/recover-pass', schemaValidator(recoverPasswordSchema), recoverPasswordCtrl);

export default router;