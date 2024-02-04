import { generateQrCode } from "./functions.js";
import fs from "fs";
const routes = async (fastify, options) => {
    fastify.get("/", (request, reply) => {
        return { data: "hello" };
    });
    fastify.get("/get-qr", (request, reply) => {
        console.log(request.query);
        return { data: request.query };
    });
    fastify.get("/generate-qr", (request, reply) => {
        if (!request.query || !request.query.text)
            return { data: "url parameter 'text' is empty" };
        let code = generateQrCode(request.query.text.replaceAll(" ", "-"));
        let path = code.path.toString();
        path = path.replace("./assets/", "/qr/");
        reply.send({ data: path });
    });
    fastify.get("/qr/:text", (request, reply) => {
        let { text } = request.params;
        reply.header("Content-Type", "image/png");
        reply.send(fs.createReadStream(`./assets/${text}`));
    });
};
export default routes;
