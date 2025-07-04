const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const ENCRYPTED_FILE = path.join(__dirname, 'optimizely_key.enc');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔐 Optimizely API Key Encryption Tool');
console.log('=====================================');
console.log('This tool will encrypt your Optimizely API key with a passphrase.');
console.log('The encrypted key will be stored in: src/secure/optimizely_key.enc');
console.log('');

rl.question('Enter your Optimizely API key: ', (apiKey) => {
  if (!apiKey.trim()) {
    console.error('❌ API key cannot be empty');
    rl.close();
    return;
  }

  rl.question('Enter a passphrase to encrypt the key: ', (passphrase) => {
    if (!passphrase.trim()) {
      console.error('❌ Passphrase cannot be empty');
      rl.close();
      return;
    }

    rl.question('Confirm the passphrase: ', (confirmPassphrase) => {
      if (passphrase !== confirmPassphrase) {
        console.error('❌ Passphrases do not match');
        rl.close();
        return;
      }

      try {
        // Generate a random IV (Initialization Vector)
        const iv = crypto.randomBytes(16);
        
        // Derive a key from the passphrase using PBKDF2 (to match Web Crypto API)
        const salt = Buffer.from('optimizely-salt', 'utf8');
        const key = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, 'sha256');
        
        // Create cipher
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        
        // Encrypt the API key
        let encrypted = cipher.update(apiKey, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        // Combine IV and encrypted data
        const payload = iv.toString('hex') + ':' + encrypted;
        
        // Ensure the directory exists
        const dir = path.dirname(ENCRYPTED_FILE);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write the encrypted key to file
        fs.writeFileSync(ENCRYPTED_FILE, payload);
        
        console.log('');
        console.log('✅ Success!');
        console.log(`📁 Encrypted key saved to: ${ENCRYPTED_FILE}`);
        console.log('');
        console.log('🔑 Remember your passphrase - you will need it to decrypt the key in the app.');
        console.log('⚠️  Keep this passphrase secure and do not share it.');
        console.log('');
        console.log('🚀 You can now use the "Specific Project" mode in the Optimizely Project Copy tool.');
        
      } catch (error) {
        console.error('❌ Error encrypting key:', error.message);
      }
      
      rl.close();
    });
  });
}); 