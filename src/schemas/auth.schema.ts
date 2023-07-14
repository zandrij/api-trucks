import {z} from 'zod'

// registrar admin
const registerOwnerSchema = z.object({
    body: z.object({
        name: z.string().trim().nonempty(),
        email: z.string().trim().email({message: "Email es inválido"}).nonempty(),
        password: z.string().trim().min(6, {message: "Contraseña es muy corta"}),
        confirmPass: z.string().nonempty().min(6)
    }).transform((val, ctx) => {
        if(val.password !== val.confirmPass) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "contraseñas no son iguales"
            })
            return z.NEVER;
        }
        return val;
    })
});

const registerDriveSchema = z.object({
    body: z.object({
        name: z.string().trim().nonempty(),
        email: z.string().trim().email({message: "Email es inválido"}).nonempty(),
        password: z.string().trim().min(6, {message: "Contraseña es muy corta"}),
        dni: z.string().min(8).trim().nonempty(),
        confirmPass: z.string().nonempty().min(6)
    }).transform((val, ctx) => {
        if(val.password !== val.confirmPass) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "contraseñas no son iguales"
            })
            return z.NEVER;
        }
        return val;
    })
});

const registerCustomerSchema = z.object({
    body: z.object({
        name: z.string().trim().nonempty(),
        lastName: z.string().trim().optional(),
        email: z.string().trim().email({message: "Email es inválido"}).nonempty(),
        password: z.string().trim().min(6, {message: "Contraseña es muy corta"}),
        dni: z.string().min(8).trim().nonempty(),
        confirmPass: z.string().nonempty().min(6)
    }).transform((val, ctx) => {
        if(val.password !== val.confirmPass) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "contraseñas no son iguales"
            })
            return z.NEVER;
        }
        return val;
    })
});

const loginSchema = z.object({
    body: z.object({
        user: z.string().min(8).trim().nonempty(),
        password: z.string().trim().min(6, {message: "Contraseña es muy corta"}),
    })
});

export {
    registerOwnerSchema,
    registerDriveSchema,
    loginSchema,
    registerCustomerSchema
}