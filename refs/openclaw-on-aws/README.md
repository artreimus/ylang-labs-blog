# OpenClaw On AWS Source Log

This reference packet supports the Ylang Labs blog post `data/blogs/openclaw-on-aws.mdx` about using OpenClaw on AWS.

Access date for web sources: 2026-05-08.

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

1. AWS, [Introducing OpenClaw on Amazon Lightsail to run your autonomous private AI agents](https://aws.amazon.com/blogs/aws/introducing-openclaw-on-amazon-lightsail-to-run-your-autonomous-private-ai-agents/), accessed 2026-05-08.
   - Supports the official Lightsail blueprint, Bedrock default-provider framing, and one-instance starter path.
2. AWS, [Get started with OpenClaw on Lightsail](https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-quick-start-guide-openclaw.html), accessed 2026-05-08.
   - Supports the Lightsail setup flow, 4 GB memory recommendation, browser pairing, CloudShell setup, and messaging-channel guidance.
3. AWS, [Amazon ECS launch types and capacity providers](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/capacity-launch-type-comparison.html), accessed 2026-05-08.
   - Supports ECS Fargate, EC2, External, ECS Managed Instances, and capacity-provider tradeoffs.
4. AWS, [Fargate task ephemeral storage for Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-storage.html), accessed 2026-05-08.
   - Supports Fargate ephemeral storage defaults and the 200 GiB upper bound.
5. AWS, [Use Amazon EFS volumes with Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html), accessed 2026-05-08.
   - Supports ECS/EFS persistence, Fargate platform requirement, and access point guidance.
6. AWS, [Use Amazon EBS volumes with Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ebs-volumes.html), accessed 2026-05-08.
   - Supports ECS task-attached EBS volume behavior and the caveat that service-managed task volumes are deleted on task termination.
7. AWS, [Amazon ECS task IAM role](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html), accessed 2026-05-08.
   - Supports ECS task roles for AWS API access from containers.
8. AWS, [Learn how EKS Pod Identity grants pods access to AWS services](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html), accessed 2026-05-08.
   - Supports Pod Identity, service-account IAM role association, least privilege, credential isolation, and limitations.
9. AWS, [Use elastic file system storage with Amazon EFS](https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html), accessed 2026-05-08.
   - Supports EKS EFS CSI persistent-volume guidance and Fargate limitations.
10. AWS, [AWS Systems Manager Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html), accessed 2026-05-08.
    - Supports SSM access without inbound SSH or bastions.
11. AWS, [Start a Session Manager session](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-sessions-start.html), accessed 2026-05-08.
    - Supports Session Manager port forwarding.
12. AWS, [IAM roles for Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html), accessed 2026-05-08.
    - Supports EC2 instance-profile credential flow and least-privilege guidance.
13. AWS, [Amazon ECR private registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html), accessed 2026-05-08.
    - Supports ECR private image storage and authentication.
14. AWS, [AWS CodeBuild documentation](https://aws.amazon.com/documentation-overview/codebuild/), accessed 2026-05-08.
    - Supports CodeBuild-managed image builds and custom build environments.

## AWS Sample Sources

1. AWS Samples, [sample-multi-tenancy-openclaw-on-eks](https://github.com/aws-samples/sample-multi-tenancy-openclaw-on-eks), published 2026-03-05.
   - Supports the EKS multi-tenant OpenClaw orchestration pattern, including router, orchestrator, Redis, DynamoDB, S3, Karpenter, Kata, Pod Identity, and NetworkPolicy.
2. AWS Samples, [Architecture](https://github.com/aws-samples/sample-multi-tenancy-openclaw-on-eks/blob/main/docs/architecture.md), accessed 2026-05-08.
   - Supports detailed sample architecture, component roles, message flow, pod lifecycle, S3 state sync, warm pool, and isolation decisions.
3. AWS Samples, [Cold Start Time Analysis](https://github.com/aws-samples/sample-multi-tenancy-openclaw-on-eks/blob/main/docs/cold-start-analysis.md), dated 2026-03-03.
   - Supports measured Kata/runc cold and warm start timings and optimization opportunities.

## Claim Boundaries

- Treat the AWS sample as a reference implementation, not an endorsed production blueprint.
- Avoid hard cost numbers unless the blog refreshes live AWS pricing in the final drafting pass.
- Verify current OpenClaw release notes and AWS regional availability before publishing deployment commands.
