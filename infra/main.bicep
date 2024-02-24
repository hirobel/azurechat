targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param name string

@minLength(1)
@description('Primary location for all resources')
param location string

// azure open ai -- only regions supporting gpt-35-turbo v1106
@description('Location for the OpenAI resource group')
@allowed(['australiaeast', 'canadaeast', 'francecentral', 'southindia', 'uksouth', 'swedencentral', 'westus'])
@metadata({
  azd: {
    type: 'location'
  }
})

param formRecognizerSkuName string = 'australiaeast'
param searchServiceIndexName string = 'azure-chat'
param searchServiceSkuName string = 'standard'
param storageServiceSku object = { name: 'Standard_LRS' }
param storageServiceImageContainerName string = 'images'

param resourceGroupName string = ''

var resourceToken = toLower(uniqueString(subscription().id, name, location))
var tags = { 'azd-env-name': name }

// Organize resources in a resource group
resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: !empty(resourceGroupName) ? resourceGroupName : 'rg-${name}'
  location: location
  tags: tags
}

module resources 'resources.bicep' = {
  name: 'all-resources'
  scope: rg
  params: {
    name: name
    resourceToken: resourceToken
    tags: tags
    searchServiceIndexName: searchServiceIndexName
    formRecognizerSkuName: formRecognizerSkuName
    searchServiceSkuName: searchServiceSkuName
    storageServiceSku: storageServiceSku
    storageServiceImageContainerName: storageServiceImageContainerName
    location: location
  }
}

output APP_URL string = resources.outputs.url
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
