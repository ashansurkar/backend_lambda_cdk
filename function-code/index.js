const awsLambdaFastify = require("aws-lambda-fastify");
const init = require("./app");

const proxy = awsLambdaFastify(init());
exports.handler = proxy;
