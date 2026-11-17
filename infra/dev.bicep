//Define the name of the development Static Web App
param staticWebAppName string = 'swa-travisboyd-portfolio-dev'

//Specifies the Azuer region where the application will be deployed
param location string = 'eastus2'


// Defines a new development Azure Static Web App.
resource devSite 'Microsoft.Web/staticSites@2025-03-01' = {
  // Uses the application name defined in our parameter.
  name: staticWebAppName

  // Uses the Azure region defined in our parameter.
  location: location

  // Configures the application's pricing tier.
  sku: {
    name: 'Free'
    tier: 'Free'
  }

  // No repository or additional properties are configured yet.
  properties: {}
}
