import * as z from "zod";

const envSchema = z.object({
  APPWRITE_PROJECT: z.string().min(1),
  APPWRITE_END_POINT: z.string().min(1),
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
