import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
export class BackendInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "FastifyHandle", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(path.resolve(__dirname, "../function-code")), // reference to backend function code
      handler: "index.handler",
    });
    const api = new apigateway.LambdaRestApi(this, "testapi", {
      handler: handler,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ["*"],
      },
      // REMOVE Auth for options manually
      defaultMethodOptions: {
        authorizationType: apigateway.AuthorizationType.NONE,
      },
      deployOptions: {
        stageName: "dev",
      },
    });
    new CfnOutput(this, "TheUrl", {
      value: api.url,
    });
  }
}
