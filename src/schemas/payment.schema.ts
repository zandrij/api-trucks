import { z } from "zod";

/** obtener lista de pagos con usuarios pagos */
const getPaymentSchema = z.object({
    query: z.object({
        limit: z.string().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }).default('2'),
        page: z.string().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }).default('1'),
        day: z.string().optional().transform((val, ctx) => {
            const result = parseInt(val!);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }).default('0'),
        path: z.string().optional().transform((val, ctx) => {
            const result = parseInt(val!);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }).default('0'),
        user: z.string().optional().transform((val, ctx) => {
            const result = parseInt(val!);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }).default('0'),
        status: z.string().trim().optional(),
        start: z.string().trim().optional(),
        end: z.string().trim().optional(),
        // path: z.string().optional().transform((val) => {
        //     return (val === 'true')
        // })
    }),
});

// actualizar el estado de un pago
const updatePaymentStatuschema = z.object({
    body: z.object({
        status: z.enum(['wait', 'paid', 'reject', 'aproved', 'cancel']),
        amount: z.string().trim().optional()
    }),
    params: z.object({
        id: z.string().nonempty().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }),
    })
});

// subir ref e imagen
const updatePaymentRefSchema = z.object({
    body: z.object({
        reference: z.string().trim().nonempty(),
        type: z.enum(['cash', 'transfer', 'mobile']),
        status: z.enum(['wait', 'paid', 'reject', 'aproved', 'cancel']),
        amount: z.string().trim().optional()
    }),
    params: z.object({
        id: z.string().nonempty().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }),
    })
});


export {
    getPaymentSchema,
    updatePaymentStatuschema,
    updatePaymentRefSchema
}