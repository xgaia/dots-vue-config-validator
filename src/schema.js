import { z } from "zod";

const ConfigSchema = z.object({
  host: z.string().nonempty(),
  port: z.number().int().positive(),
});

export { ConfigSchema };
