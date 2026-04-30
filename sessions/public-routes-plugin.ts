import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(
  async (instance: FastifyInstance) => {
    instance.addHook('preValidation', async (request: FastifyRequest, reply: FastifyReply) => {
      if (request.auth.authenticated) {
        return reply.status(401).send({ error: 'Already authenticated' });
      }
    });
  },
  {
    name: 'public-auth-plugin',
  },
);
