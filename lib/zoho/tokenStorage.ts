import fs from 'fs/promises';
import path from 'path';

interface TokenData {
  accessToken: string;
  expiresAt: number;
}

const TOKEN_FILE_PATH = path.join(process.cwd(), '.tokens.json');

// One year in seconds (365 days * 24 hours * 60 minutes * 60 seconds)
const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;

export async function storeToken(accessToken: string, expiresIn: number): Promise<void> {
  // Override the expiry to one year, regardless of what Zoho returns
  const tokenData: TokenData = {
    accessToken,
    expiresAt: Date.now() + (ONE_YEAR_IN_SECONDS * 1000)
  };

  try {
    await fs.writeFile(TOKEN_FILE_PATH, JSON.stringify(tokenData), 'utf-8');
  } catch (error) {
    console.error('Failed to store token:', error);
    throw new Error('Token storage failed');
  }
}

export async function getStoredToken(): Promise<TokenData | null> {
  try {
    const data = await fs.readFile(TOKEN_FILE_PATH, 'utf-8');
    const tokenData: TokenData = JSON.parse(data);
    
    // Check if token is expired
    if (tokenData.expiresAt <= Date.now()) {
      return null;
    }
    
    return tokenData;
  } catch (error) {
    return null;
  }
} 