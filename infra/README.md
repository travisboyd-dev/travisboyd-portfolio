# Azure Infrastructure as Code

## Project 001 — Portfolio-as-Code

This directory contains the Azure Bicep files used to document and manage the cloud infrastructure supporting [travisboyd.dev](https://travisboyd.dev).

The project uses Azure Static Web Apps, GitHub Actions, and Bicep to demonstrate Infrastructure as Code (IaC) and DevOps practices.

## 1. main.bicep — Existing Infrastructure Reference

The `main.bicep` file references the existing Azure Static Web App using Bicep's `existing` keyword.

It accepts the Static Web App's name as a parameter and outputs its Azure resource ID.

Because the resource is declared as `existing`, this template does not request that Azure create or modify the website.

**Purpose:** Learn how to reference existing infrastructure safely and retrieve resource information.

## 2. proposed.bicep — Declarative Infrastructure Definition

The `proposed.bicep` file describes the desired configuration of the Azure Static Web App.

It includes:

- Azure region: East US 2
- Pricing tier: Free
- Static Web App resource name
- GitHub repository and deployment branch
- GitHub deployment provider
- Pull-request preview environments
- Configuration-file update permissions
- Parameter validation for supported pricing tiers

Unlike `main.bicep`, this template declares a managed Azure resource. If deployed, Azure Resource Manager could create or update the resource to match the configuration.

**Purpose:** Learn to define reusable Azure infrastructure through code instead of relying entirely on manual Azure Portal configuration.

## 3. Why We Haven't Deployed proposed.bicep

The portfolio website is already running in production.

Before deploying the proposed template, we executed Azure What-If to compare the desired infrastructure against the existing resource.

What-If identified three remaining property differences:

- `deploymentAuthPolicy`
- `stableInboundIP`
- `trafficSplitting`

These properties are present in the live Azure resource but are not exposed as configurable properties in the Bicep resource schema we are using.

Although these differences could be What-If reporting noise, we have not confirmed that applying the template would preserve all existing behavior.

Deploying directly to production could introduce unnecessary risk to the website, GitHub integration, or deployment configuration.

**Decision:** Keep `proposed.bicep` as an undeployed draft until we can validate the configuration safely.

## 4. Next Steps

1. Create a separate Azure development environment.
2. Parameterize environment-specific settings.
3. Validate the Bicep template locally.
4. Run Azure What-If against the development environment.
5. Deploy and test the development resource after reviewing the expected changes.
6. Document the results and consider a safe approach for managing production infrastructure.

## 5. Engineering Lessons Learned

Infrastructure as Code enables repeatable, version-controlled cloud configurations.

However, successfully compiling a Bicep template does not guarantee that deployment is safe.

Cloud engineers should inspect existing infrastructure, validate proposed configurations, review deployment changes, and protect production resources.

**Current status:** Production Static Web App is operational. The proposed infrastructure definition has been compiled and evaluated with What-If but has not been deployed.
