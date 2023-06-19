import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import VPC from '../modules/vpc';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface CdkmultistackStackProps extends cdk.StackProps {
  appName: string;
  envName: string;
}

export class CdkmultistackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CdkmultistackStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkmultistackQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const Vpc = new VPC(this, {
      appName: props.appName,
      envName: props.envName
    });
  }
}
