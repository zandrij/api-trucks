import { z } from "zod";

/** crear un path */
const createOnlyPathSchema = z.object({
    body: z.object({
        name: z.string().min(3).nonempty(),
    })
});

/** obtener paths */
const getPathsSchema = z.object({
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
        zones: z.string().optional().transform((val) => {
            return (val === 'true')
        })
    }),
});

export {
    createOnlyPathSchema,
    getPathsSchema
}