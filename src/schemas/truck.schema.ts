import { z } from "zod";

const createTruckSchema = z.object({
    body: z.object({
        color: z.string().trim().nonempty(),
        model: z.string().trim().nonempty(),
        serial: z.string().trim().nonempty(),
        lts: z.number().min(1),
        status: z.enum(['avaible', 'disabled', 'working'])
    })
});

const getTruckSchema = z.object({
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

const updateTruckSchema = z.object({
    body: z.object({
        color: z.string().trim().optional(),
        model: z.string().trim().optional(),
        serial: z.string().trim().optional(),
        lts: z.number().min(1).optional(),
        status: z.enum(['avaible', 'disabled', 'working', 'deleted']).optional()
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

/** obtener paths */
const getTrucksSchema = z.object({
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
        model: z.string().optional(),
        serial: z.string().optional()
        // path: z.string().optional().transform((val) => {
        //     return (val === 'true')
        // })
    }),
});

export {createTruckSchema, getTrucksSchema, updateTruckSchema, getTruckSchema}