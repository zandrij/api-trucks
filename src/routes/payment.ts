import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { getPaymentSchema, reporterPaymentSchema, updatePaymentRefSchema, updatePaymentStatuschema } from "../schemas/payment.schema";
import { getPaymentsCtrl, reportPaymentCtrl, updatePaymentStatusCtrl, uploadPaidCtrl } from "../controllers/payment";
import multerMiddleware from "../middleware/file";

const router = Router();

/**
 * Get payment
 * @openapi
 * /payment:
 *  get:
 *      tags:
 *          - Pagos
 *      summary: "Obtener lista de pagos con (cliente y jornada)"
 *      description: Obtener lista de pagos con (cliente y jornada)
 *      parameters:
 *        - name: status
 *          in: query
 *          required: false
 *          description: estado de la jornada recibe. "wait", "paid", "reject", "aproved", "cancel"
 *        - name: page
 *          in: query
 *          required: false
 *          description: numero de pagina
 *        - name: limit
 *          in: query
 *          required: false
 *          description: numero de elementos(items) que quieres en la pagina
 *        - name: day
 *          in: query
 *          required: false
 *          description: Busqueda por id de jornada
 *        - name: path
 *          in: query
 *          required: false
 *          description: Busqueda por id de ruta
 *        - name: start
 *          in: query
 *          required: false
 *          description: Busqueda por fecha inicio en formato "2023-08-01 00:00:00"
 *        - name: end
 *          in: query
 *          required: false
 *          description: Busqueda por fecha fin en formato "2023-08-01 00:00:00"
 *      responses:
 *          '200':
 *              description: lista de rutas
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/', checkJwt, schemaValidator(getPaymentSchema), getPaymentsCtrl);

/**
 * update payment
 * @openapi
 * /payment/status/{id}:
 *  put:
 *      tags:
 *          - Pagos
 *      summary: "Editar el estado de un pago"
 *      description: Editar el estado de un pago
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/paymentStatus"
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id de la jornada a editar
 *      responses:
 *          '200':
 *              description: pago actualizado
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.put('/status/:id', checkJwt, schemaValidator(updatePaymentStatuschema), updatePaymentStatusCtrl);

/**
 * update payment
 * @openapi
 * /payment/paid/{id}:
 *  put:
 *      tags:
 *          - Pagos
 *      summary: "Subir comprobante de pago"
 *      description: Subir comprobante de pago y referencia
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          referencia:
 *                              type: string
 *                          file:
 *                              type: string
 *                              format: binary
 *                          type:
 *                              type: string
 *                              enum: ["cash", "transfer", "mobile"]
 *                          amount:
 *                              type: number
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id del pago
 *      responses:
 *          '200':
 *              description: pago actualizado
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.put('/paid/:id', checkJwt, multerMiddleware.single('file'), schemaValidator(updatePaymentRefSchema), uploadPaidCtrl);

/**
 * Get payment
 * @openapi
 * /payment/reports:
 *  get:
 *      tags:
 *          - Pagos
 *      summary: "Obtener lista de pagos"
 *      description: Obtener lista de pagos
 *      parameters:
 *        - name: status
 *          in: query
 *          required: false
 *          description: estado de la jornada recibe. "wait", "paid", "reject", "aproved", "cancel"
 *        - name: page
 *          in: query
 *          required: false
 *          description: numero de pagina
 *        - name: limit
 *          in: query
 *          required: false
 *          description: numero de elementos(items) que quieres en la pagina
 *        - name: day
 *          in: query
 *          required: false
 *          description: Busqueda por id de jornada
 *        - name: path
 *          in: query
 *          required: false
 *          description: Busqueda por id de ruta
 *        - name: start
 *          in: query
 *          required: false
 *          description: Busqueda por fecha inicio en formato "2023-08-01 00:00:00"
 *        - name: end
 *          in: query
 *          required: false
 *          description: Busqueda por fecha fin en formato "2023-08-01 00:00:00"
 *      responses:
 *          '200':
 *              description: lista de rutas
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/reports', checkJwt, schemaValidator(reporterPaymentSchema), reportPaymentCtrl)
export default router;