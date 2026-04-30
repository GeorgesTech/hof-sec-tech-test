import 'fastify';
import type { AuthPlugin } from './sessions/auth-plugin.ts';

declare module 'fastify' {
  interface FastifyRequest {
    auth: AuthPlugin;
  }
}
