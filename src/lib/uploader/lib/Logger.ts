import pino from "pino";

import type { IUploader } from "../interface";

export type Logger = ReturnType<typeof pino>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createLogger = (_ctx: IUploader) => {
  return pino({ browser: { asObject: true, serialize: true } });
};
