// Determines the Azure region
param deploymentLocation string = 'eastus2'

// Restricts the pricing tier to supported values.
@allowed([
  'Free' 
  'Standard'
])
param skuName string = 'Free'

// Defines the name of our existing Azure Static Web App.
param staticWebAppName string = 'swa-travisboyd-portfolio'
// Defines the name of the deployment branch
param deploymentBranch string = 'main'

// Defines the desired configuration of our Azure Static Web App.
resource portfolioSite 'Microsoft.Web/staticSites@2025-03-01' = {
  name: staticWebAppName
  location: deploymentLocation
  //Defines the pricing tier
  sku: {
    name: skuName
    tier: skuName
  }
  // Defines the GitHub repository and branch used for deployments.
  properties: {
    //Source provider recorded for the latest production deployment
    provider: 'GitHub'
    //Permit configuration-file updates
    allowConfigFileUpdates: true
    // Allows Azure to create temporary preview environments for pull requests.
    stagingEnvironmentPolicy: 'Enabled'
    branch: deploymentBranch
    repositoryUrl: 'https://github.com/travisboyd-dev/travisboyd-portfolio'
  }
}



