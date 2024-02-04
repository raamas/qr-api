import fastify, { FastifyInstance } from "fastify";
import routes from "./routes.js";

const server: FastifyInstance = fastify({
  logger: true,
});

server.register(routes);

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
