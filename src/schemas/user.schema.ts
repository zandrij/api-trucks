import { z } from "zod";

const updateUserSchema = z.object({
    body: z.object({
        name: z.string().trim().optional(),
        lastName: z.string().trim().optional(),
        email: z.string().trim().email({message: "Email es inválido"}).optional(),
        dni: z.string().min(8).trim().optional(),
        phone: z.string().min(8).trim().optional(),
        device: z.string().min(8).trim().optional(),
        address: z.string().trim().optional(),
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

/** obtener usuarios */
const getUsersSchema = z.object({
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
        typeUser: z.string().optional() // 'owner' | 'customer' | 'drive'
    }),
});

/** eliminar un usuario */
const deleteUserSchema = z.object({
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

const getUserSchema = z.object({
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
    updateUserSchema,
    getUsersSchema,
    deleteUserSchema,
    getUserSchema
}