const fastify = require("fastify");

function init() {
  const app = fastify();
  app.get("/", (request, reply) => reply.send({ hello: "world" }));
  return app;
}

if (require.main === module) {
  // called directly i.e. "node app"
  init().listen(3005, (err) => {
    if (err) console.error(err);
    console.log("server listening on http://localhost:3005");
  });
} else {
  // required as a module => executed on aws lambda
  module.exports = init;
}
