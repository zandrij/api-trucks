import { z } from "zod";

// update path schema validator
const updateMunicipioSchema = z.object({
    body: z.object({
        name: z.string().min(3).nonempty(),
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

// update path schema validator
const createMunicipioSchema = z.object({
    body: z.object({
        name: z.string().min(3).nonempty(),
    })
});

export {
    updateMunicipioSchema,
    createMunicipioSchema
    
}