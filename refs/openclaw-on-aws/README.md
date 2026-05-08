# OpenClaw On AWS Source Log

This reference packet supports the Ylang Labs blog post `data/blogs/openclaw-on-aws.mdx` about using OpenClaw on AWS.

Access date for web sources: 2026-05-08.

## Local Research

1. `refs/openclaw-on-aws/deep-research.md`
   - Blog-ready research synthesis covering AWS deployment options, tradeoffs, and recommended patterns.

## Visual Assets

1. `public/static/images/blogs/openclaw-on-aws/source-artwork.png`
   - Generated source artwork for the blog: abstract OpenClaw/AWS runtime gateway with private routing, persistent state, and model-provider connections. Dimensions: `1800x1800`.
2. `public/static/images/blogs/openclaw-on-aws/cardImage.png`
   - Portrait crop derived from `source-artwork.png` for listing/card use. Dimensions: `1080x1920`.
3. `public/static/images/blogs/openclaw-on-aws/blogHeader.png`
   - Wide crop derived from `source-artwork.png` for the `PostBanner` hero. Dimensions: `1260x700`.

## OpenClaw Primary Sources

1. OpenClaw, [Documentation index](https://docs.openclaw.ai/llms.txt), accessed 2026-05-08.
   - Supports the official docs map, install pages, gateway pages, provider pages, security pages, and automation surfaces used in this research.
2. OpenClaw, [Gateway runbook](https://docs.openclaw.ai/gateway/), accessed 2026-05-08.
   - Supports the always-on Gateway model, default port, auth boundary, OpenAI-compatible endpoints, and operational commands.
3. OpenClaw, [Agent runtime](https://docs.openclaw.ai/concepts/agent.md), accessed 2026-05-08.
   - Supports workspace requirements, session storage, skill loading, runtime boundaries, and the single embedded agent process per Gateway.
4. OpenClaw, [Docker](https://docs.openclaw.ai/install/docker.md), accessed 2026-05-08.
   - Supports the containerized gateway option, persistent mounted config/workspace directories, health probes, bind modes, Docker sandboxing, and observability hooks.
5. OpenClaw, [Kubernetes](https://docs.openclaw.ai/install/kubernetes.md), accessed 2026-05-08.
   - Supports the official minimal Kubernetes deployment shape, namespace resources, PVC, Secret, ConfigMap, loopback default, and production caveat.
6. OpenClaw, [Amazon Bedrock](https://docs.openclaw.ai/providers/bedrock.md), accessed 2026-05-08.
   - Supports native Bedrock provider configuration, AWS SDK credential-chain auth, EC2 instance role behavior, model discovery, IAM permissions, guardrails, and Bedrock embeddings for memory search.
7. OpenClaw, [Amazon Bedrock Mantle](https://docs.openclaw.ai/providers/bedrock-mantle.md), accessed 2026-05-08.
   - Supports the OpenAI-compatible Bedrock Mantle provider option and IAM/bearer-token credential behavior.
8. OpenClaw, [Skills](https://docs.openclaw.ai/tools/skills), accessed 2026-05-08.
   - Supports skill loading precedence, ClawHub, plugin-shipped skills, environment injection, and sandbox notes.
9. OpenClaw, [Scheduled tasks](https://docs.openclaw.ai/automation/cron-jobs.md), accessed 2026-05-08.
   - Supports the OpenClaw-native cron/scheduled-job surface.
10. OpenClaw, [Authentication](https://docs.openclaw.ai/gateway/authentication.md), accessed 2026-05-08.
    - Supports provider-auth guidance and the Bedrock `aws-sdk` auth distinction.
11. OpenClaw, [Secrets management](https://docs.openclaw.ai/gateway/secrets.md), accessed 2026-05-08.
    - Supports SecretRef behavior, fail-fast activation, env/file/exec secret providers, and reload semantics.
12. OpenClaw, [Security](https://docs.openclaw.ai/gateway/security/index.md), accessed 2026-05-08.
    - Supports the security hardening posture for exposed gateways.
13. OpenClaw, [Sandboxing](https://docs.openclaw.ai/gateway/sandboxing.md), accessed 2026-05-08.
    - Supports Docker, SSH, and OpenShell sandboxing considerations for untrusted tool execution.
14. OpenClaw, [Health checks](https://docs.openclaw.ai/gateway/health.md), accessed 2026-05-08.
    - Supports `/healthz`, `/readyz`, and authenticated health checks.
15. OpenClaw, [OpenTelemetry export](https://docs.openclaw.ai/gateway/opentelemetry.md), accessed 2026-05-08.
    - Supports OTLP-based observability guidance.
16. OpenClaw, [Prometheus metrics](https://docs.openclaw.ai/gateway/prometheus.md), accessed 2026-05-08.
    - Supports metrics scraping and authenticated metrics-surface guidance.

## AWS Primary Sources

1. AWS, [Host agent or tools with Amazon Bedrock AgentCore Runtime](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html), accessed 2026-05-08.
   - Supports AgentCore Runtime as a managed, framework-agnostic agent hosting option with isolated sessions, long-running workloads, persistent filesystem support, and streaming.
2. AWS, [Use isolated sessions for agents](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-sessions.html), accessed 2026-05-08.
   - Supports AgentCore session isolation, microVM lifecycle, session headers, default idle timeout, and up-to-8-hour lifecycle limits.
3. AWS, [Amazon Bedrock AgentCore FAQs](https://aws.amazon.com/bedrock/agentcore/faqs/), accessed 2026-05-08.
   - Supports AgentCore scaling, framework/protocol/model flexibility, and serverless runtime positioning.
4. AWS, [AgentCore Runtime session storage public preview announcement](https://aws.amazon.com/about-aws/whats-new/2026/03/bedrock-agentcore-runtime-session-storage/), published 2026-03-25.
   - Supports the managed session storage preview note, 1 GB per session storage limit, and 14-day idle retention.
5. AWS, [Amazon ECS launch types and capacity providers](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/capacity-launch-type-comparison.html), accessed 2026-05-08.
   - Supports ECS Fargate, EC2, External, ECS Managed Instances, and capacity-provider tradeoffs.
6. AWS, [Fargate task ephemeral storage for Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-storage.html), accessed 2026-05-08.
   - Supports Fargate ephemeral storage defaults and the 200 GiB upper bound.
7. AWS, [Use Amazon EFS volumes with Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html), accessed 2026-05-08.
   - Supports ECS/EFS persistence, Fargate platform requirement, and access point guidance.
8. AWS, [Use Amazon EBS volumes with Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ebs-volumes.html), accessed 2026-05-08.
   - Supports ECS task-attached EBS volume behavior and the caveat that service-managed task volumes are deleted on task termination.
9. AWS, [Amazon ECS task IAM role](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html), accessed 2026-05-08.
   - Supports ECS task roles for AWS API access from containers.
10. AWS, [Automate cluster infrastructure with EKS Auto Mode](https://docs.aws.amazon.com/eks/latest/userguide/automode.html), accessed 2026-05-08.
    - Supports EKS Auto Mode managed compute, networking, load balancing, DNS, block storage, and GPU support.
11. AWS, [EKS Auto Mode best practices](https://docs.aws.amazon.com/eks/latest/best-practices/automode.html), accessed 2026-05-08.
    - Supports Auto Mode's Karpenter-based scaling, managed NodePools/NodeClasses, and shared responsibility caveats.
12. AWS, [Learn how EKS Pod Identity grants pods access to AWS services](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html), accessed 2026-05-08.
    - Supports Pod Identity, service-account IAM role association, least privilege, credential isolation, and limitations.
13. AWS, [Use elastic file system storage with Amazon EFS](https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html), accessed 2026-05-08.
    - Supports EKS EFS CSI persistent-volume guidance and Fargate limitations.
14. AWS, [AWS App Runner architecture and concepts](https://docs.aws.amazon.com/apprunner/latest/dg/architecture.html), accessed 2026-05-08.
    - Supports App Runner's source-code/source-image service model.
15. AWS, [Managing App Runner automatic scaling](https://docs.aws.amazon.com/apprunner/latest/dg/manage-autoscaling.html), accessed 2026-05-08.
    - Supports App Runner autoscaling knobs and cost behavior.
16. AWS, [Configure Lambda function timeout](https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html), accessed 2026-05-08.
    - Supports Lambda's standard 900-second maximum timeout.
17. AWS, [Configure Lambda ephemeral storage](https://docs.aws.amazon.com/lambda/latest/dg/configuration-ephemeral-storage.html), accessed 2026-05-08.
    - Supports Lambda `/tmp` storage range from 512 MB to 10,240 MB.
18. AWS, [Create a Lambda function using a container image](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html), accessed 2026-05-08.
    - Supports Lambda container-image constraints, read-only filesystem, writable `/tmp`, Linux-only images, and 10 GB image size limit.
19. AWS, [What is AWS Batch?](https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html), accessed 2026-05-08.
    - Supports Batch as a managed service for batch workloads on ECS, EKS, EC2, and Fargate.
20. AWS, [AWS Batch documentation overview](https://aws.amazon.com/documentation-overview/batch/), accessed 2026-05-08.
    - Supports Batch job queues, compute environments, dependencies, and integration with ECS/EKS/Fargate.
21. AWS, [Amazon EventBridge Scheduler](https://docs.aws.amazon.com/eventbridge/latest/userguide/using-eventbridge-scheduler.html), accessed 2026-05-08.
    - Supports managed scheduled invocation, one-time and recurring schedules, retries, flexible windows, and DLQs.
22. AWS, [AWS Systems Manager Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html), accessed 2026-05-08.
    - Supports SSM access without inbound SSH or bastions.
23. AWS, [Start a Session Manager session](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-sessions-start.html), accessed 2026-05-08.
    - Supports Session Manager port forwarding.
24. AWS, [IAM roles for Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html), accessed 2026-05-08.
    - Supports EC2 instance-profile credential flow and least-privilege guidance.
25. AWS, [Amazon ECR private registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html), accessed 2026-05-08.
    - Supports ECR private image storage and authentication.
26. AWS, [AWS CodeBuild documentation](https://aws.amazon.com/documentation-overview/codebuild/), accessed 2026-05-08.
    - Supports CodeBuild-managed image builds and custom build environments.
27. AWS, [Amazon EC2 Mac instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-mac-instances.html), accessed 2026-05-08.
    - Supports the macOS-specific option, hardware families, Dedicated Host billing model, 24-hour minimum allocation, and EBS recommendation.

## AWS Sample And Local Implementation Sources

1. AWS Samples, [sample-multi-tenancy-openclaw-on-eks](https://github.com/aws-samples/sample-multi-tenancy-openclaw-on-eks), published 2026-03-05.
   - Supports the EKS multi-tenant OpenClaw orchestration pattern, including router, orchestrator, Redis, DynamoDB, S3, Karpenter, Kata, Pod Identity, and NetworkPolicy.
2. AWS Samples, [Architecture](https://github.com/aws-samples/sample-multi-tenancy-openclaw-on-eks/blob/main/docs/architecture.md), accessed 2026-05-08.
   - Supports detailed sample architecture, component roles, message flow, pod lifecycle, S3 state sync, warm pool, and isolation decisions.
3. AWS Samples, [Cold Start Time Analysis](https://github.com/aws-samples/sample-multi-tenancy-openclaw-on-eks/blob/main/docs/cold-start-analysis.md), dated 2026-03-03.
   - Supports measured Kata/runc cold and warm start timings and optimization opportunities.
4. Local MorningHQ, `/Users/artreimus/Repositories/morning-hq/morninghq/docs/AWS_DEPLOYMENT_INFRA_AND_OPENCLAW.md`, accessed 2026-05-08.
   - Supports field-tested SaaS runtime-plane architecture: ECS app plane, EKS OpenClaw plane, DynamoDB bindings/pins, S3 live state, internal NLB, and per-user runtime pods.
5. Local MorningHQ, `/Users/artreimus/Repositories/morning-hq/morninghq/docs/OPENCLAW_EC2_DEPLOYMENT_RUNBOOK.md`, accessed 2026-05-08.
   - Supports field-tested manual EC2 lane: SSM, CodeBuild, ECR, Secrets Manager, EBS persistence, swap, and Bedrock through instance roles.
6. Local MorningHQ, `/Users/artreimus/Repositories/morning-hq/morninghq/docs/OPENCLAW_LOCAL_AND_PROD_CONNECTIVITY.md`, accessed 2026-05-08.
   - Supports local-vs-production connectivity, backend-owned gateway token handling, private networking, and OpenAI-compatible gateway relay.
7. Local MorningHQ, `/Users/artreimus/Repositories/morning-hq/morninghq/docs/OPENCLAW_EKS_ONBOARDING_RESEARCH.md`, accessed 2026-05-08.
   - Supports adaptation guidance for the AWS sample, including retaining FastAPI as the trust boundary and using EKS for the runtime plane.
8. Local MorningHQ, `/Users/artreimus/Repositories/morning-hq/morninghq/docs/infra/OPENCLAW_RUNTIME_NETWORK_COST_POSTURE.md`, accessed 2026-05-08.
   - Supports cost posture around VPC endpoints, NAT, internal NLB, ECS/EKS split, and cross-AZ traffic.

## Claim Boundaries

- Treat the AWS sample as a reference implementation, not an endorsed production blueprint.
- Treat local MorningHQ docs as implementation evidence and field notes, not generic OpenClaw upstream documentation.
- Treat Bedrock AgentCore as an adjacent managed AWS agent runtime. It is not documented as a drop-in OpenClaw Gateway host.
- Avoid hard cost numbers unless the blog refreshes live AWS pricing in the final drafting pass.
- Verify current OpenClaw release notes and AWS regional availability before publishing deployment commands.
