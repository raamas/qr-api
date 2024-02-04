import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	FastifyPluginOptions,
} from "fastify";
import { generateQrCode } from "./functions.js";
import fs, { ReadStream, WriteStream } from "fs";

const routes = async (
	fastify: FastifyInstance,
	options: FastifyPluginOptions
) => {
	fastify.get("/", (request: FastifyRequest, reply: FastifyReply) => {
		return { data: "hello" };
	});

	fastify.get("/generate-qr", (request: CustomRequest, reply: FastifyReply) => {
		if (!request.query || !request.query.text)
			return { data: "url parameter 'text' is empty" };

		let code = generateQrCode(request.query.text.replaceAll(" ", "-"));
		let path = code.path.toString();
		path = path.replace("./assets/", "/qr/");

		reply.send({ data: path });
	});

	fastify.get("/qr/:text", (request: CustomRequest, reply: FastifyReply) => {
		let { text } = request.params;

		reply.header("Content-Type", "image/png");
		reply.send(fs.createReadStream(`./assets/${text}`));
	});
};

type CustomRequest = FastifyRequest<{
	Querystring: {
		text: string;
	};
	Params: {
		text: string;
	};
}>;

export default routes;
