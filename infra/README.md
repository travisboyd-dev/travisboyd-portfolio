# Azure Infrastructure as Code

## Project 001 — Portfolio-as-Code

This directory contains the Azure Bicep infrastructure definitions
supporting the Travis Boyd developer portfolio.

Production: https://travisboyd.dev

Development: https://thankful-coast-024faad0f.4.azurestaticapps.net

## Infrastructure Overview

The project uses separate Azure resource groups and Static Web Apps
for production and development.

| Environment | Resource Group              | Static Web App               |
| ----------- | --------------------------- | ---------------------------- |
| Production  | rg-travisboyd-portfolio     | swa-travisboyd-portfolio     |
| Development | rg-travisboyd-portfolio-dev | swa-travisboyd-portfolio-dev |

Both environments use the Azure Static Web Apps Free tier
in East US 2.

## Bicep Files

### main.bicep — Existing Production Resource

References the existing production Azure Static Web App
using Bicep's `existing` keyword.

The template outputs the Azure resource ID without requesting
creation or modification of the resource.

Purpose: Demonstrate how to reference existing Azure infrastructure.

### proposed.bicep — Production Infrastructure Draft

Defines a proposed configuration for the production Static Web App.

Includes:

- Azure region parameter
- Pricing tier parameter with allowed values
- Static Web App name
- GitHub repository and deployment branch
- GitHub deployment provider
- Configuration update settings
- Pull-request preview environment policy

IMPORTANT: This template has not been deployed.

Azure What-If identified potential differences involving:

- deploymentAuthPolicy
- stableInboundIP
- trafficSplitting

These may include service-managed properties or What-If reporting noise.
Their effect has not been fully established.

Do not deploy proposed.bicep against production without
additional review and explicit approval.

### dev.bicep — Development Infrastructure

Defines the development Azure Static Web App.

Configuration:

- Resource name: swa-travisboyd-portfolio-dev
- Region: East US 2
- SKU: Free
- Repository integration: Not configured in the Azure resource

The template was compiled, reviewed using Azure What-If,
and successfully deployed to the development resource group.

Azure What-If predicted one resource to create.
Azure Resource Manager reported a successful deployment.

## Development Deployment Process

The development infrastructure was provisioned through Bicep.

The Astro application was initially deployed manually
using Azure Static Web Apps CLI.

The deployment process was then automated using GitHub Actions.

Development workflow:

.github/workflows/azure-static-web-apps-dev.yml

The workflow runs on pushes to the develop branch.

Pipeline steps:

1. Check out repository source code
2. Configure Node.js 24
3. Install dependencies with npm ci
4. Validate Astro and TypeScript
5. Build the Astro website
6. Run static website tests
7. Deploy the validated dist directory to Azure Development

The automated deployment completed successfully and the
development website was verified in a browser.

## Production and Development Separation

Production branch: main

Development integration branch: develop

Infrastructure feature branch: feat/bicep-infrastructure

Production deployment uses the existing GitHub Actions workflow.

Development deployment uses a separate workflow and Azure
deployment token stored in GitHub Actions Secrets.

Development deployment secret name:

AZURE_STATIC_WEB_APPS_API_TOKEN_DEV

No deployment tokens or credentials should be committed
to source control.

## Infrastructure Validation

Bicep templates are validated locally before deployment.

Azure What-If is used to inspect predicted resource changes.

Infrastructure deployments should be reviewed before execution.

A successful Bicep compilation confirms template validity,
but does not guarantee deployment safety.

Generated ARM JSON files are excluded from Git using .gitignore.

## Engineering Lessons Learned

- Infrastructure as Code provides repeatable resource definitions.
- Bicep compiles into Azure Resource Manager templates.
- What-If helps identify unintended infrastructure changes.
- Production and development should be managed separately.
- CI/CD automates application validation and deployment.
- Deployment credentials should be protected.
- Infrastructure and application deployments are distinct operations.
- Production changes require additional review and safeguards.

## Current Status

- Production website: Operational
- Development infrastructure: Provisioned using Bicep
- Development website: Deployed successfully
- Development CI/CD: Automated and verified
- Production Bicep draft: Reviewed but not deployed
- Infrastructure Pull Request #2: Open, targeting develop

## Planned Improvements

- Merge infrastructure Pull Request #2 after review
- Add Bicep validation to GitHub Actions
- Configure additional branch protections
- Document infrastructure lifecycle and cleanup procedures
- Add monitoring and recovery procedures
- Introduce Terraform using a separate practice environment
