import z from "zod";

export const ParamIdSchema = z.object({ id: z.coerce.number() });

export type ParamId = z.infer<typeof ParamIdSchema>;
