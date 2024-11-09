// scripts/test-zoho.js
const fetch = require('node-fetch');
require('dotenv').config();

async function testZohoAPI() {
  console.log('🚀 Starting ZOHO API test...');

  try {
    // Use the authorization code we received
    const code = '1000.1b6700353407087998dec258a15ee9b8.b79b86c784d30342aefaf07434674c34';
    
    // Token exchange parameters
    const tokenParams = new URLSearchParams({
      code: code,
      client_id: '1000.PXP5AMIFRUMYFAVRS71QT4QUVE9Q1Z',
      client_secret: '3d8faf76428e8f73bd404888c6cbc81e5c1bfcf6b5',
      redirect_uri: 'https://stackblitzstarterse5eerq-jy1s--3000--34c588ed.local-credentialless.webcontainer.io/api/zoho/auth/callback',
      grant_type: 'authorization_code'
    });

    console.log('Exchanging authorization code for tokens...');

    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': 'Account-Caddie-Test/1.0'
      },
      body: tokenParams.toString(),
      timeout: 10000
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Token exchange successful!');
    console.log('Access Token:', data.access_token);
    console.log('Refresh Token:', data.refresh_token);
    console.log('Expires In:', data.expires_in);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      const errorData = await error.response.text();
      console.error('Error details:', errorData);
    }
  }
}

testZohoAPI();