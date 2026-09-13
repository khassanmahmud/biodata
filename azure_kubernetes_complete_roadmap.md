# Azure + Kubernetes Cloud-Native Learning Roadmap

## Goal

Turn the existing `about-me` Next.js application into a production-style cloud-native application on Azure, while learning the core Azure, Docker, CI/CD, security, observability, and Kubernetes concepts along the way.

---

# Current State

The current deployment is:

```text
GitHub
   ↓
GitHub Actions
   ↓
Docker Build
   ↓
Azure Container Registry (ACR)
   ↓
Azure App Service
   ↓
Next.js
```

The Docker image is built on GitHub Actions (`ubuntu-latest` / AMD64), pushed to ACR, and deployed to Azure App Service.

---

# Target Architecture

Eventually, the application should evolve toward:

```text
                         GitHub
                            │
                            ▼
                     GitHub Actions
                            │
                       Docker Build
                            │
                            ▼
                           ACR
                            │
                            ▼
                     Azure / AKS
                            │
                    ┌───────┴────────┐
                    ▼                ▼
                 Next.js          Express API
                  Pods               Pods
                                      │
                         ┌────────────┼─────────────┐
                         ▼            ▼             ▼
                    PostgreSQL   Blob Storage    Key Vault
                                                    ▲
                                                    │
                                           Managed Identity
                                                    │
                                                    ▼
                                             Entra ID / RBAC

                    Application Insights
                            ▲
                            │
                       Application
```

The roadmap deliberately builds this architecture incrementally.

---

# Phase 1 — Existing Docker + ACR + App Service

## Objective

Understand and stabilize the current deployment.

## Architecture

```text
GitHub
   ↓
GitHub Actions
   ↓
Docker image
   ↓
ACR
   ↓
App Service
   ↓
Next.js
```

## Learn

- Azure Subscription
- Resource Group
- App Service
- App Service Plan
- Docker
- Docker Image
- Container
- Azure Container Registry
- Image tags
- Image digest
- `WEBSITES_PORT`
- GitHub Actions
- GitHub Actions OIDC
- Microsoft Entra ID
- Service Principal
- Federated Credential
- RBAC

## Tasks

- [x] Build Next.js Docker image
- [x] Configure `output: 'standalone'`
- [x] Build container with GitHub Actions
- [x] Push image to ACR
- [x] Deploy image to App Service
- [x] Configure App Service for port `3000`
- [x] Resolve ARM64/AMD64 architecture issue
- [x] Configure GitHub Actions OIDC
- [x] Configure Azure role assignment
- [x] Verify application is accessible

## Important lesson

Do not rely on a local ARM64 Mac build when the production environment is AMD64. Build the production image on an AMD64 CI runner.

---

# Phase 2 — Add Express.js API

## Objective

Separate frontend responsibilities from backend/API responsibilities.

Initially, keep the deployment simple. The API can run alongside the Next.js application while learning the application architecture.

## Target

```text
Browser
   ↓
Next.js
   ↓
Express API
```

## Suggested project structure

```text
about-me/
├── app/
│   └── ...
├── server/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   └── services/
├── public/
├── package.json
├── Dockerfile
└── next.config.js
```

## Suggested API

```text
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id

GET    /api/experience
GET    /api/skills

POST   /api/contact
```

## Learn

- Express routing
- Controllers
- Services
- Middleware
- Error handling
- Environment variables
- REST API design
- API health checks
- CORS
- Logging

## Deliverable

A working Express API that can serve portfolio data.

---

# Phase 3 — Add Azure PostgreSQL

## Objective

Move application data from static files/in-memory storage into a managed database.

## Architecture

```text
Next.js
   ↓
Express API
   ↓
Azure Database for PostgreSQL
```

## Suggested database

Use Azure Database for PostgreSQL Flexible Server.

## Suggested tables

```text
projects
---------
id
title
description
url
image_url
created_at
updated_at

experience
----------
id
company
role
description
start_date
end_date

skills
------
id
name
category

contact_messages
----------------
id
name
email
message
created_at
```

## Learn

- PostgreSQL
- Connection strings
- Database users
- Migrations
- Indexes
- Transactions
- Connection pooling
- SQL
- Managed database services

## Deliverable

Implement Projects CRUD:

```text
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

---

# Phase 4 — Add Azure Blob Storage

## Objective

Store images and files outside the application container.

## Architecture

```text
Express API
    ↓
Azure Blob Storage
```

## Suggested containers

```text
profile/
projects/
documents/
```

## Learn

- Storage Account
- Blob Storage
- Containers
- Blob objects
- SAS URLs
- Private vs public blobs
- Upload/download
- Object metadata
- Storage security

## Suggested feature

Add project image upload:

```text
POST /api/projects/:id/image
```

The API uploads the image to Blob Storage and stores the resulting reference in PostgreSQL.

## Important principle

Do not store user-uploaded files inside the Docker container. Containers should be treated as disposable.

---

# Phase 5 — Azure Key Vault

## Objective

Stop storing application secrets directly in source code, Docker images, or GitHub.

## Secrets to protect

Examples:

```text
DATABASE_URL
DATABASE_PASSWORD
API_KEYS
JWT_SECRET
```

## Architecture

```text
              Key Vault
                  │
             secrets
                  │
                  ▼
             Application
```

## Learn

- Azure Key Vault
- Secrets
- Certificates
- Keys
- Secret versions
- Access control
- RBAC

## Do not

```text
.env
GitHub repository
Dockerfile
Docker image
source code
```

contain production secrets.

---

# Phase 6 — Managed Identity

## Objective

Use Azure identities instead of hard-coded Azure credentials.

## Architecture

```text
App Service
    │
    │ Managed Identity
    ▼
Microsoft Entra ID
    │
    ▼
Azure RBAC
    │
    ├── Key Vault
    └── Blob Storage
```

## Tasks

1. Enable System-assigned Managed Identity on App Service.
2. Find the identity's principal.
3. Grant appropriate roles.
4. Change the application to use Azure Identity.
5. Remove unnecessary credentials.

## Useful roles

Examples:

```text
Key Vault Secrets User
Storage Blob Data Contributor
AcrPull
```

Only grant the minimum permissions required.

## Important distinction

There may be multiple identities in this architecture:

```text
GitHub Actions identity
    ↓
deploys to Azure

App Service Managed Identity
    ↓
accesses Azure resources at runtime
```

Do not confuse these two.

---

# Phase 7 — Improve ACR Authentication

## Current approach

The deployment may use ACR admin credentials:

```text
GitHub Actions
    ↓
ACR username/password
    ↓
ACR
```

## Target approach

Use OIDC and Azure RBAC:

```text
GitHub Actions
      ↓
     OIDC
      ↓
Microsoft Entra ID
      ↓
    AcrPush
      ↓
     ACR
```

For runtime image pulling:

```text
App Service Managed Identity
      ↓
    AcrPull
      ↓
     ACR
```

## Learn

- OIDC
- Federated credentials
- Azure RBAC
- AcrPush
- AcrPull
- Managed Identity

## Goal

Eliminate long-lived credentials wherever practical.

---

# Phase 8 — Application Insights + Azure Monitor

## Objective

Understand what is happening inside the application in production.

## Architecture

```text
                    Application Insights
                           ▲
                           │
                           │ telemetry
                           │
Browser → Next.js → Express
                    │
             ┌──────┼────────┐
             ▼      ▼        ▼
         PostgreSQL Blob   Key Vault
```

## Monitor

- HTTP requests
- Response times
- Exceptions
- Failed requests
- Dependencies
- Availability
- Application performance
- Container/application logs

## Learn

- Azure Monitor
- Application Insights
- Log Analytics
- Metrics
- Logs
- Alerts
- KQL (Kusto Query Language)

## Create alerts

Example:

```text
IF
HTTP 5xx errors > 5
within 5 minutes

THEN
send alert
```

## Deliverable

Be able to answer:

> Why is my production application failing?

without relying on users to report the problem.

---

# Phase 9 — Separate Next.js and Express

## Objective

Move from a combined application container to independently deployable services.

## Architecture

```text
Azure
│
├── Next.js App Service
│
└── Express API App Service
        │
        ├── PostgreSQL
        ├── Blob Storage
        └── Key Vault
```

## Learn

- Service boundaries
- API communication
- Environment configuration
- Independent deployments
- Scaling services independently
- Health checks
- Service-to-service authentication

## Why do this?

This prepares the application for Kubernetes.

---

# Phase 10 — Learn Kubernetes Locally

## Objective

Learn Kubernetes fundamentals before introducing AKS.

Use a local Kubernetes environment such as:

- Docker Desktop Kubernetes
- kind
- Minikube

## Core concepts

Learn these first:

```text
Cluster
 └── Node
      └── Pod
           └── Container
```

Then:

```text
Deployment
Service
ConfigMap
Secret
Namespace
Ingress
```

## First Kubernetes deployment

Use your existing container image.

Example:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: about-me
spec:
  replicas: 2
  selector:
    matchLabels:
      app: about-me
  template:
    metadata:
      labels:
        app: about-me
    spec:
      containers:
        - name: about-me
          image: about-me:latest
          ports:
            - containerPort: 3000
```

## Commands to learn

```bash
kubectl get pods
kubectl get deployments
kubectl get services

kubectl describe pod <pod>
kubectl logs <pod>
kubectl exec -it <pod> -- sh

kubectl apply -f deployment.yaml
kubectl delete -f deployment.yaml
```

---

# Phase 11 — Kubernetes Networking

## Objective

Understand how traffic reaches Pods.

## Architecture

```text
Internet
   │
   ▼
Service
   │
   ▼
Deployment
   │
   ├── Pod
   ├── Pod
   └── Pod
```

## Learn

- ClusterIP
- NodePort
- LoadBalancer
- Service discovery
- DNS
- Ingress
- Ports
- Target ports

## Example

```yaml
apiVersion: v1
kind: Service
metadata:
  name: about-me
spec:
  selector:
    app: about-me
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
```

---

# Phase 12 — Kubernetes Configuration and Secrets

## Learn

### ConfigMap

For non-sensitive configuration:

```text
NODE_ENV=production
API_URL=...
```

### Secret

For sensitive information:

```text
DATABASE_PASSWORD
JWT_SECRET
```

Architecture:

```text
ConfigMap ─────┐
               ▼
             Pod
               ▲
               │
Secret ────────┘
```

Understand the difference between configuration and secrets.

---

# Phase 13 — Kubernetes Health Checks

## Objective

Make Kubernetes understand application health.

Learn:

- Liveness probe
- Readiness probe
- Startup probe

Example:

```yaml
livenessProbe:
  httpGet:
    path: /
    port: 3000

readinessProbe:
  httpGet:
    path: /
    port: 3000
```

Understand:

```text
Liveness
= Is the application alive?

Readiness
= Can the application receive traffic?

Startup
= Has the application finished starting?
```

---

# Phase 14 — Kubernetes Scaling

## Objective

Learn how Kubernetes handles changing traffic.

Start with:

```yaml
replicas: 1
```

Then:

```yaml
replicas: 3
```

Observe:

```text
              Service
             /   |   \
            ▼    ▼    ▼
          Pod   Pod   Pod
```

Learn:

```bash
kubectl scale deployment about-me --replicas=5
```

Then learn:

- Resource requests
- Resource limits
- Horizontal Pod Autoscaler (HPA)
- CPU/memory metrics

---

# Phase 15 — Kubernetes Rolling Deployments

## Objective

Deploy new versions without taking the application offline.

Example:

```text
about-me:v1
```

Deploy:

```text
about-me:v2
```

Kubernetes gradually changes:

```text
v1 v1 v1
 ↓
v2 v1 v1
 ↓
v2 v2 v1
 ↓
v2 v2 v2
```

Learn:

```bash
kubectl rollout status deployment/about-me
kubectl rollout history deployment/about-me
kubectl rollout undo deployment/about-me
```

Understand:

- RollingUpdate
- Rollback
- Revision
- Availability during deployment

---

# Phase 16 — Azure Kubernetes Service (AKS)

## Objective

Move the Kubernetes application to Azure.

## Architecture

```text
GitHub
   ↓
GitHub Actions
   ↓
Docker Build
   ↓
ACR
   ↓
AKS
   ↓
Kubernetes
```

## AKS structure

```text
AKS Cluster
│
├── Node
│    ├── Pod
│    └── Pod
│
└── Node
     ├── Pod
     └── Pod
```

## Learn

- AKS cluster
- Node pools
- Kubernetes nodes
- Kubernetes control plane
- Azure networking
- Identity
- ACR integration
- Scaling
- Monitoring

---

# Phase 17 — AKS + ACR

## Objective

Allow AKS to pull your private images from ACR.

Target:

```text
AKS
 │
 │ AcrPull
 ▼
ACR
```

Learn:

- Managed Identity
- ACR integration
- `imagePullSecrets`
- RBAC
- Workload Identity

Prefer Azure identity-based access over manually managing registry passwords.

---

# Phase 18 — Kubernetes Ingress

## Objective

Create a real HTTP entry point.

Target:

```text
Internet
   │
   ▼
Ingress
   │
   ├──────────────┐
   ▼              ▼
Next.js         Express
Service         Service
```

Learn:

- Ingress
- Host-based routing
- Path-based routing
- TLS
- Certificates
- DNS

Example:

```text
example.com
    ↓
Next.js

example.com/api
    ↓
Express
```

---

# Phase 19 — Helm

## Objective

Package and manage Kubernetes applications.

Instead of manually managing many YAML files:

```text
deployment.yaml
service.yaml
configmap.yaml
secret.yaml
ingress.yaml
```

create a Helm chart:

```text
about-me-chart/
├── Chart.yaml
├── values.yaml
└── templates/
    ├── deployment.yaml
    ├── service.yaml
    ├── ingress.yaml
    └── configmap.yaml
```

Learn:

- Helm chart
- `values.yaml`
- Templates
- Releases
- Upgrades
- Rollbacks

Do not start with Helm before understanding basic Kubernetes YAML.

---

# Phase 20 — Kubernetes + Azure Secrets

Eventually move away from manually managed Kubernetes secrets.

Target architecture:

```text
AKS
 │
 │ Workload Identity
 ▼
Microsoft Entra ID
 │
 ▼
Key Vault
 │
 ├── Database credentials
 ├── API keys
 └── Application secrets
```

Learn:

- Microsoft Entra Workload Identity
- Azure Key Vault
- Secrets Store CSI Driver
- RBAC

---

# Phase 21 — Production CI/CD

## Objective

Turn the deployment pipeline into a production-style pipeline.

Target:

```text
Git Push
   ↓
Tests
   ↓
Lint
   ↓
Build
   ↓
Docker Build
   ↓
Security Scan
   ↓
Push to ACR
   ↓
Deploy Staging
   ↓
Health Check
   ↓
Approval
   ↓
Production
```

## Learn

- CI
- CD
- Environments
- Deployment approvals
- GitHub Actions environments
- Image tagging
- Immutable image digests
- Rollbacks
- Deployment strategies

---

# Phase 22 — Dev / Staging / Production

## Objective

Stop treating production as the only environment.

Possible structure:

```text
GitHub
 │
 ├── develop ─────→ Dev
 │
 ├── main ────────→ Staging
 │
 └── release ─────→ Production
```

Or:

```text
AKS
├── dev namespace
├── staging namespace
└── production namespace
```

Learn:

- Environment separation
- Namespace isolation
- Configuration per environment
- Secrets per environment
- Approval workflows
- Production deployment controls

---

# Phase 23 — Infrastructure as Code

## Objective

Stop creating Azure infrastructure manually.

Recommended Azure-first tool:

**Bicep**

Example:

```text
main.bicep
│
├── Resource Group
├── ACR
├── App Service
├── Key Vault
├── PostgreSQL
├── Storage Account
├── Application Insights
└── AKS
```

Learn:

- Declarative infrastructure
- Bicep
- Parameters
- Variables
- Modules
- Outputs
- Resource dependencies
- Deployment scopes

Later, optionally learn Terraform.

---

# Phase 24 — Production Networking

Once the fundamentals are comfortable, introduce:

```text
Azure VNet
│
├── Subnet
│
├── Private Endpoint
│
├── NSG
│
└── NAT Gateway
```

Then consider:

```text
Azure Front Door
        ↓
Application Gateway / Ingress
        ↓
AKS
```

Learn:

- Public vs private networking
- Private endpoints
- NSGs
- DNS
- Load balancing
- TLS termination
- Network isolation

---

# Phase 25 — Advanced Observability

Expand monitoring to:

```text
Application
    ↓
Application Insights
    ↓
Azure Monitor
    ↓
Log Analytics
    ↓
KQL
```

For Kubernetes, monitor:

- Pods
- Nodes
- Deployments
- CPU
- Memory
- Restarts
- HTTP errors
- Latency
- Application exceptions

Learn to investigate incidents using logs and metrics rather than guessing.

---

# Final Architecture

The final learning project can look like:

```text
                              Internet
                                  │
                                  ▼
                           Azure Front Door
                                  │
                                  ▼
                               Ingress
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
                 Next.js                    Express API
                  Pods                         Pods
              ┌────┴────┐                 ┌────┴────┐
              ▼         ▼                 ▼         ▼
             Pod       Pod               Pod       Pod
                                               │
                              ┌────────────────┼────────────────┐
                              ▼                ▼                ▼
                         PostgreSQL      Blob Storage       Key Vault
                                                               ▲
                                                               │
                                                        Workload Identity
                                                               │
                                                               ▼
                                                         Entra ID / RBAC

                              Application Insights
                                      ▲
                                      │
                               Application telemetry

GitHub
   │
   ▼
GitHub Actions
   │
   ├── Test
   ├── Lint
   ├── Build
   ├── Docker Build
   ├── Security Scan
   ├── Push
   ▼
  ACR
   │
   ▼
  AKS
```

---

# Recommended Learning Order

Do not attempt the entire architecture at once.

Follow this order:

```text
1.  App Service + Docker + ACR              [DONE]
2.  Express API
3.  PostgreSQL
4.  Blob Storage
5.  Key Vault
6.  Managed Identity
7.  ACR identity-based authentication
8.  Application Insights
9.  Separate Next.js / Express
10. Kubernetes locally
11. Pods
12. Deployments
13. Services
14. ConfigMaps / Secrets
15. Health probes
16. Scaling
17. Rolling deployments
18. Ingress
19. Helm
20. AKS
21. AKS + ACR
22. Workload Identity + Key Vault
23. Production CI/CD
24. Dev / Staging / Production
25. Bicep
26. Production networking
27. Advanced monitoring
```

---

# Key Concepts to Master

## Azure

Prioritize:

```text
Subscription
Resource Group
Region
Entra ID
Service Principal
Managed Identity
RBAC
VNet
Subnet
App Service
ACR
Key Vault
Storage Account
PostgreSQL
Azure Monitor
Application Insights
Bicep
AKS
```

## Docker

Prioritize:

```text
Image
Container
Dockerfile
Multi-stage build
Registry
Tag
Digest
Port
Environment variables
Container networking
```

## Kubernetes

Prioritize:

```text
Cluster
Node
Pod
Deployment
Replica
Service
ConfigMap
Secret
Namespace
Ingress
Volume
Probe
Resource request
Resource limit
HPA
Rolling update
Rollback
Helm
```

## CI/CD

Prioritize:

```text
GitHub Actions
CI
CD
OIDC
Federated credentials
Artifact
Docker build
Image tag
Image digest
Deployment
Rollback
Environment
Approval
```

---

# Project Milestones

## Milestone 1 — Azure Container Deployment

```text
GitHub → Actions → Docker → ACR → App Service
```

Status: **Completed**

## Milestone 2 — Backend

```text
Next.js → Express
```

## Milestone 3 — Data

```text
Express → PostgreSQL
```

## Milestone 4 — Files

```text
Express → Blob Storage
```

## Milestone 5 — Security

```text
App Service → Managed Identity → Key Vault
```

## Milestone 6 — Observability

```text
Application → Application Insights → Azure Monitor
```

## Milestone 7 — Kubernetes Fundamentals

```text
Docker → Kubernetes locally
```

## Milestone 8 — Kubernetes Production

```text
Docker → ACR → AKS
```

## Milestone 9 — Production Platform

```text
GitHub
 ↓
CI/CD
 ↓
ACR
 ↓
AKS
 ↓
Ingress
 ↓
Next.js + Express
 ↓
PostgreSQL + Blob + Key Vault
 ↓
Application Insights
```

## Milestone 10 — Infrastructure as Code

```text
Bicep
 ↓
Entire Azure environment
```

---

# Definition of Done

By the end of this roadmap, you should be able to:

- Build production Docker images
- Explain ARM64 vs AMD64
- Push images to ACR
- Deploy containers to App Service
- Build REST APIs with Express
- Connect an API to PostgreSQL
- Store files in Blob Storage
- Protect secrets with Key Vault
- Use Managed Identity
- Understand Azure RBAC
- Configure GitHub Actions OIDC
- Monitor applications with Application Insights
- Write and understand Kubernetes YAML
- Deploy Pods and Deployments
- Expose applications with Services
- Configure Ingress
- Scale Kubernetes workloads
- Perform rolling deployments and rollbacks
- Package applications with Helm
- Deploy workloads to AKS
- Connect AKS to ACR
- Use Workload Identity with Azure services
- Build CI/CD pipelines
- Separate dev/staging/production
- Provision Azure infrastructure using Bicep
- Troubleshoot production workloads using logs, metrics, and telemetry

---

# Suggested Next Step

The next practical exercise should be:

```text
Current:

GitHub
   ↓
GitHub Actions
   ↓
Docker
   ↓
ACR
   ↓
App Service
   ↓
Next.js


Next:

GitHub
   ↓
GitHub Actions
   ↓
Docker
   ↓
ACR
   ↓
App Service
   ↓
Next.js
   │
   ▼
Express API
   │
   ▼
PostgreSQL
```

Start with **Express API + PostgreSQL** before moving to Key Vault and Kubernetes. This creates a real application that you can later migrate to Kubernetes rather than learning Kubernetes with a toy container.
