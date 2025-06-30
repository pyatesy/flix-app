# Feature Flag Generator

The Feature Flag Generator allows you to automatically create Optimizely feature flags in your own account using the current app configuration as a template. This eliminates the manual work of setting up feature flags and ensures consistency across projects.

## Overview

The Feature Flag Generator uses the [Optimizely Feature Experimentation REST API](https://docs.developers.optimizely.com/feature-experimentation/reference/feature-experimentation-api-overview) to programmatically create feature flags, variable definitions, and rulesets in your Optimizely project.

## Features

- **Automated Flag Creation**: Creates feature flags with proper naming and descriptions
- **Variable Definitions**: Automatically sets up variables with default values from your current app configuration
- **Ruleset Configuration**: Creates basic "serve to everyone" rules for immediate testing
- **Progress Tracking**: Real-time progress indicators for each generation step
- **Error Handling**: Comprehensive error reporting and rollback information
- **Rate Limit Compliance**: Respects Optimizely's API rate limits (2 requests/second, 120 requests/minute)

## Supported Feature Flags

The generator can create the following feature flags based on your current app configuration:

### 1. `theme_customization`
**Purpose**: Controls theme colors, assets, and movie data
**Variables**:
- `themeData` (string): JSON configuration for theme colors and assets
- `movieData` (string): JSON configuration for movie data override

**Default Values**: Uses your current `themeConfig.ts` and `completeMovieData.json`

### 2. `subscription_tiers`
**Purpose**: Controls subscription plan pricing and features
**Variables**:
- `PricingData` (json): Subscription plans and FAQ configuration
- `pricingMultiplier` (number): Multiplier for pricing calculations

**Default Values**: Pre-configured Basic and Premium plans

### 3. `offer_banner`
**Purpose**: Controls promotional banner display and configuration
**Variables**:
- `bannerConfig` (json): Banner styling and positioning configuration

**Default Values**: Sample banner with orange background and "Get Started" CTA

### 4. `dragon_recommendation_2`
**Purpose**: Controls dragon recommendation feature display
**Variables**: None (simple on/off flag)

### 5. `not_available`
**Purpose**: Controls region availability overlay
**Variables**: None (simple on/off flag)

## How to Use

### Prerequisites

1. **Optimizely Account**: You need an active Optimizely Feature Experimentation account
2. **API Token**: Generate an API token from your Optimizely account settings
3. **Project Access**: Ensure your API token has access to the target project

### Step-by-Step Instructions

1. **Open the SidePanel**
   - Click the hamburger menu (☰) in the top-left corner
   - Navigate to the "Feature Flag Generator" section

2. **Enter API Token**
   - Paste your Optimizely API token in the password field
   - The generator will automatically fetch your available projects

3. **Select Project and Environment**
   - Choose the target project from the dropdown
   - Select the environment (Development, Staging, Production, etc.)

4. **Choose Flags to Generate**
   - Check/uncheck the feature flags you want to create
   - All flags are selected by default

5. **Generate Flags**
   - Click "Generate Flags" to start the process
   - Monitor the progress in real-time
   - Wait for completion confirmation

### API Token Generation

To generate an Optimizely API token:

1. Log in to your Optimizely account
2. Go to **Settings** → **API Tokens**
3. Click **Create Token**
4. Give it a descriptive name (e.g., "Feature Flag Generator")
5. Select appropriate permissions (read/write access to flags)
6. Copy the generated token

## Generated Configuration

### Flag Structure

Each generated flag follows this structure:

```json
{
  "key": "flag_name",
  "name": "Human Readable Name",
  "description": "Auto-generated flag for Human Readable Name",
  "project_id": 12345,
  "variables": [
    {
      "key": "variable_name",
      "name": "Variable Name",
      "type": "string|number|json",
      "description": "Variable description",
      "default_value": "default_value"
    }
  ],
  "rulesets": [
    {
      "rules": [
        {
          "name": "Serve to everyone",
          "conditions": [],
          "actions": [
            {
              "action": "serve",
              "variation_id": "variation_id"
            }
          ]
        }
      ]
    }
  ]
}
```

### Default Values

The generator uses your current app configuration as default values:

- **Theme Configuration**: From `src/config/themeConfig.ts`
- **Movie Data**: From `src/config/completeMovieData.json`
- **Pricing Data**: Pre-configured subscription plans
- **Banner Configuration**: Sample promotional banner

## Integration with Your App

After generating flags, you can integrate them with your app:

1. **Update SDK Key**: Replace the SDK key in your app with your own
2. **Test Flags**: Use the SidePanel to test flag variations
3. **Customize Values**: Modify variable values in the Optimizely dashboard
4. **Deploy**: The flags will work immediately in your environment

## Error Handling

The generator handles various error scenarios:

- **Invalid API Token**: Clear error message with token validation
- **Project Access**: Checks project permissions before proceeding
- **Rate Limiting**: Respects API rate limits with automatic delays
- **Network Issues**: Retry mechanisms for failed API calls
- **Validation Errors**: Detailed error messages for invalid configurations

## Troubleshooting

### Common Issues

1. **"API call failed: 401 Unauthorized"**
   - Check your API token is correct
   - Verify the token has the necessary permissions

2. **"API call failed: 403 Forbidden"**
   - Ensure your token has access to the selected project
   - Check project permissions in Optimizely dashboard

3. **"API call failed: 429 Too Many Requests"**
   - The generator respects rate limits automatically
   - Wait a moment and try again

4. **"Flag already exists"**
   - Delete existing flags with the same key in Optimizely
   - Or modify the flag key in the generator

### Rate Limiting

The Optimizely API has strict rate limits:
- **2 requests per second**
- **120 requests per minute**

The generator automatically handles rate limiting by:
- Adding delays between API calls
- Batching operations where possible
- Providing progress indicators during delays

## Security Considerations

- **API Token Storage**: Tokens are stored in memory only, not persisted
- **HTTPS Only**: All API calls use secure HTTPS connections
- **Minimal Permissions**: Use tokens with minimal required permissions
- **Token Rotation**: Regularly rotate your API tokens

## Best Practices

1. **Test in Development**: Always test flag generation in a development environment first
2. **Review Generated Flags**: Check the generated flags in the Optimizely dashboard
3. **Customize Defaults**: Modify default values to match your specific needs
4. **Document Changes**: Keep track of generated flags for your team
5. **Monitor Usage**: Track API usage to stay within rate limits

## Support

If you encounter issues with the Feature Flag Generator:

1. Check the browser console for detailed error messages
2. Verify your API token and project permissions
3. Ensure you're within API rate limits
4. Review the generated flags in your Optimizely dashboard

## API Reference

The generator uses the following Optimizely API endpoints:

- `GET /v2/projects` - List available projects
- `GET /v2/projects/{projectId}/environments` - List project environments
- `POST /v2/flags` - Create feature flags
- `POST /v2/flags/{flagId}/variable-definitions` - Create variable definitions
- `POST /v2/flags/{flagId}/environments/{environmentId}/rulesets` - Create rulesets

For more information, see the [Optimizely Feature Experimentation API documentation](https://docs.developers.optimizely.com/feature-experimentation/reference/feature-experimentation-api-overview). 