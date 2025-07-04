/**
 * Decrypts the Optimizely API key using the provided passphrase
 * @param encrypted - The encrypted key string (format: iv:encrypted where both are hex strings)
 * @param passphrase - The passphrase used to encrypt the key
 * @returns The decrypted API key
 */
export async function decryptOptimizelyKey(encrypted: string, passphrase: string): Promise<string> {
  try {
    // Parse the encrypted data (format: iv:encrypted where both are hex strings)
    const [ivHex, encryptedHex] = encrypted.split(':');
    
    if (!ivHex || !encryptedHex) {
      throw new Error('Invalid encrypted data format. Expected format: iv:encrypted');
    }
    
    // Convert hex strings to Uint8Array
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const encryptedData = new Uint8Array(encryptedHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    
    // Use the same hardcoded salt as the encryption script
    const salt = new TextEncoder().encode('optimizely-salt');
    
    // Derive key from passphrase using PBKDF2 (same parameters as encryption script)
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(passphrase),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );
    
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-CBC', length: 256 },
      false,
      ['decrypt']
    );
    
    // Decrypt the API key using AES-CBC (same as encryption script)
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: iv
      },
      key,
      encryptedData
    );
    
    // Convert the decrypted data back to string
    const decryptedKey = new TextDecoder().decode(decrypted);
    
    return decryptedKey;
    
  } catch (error) {
    throw new Error(`Failed to decrypt API key: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validates if the encrypted key file exists and has the correct format
 * @param encrypted - The encrypted key string
 * @returns True if the format is valid
 */
export function validateEncryptedKey(encrypted: string): boolean {
  try {
    // Check if it's in the correct format: iv:encrypted (both hex strings)
    const parts = encrypted.split(':');
    if (parts.length !== 2) {
      return false;
    }
    
    const [ivHex, encryptedHex] = parts;
    
    // Validate that both parts are valid hex strings
    const hexRegex = /^[0-9a-fA-F]+$/;
    if (!hexRegex.test(ivHex) || !hexRegex.test(encryptedHex)) {
      return false;
    }
    
    // Validate that IV is 16 bytes (32 hex characters) and encrypted data is not empty
    if (ivHex.length !== 32 || encryptedHex.length === 0) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
} 