import type { FastifyInstance } from 'fastify';
import publicRoutesPlugin from '../sessions/public-routes-plugin.ts';

export default (fastify: FastifyInstance) => {
  // Public routes
  fastify.register((instance: FastifyInstance) => {
    instance.register(publicRoutesPlugin);

    instance.route({
      method: 'POST',
      url: '/send',
      async handler(request, reply) {
        // TODO
        return { ok: true };
      }
    });

    instance.route({
      method: 'POST',
      url: '/signin',
      async handler(request, reply) {
        await request.auth.createSession({ userId: 'TODO' });
        return { ok: true };
        // TODO
      }
    });
  });
}
