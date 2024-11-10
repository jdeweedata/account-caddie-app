import * as ZOHOCRMSDK from '@zohocrm/nodejs-sdk-7.0';

export async function initializeCRMClient() {
  try {
    // Initialize SDK logger
    const logger = new ZOHOCRMSDK.LogBuilder()
      .level(ZOHOCRMSDK.Levels.INFO)
      .filePath('./logs/zoho-crm.log')
      .build();

    // Configure SDK token
    const token = new ZOHOCRMSDK.OAuthBuilder()
      .clientId(process.env.ZOHO_CLIENT_ID!)
      .clientSecret(process.env.ZOHO_CLIENT_SECRET!)
      .refreshToken(process.env.ZOHO_REFRESH_TOKEN!)
      .build();

    // Set SDK configuration
    const sdkConfig = new ZOHOCRMSDK.SDKConfigBuilder()
      .autoRefreshFields(true)
      .pickListValidation(true)
      .build();

    // Initialize the SDK
    await ZOHOCRMSDK.Initializer.initialize({
      environment: ZOHOCRMSDK.USDataCenter.PRODUCTION(),
      token,
      logger,
      sdkConfig,
    });

    return true;
  } catch (error) {
    console.error('Failed to initialize Zoho CRM client:', error);
    throw error;
  }
} 