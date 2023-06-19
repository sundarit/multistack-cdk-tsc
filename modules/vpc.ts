import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { Constants } from '../constants';
import { CfnOutput } from 'aws-cdk-lib';

export interface VPCStackProps extends cdk.StackProps {
        appName: string,
        envName: string
}

export default class VPCStack extends cdk.Stack {
    public readonly vpc: ec2.IVpc;

    constructor(scope: Construct, props: VPCStackProps) {
        super(scope, `${props.appName}-${props.envName}-VPC`);

        this.vpc = new ec2.Vpc(this, `${props.appName}-${props.envName}-VPC`,{
            cidr: Constants.VPCCIDR,
            natGateways: Constants.NAT_GATEWAY,
            maxAzs: Constants.AZ_COUNT,
            subnetConfiguration: [
                {
                    name: 'private',
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    cidrMask: 24
                },
                {
                    name: 'public',
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 24
                }
            ]
        });

        new CfnOutput(this, `VPC`, {value: this.vpc.vpcId});

    }
}