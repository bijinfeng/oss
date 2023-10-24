import * as z from "zod";

const envSchema = z.object({
  SERVER_HOST: z.string().min(1),
});

type Env = z.infer<typeof envSchema>;

declare global {
  var ENV: Env;
  interface Window {
    ENV: Env;
  }
}

export function getEnv() {
  return envSchema.parse(process.env);
}
