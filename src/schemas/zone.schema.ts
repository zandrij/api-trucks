import { z } from "zod";

/** crear un path con multiples zonas */
const createZoneSchema = z.object({
    body: z.object({
        name: z.string().min(4).nonempty(),
        zones: z.array(z.object({
            name: z.string().min(3).nonempty(),
            lat: z.number(),
            lng: z.number()
        })).nonempty()
    })
});

/** crear una zona */
const createZoneOnlySchema = z.object({
    body: z.object({
        idpath: z.number().min(1),
        name: z.string().min(3).nonempty(),
        lat: z.number(),
        lng: z.number()
    })
});

/** eliminar una zona */
const deleteOneZoneSchema = z.object({
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


/** obtener una zona */
const getOneZoneSchema = z.object({
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

const updateOneZoneSchema = z.object({
    body: z.object({
        idpath: z.number().optional(),
        name: z.string().min(3).nonempty(),
        lat: z.number(),
        lng: z.number()
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
const getZonesSchema = z.object({
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
        path: z.string().optional().transform((val) => {
            return (val === 'true')
        })
    }),
});

export {
    createZoneSchema,
    createZoneOnlySchema,
    deleteOneZoneSchema,
    updateOneZoneSchema,
    getZonesSchema,
    getOneZoneSchema
}