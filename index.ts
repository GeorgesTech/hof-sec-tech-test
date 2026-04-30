import Fastify from 'fastify'
import fastifyCookie from 'fastify-cookie';
import magicLinksRoutes from './magic-links/magic-links.routes.ts';
import authPlugin from './sessions/auth-plugin.ts';

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyCookie);
fastify.register(authPlugin);
fastify.register(magicLinksRoutes, { prefix: '/magic-links' });

fastify.listen({ port: 3000 }).catch((err) => {
  fastify.log.error(err)
  process.exit(1)
});
