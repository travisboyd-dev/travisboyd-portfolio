// Defines the name of our existing Azure Static Web App.
param staticWebAppName string = 'swa-travisboyd-portfolio'

// References the existing Static Web App without creating or updating it.
resource portfolioSite 'Microsoft.Web/staticSites@2025-03-01' existing = {
  name: staticWebAppName
}

// Returns the unique Azure resource ID of our Static Web App.
output staticWebAppId string = portfolioSite.id
