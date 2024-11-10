import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function refreshZohoToken() {
  // Validate required environment variables
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const authDomain = process.env.ZOHO_AUTH_DOMAIN;

  if (!refreshToken || !clientId || !clientSecret || !authDomain) {
    throw new Error('Missing required environment variables. Please check your .env.local file.');
  }

  const url = `${authDomain}/oauth/v2/token?` +
    `refresh_token=${refreshToken}` +
    `&client_id=${clientId}` +
    `&client_secret=${clientSecret}` +
    `&grant_type=refresh_token`;

  try {
    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${JSON.stringify(data)}`);
    }

    return data.access_token;
  } catch (error) {
    console.error('Error refreshing Zoho token:', error);
    throw error;
  }
}

async function updateEnvFile(newToken: string) {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local file not found');
  }

  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update the access token
  envContent = envContent.replace(
    /ZOHO_ACCESS_TOKEN=.*/,
    `ZOHO_ACCESS_TOKEN=${newToken}`
  );
  
  fs.writeFileSync(envPath, envContent);
}

async function main() {
  try {
    console.log('Starting token refresh...');
    
    // Verify .env.local exists
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
      throw new Error('.env.local file not found');
    }

    const newToken = await refreshZohoToken();
    console.log('Successfully obtained new token');
    
    await updateEnvFile(newToken);
    console.log('Successfully updated .env.local file with new token');
    
  } catch (error) {
    console.error('Failed to refresh token:', error);
    process.exit(1);
  }
}

main(); 