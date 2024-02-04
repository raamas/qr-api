"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(import("../routes.js"));

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}

// Unhandled Promise Rejection {"errorType":"Runtime.UnhandledPromiseRejection","errorMessage":"TypeError: Cannot read properties of undefined (reading 'name')","reason":{"errorType":"TypeError","errorMessage":"Cannot read properties of undefined (reading 'name')","stack":["TypeError: Cannot read properties of undefined (reading 'name')","    at Object.checkPluginHealthiness (/var/task/node_modules/fastify/lib/pluginUtils.js:140:22)","    at Object.registerPlugin (/var/task/node_modules/fastify/lib/pluginUtils.js:147:26)","    at Boot.override (/var/task/node_modules/fastify/lib/pluginOverride.js:28:57)","    at Plugin.exec (/var/task/node_modules/avvio/plugin.js:79:33)","    at Boot.loadPlugin (/var/task/node_modules/avvio/plugin.js:272:10)","    at /var/task/node_modules/avvio/plugin.js:262:18"]},"promise":{},"stack":["Runtime.UnhandledPromiseRejection: TypeError: Cannot read properties of undefined (reading 'name')","    at process.<anonymous> (file:///var/runtime/index.mjs:1276:17)","    at process.emit (node:events:529:35)","    at emit (node:internal/process/promises:149:20)","    at processPromiseRejections (node:internal/process/promises:283:27)","    at process.processTicksAndRejections (node:internal/process/task_queues:96:32)"]}
// Unknown application error occurred
// Runtime.Unknown