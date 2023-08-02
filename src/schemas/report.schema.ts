import { z } from "zod";

const getReportSchema = z.object({
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
        }).default('10'),
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
        start: z.string().trim().optional(),
        end: z.string().trim().optional(),
    }),
});


const generateExcelReportSchema = z.object({
    query: z.object({
        route: z.string().trim().nonempty(),
        start: z.string().trim().optional(),
        end: z.string().trim().optional(),
    }),
});


export {
    getReportSchema,
    generateExcelReportSchema
}