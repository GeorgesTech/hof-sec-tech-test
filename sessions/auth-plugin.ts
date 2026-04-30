import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(
  async (instance: FastifyInstance) => {
    instance.addHook('preValidation', async (request: FastifyRequest, reply: FastifyReply) => {
      // Fonctionnement des sessions hors-sujet de l'exercice
      // Ici le cookie est seulement le user id de l'utilisateur connecté sans aucune sécurité
      const userId = request.cookies.session;

      if (userId) {
        request.auth = {
          authenticated: true,
          user: { id: userId },
          signOut: async () => {
            reply.clearCookie('session');
          },
          createSession: () => {
            throw new Error('Already authenticated');
          }
        }
      } else {
        request.auth = {
          authenticated: false,
          createSession: async ({ userId }: { userId: string }) => {
            reply.setCookie('session', userId, {
              httpOnly: true,
              sameSite: 'strict',
            });
          },
          signOut: async () => {/* no op */}
        }
      }

    });
  },
  {
    name: 'auth-plugin',
  },
);

export type AuthPlugin = {
  authenticated: boolean;
  user?: { id: string };
  createSession: (args: { userId: string }) => Promise<void>;
  signOut: () => Promise<void>;
}
