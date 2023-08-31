import { boolean, z } from "zod";

/** crear un path */
const createOnlyPathSchema = z.object({
    body: z.object({
        name: z.string().min(3).nonempty(),
        municipioId: z.number().min(1, 'Campo es requerido')
    })
});

/** agregar un usuario a un path */
// const addUserToPathSchema = z.object({
//     body: z.object({
//         pathId: z.number().min(1).nonnegative(),
//         userId: z.number().min(1).nonnegative(),
//     })
// });


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
        name: z.string().optional(),
        all: z.string().refine((data) => {
            return data === 'true' || data === 'false';
          }, {
            message: 'El valor debe ser "true" o "false"',
          }).transform(data => data === 'true').default('false')
        // customers: z.string().optional().transform((val) => {
        //     return (val === 'true')
        // })
        // zones: z.string().optional().transform((val) => {
        //     return (val === 'true')
        // })
    }),
});

/** remover usuario de un path paths */
// const removeUserToPathSchema = z.object({
//     query: z.object({
//         pathId: z.string().nonempty().transform((val, ctx) => {
//             const result = parseInt(val);
//             if (isNaN(result)) {
//                 ctx.addIssue({
//                     code: z.ZodIssueCode.custom,
//                     message: "id no es un numero"
//                 });
//                 return z.NEVER;
//             }
//             return result;
//         }),
//         userId: z.string().nonempty().transform((val, ctx) => {
//             const result = parseInt(val);
//             if (isNaN(result)) {
//                 ctx.addIssue({
//                     code: z.ZodIssueCode.custom,
//                     message: "id no es un numero"
//                 });
//                 return z.NEVER;
//             }
//             return result;
//         })
//     }),
// });

// update path schema validator
const updatePathSchema = z.object({
    body: z.object({
        name: z.string().min(3).optional(),
        municipioId: z.number().min(1).optional()
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

/** obtener una paths */
const getOnePathSchema = z.object({
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
    createOnlyPathSchema,
    getPathsSchema,
    // addUserToPathSchema,
    // removeUserToPathSchema,
    updatePathSchema,
    getOnePathSchema
}