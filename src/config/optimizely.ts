import { createInstance } from '@optimizely/react-sdk';

// Function to get SDK key from URL or localStorage
const getSdkKey = (): string => {
  // Check URL parameters first
  const urlParams = new URLSearchParams(window.location.search);
  const sdkKeyFromUrl = urlParams.get('sdk_key');
  
  if (sdkKeyFromUrl) {
    // Store in localStorage if found in URL
    localStorage.setItem('optimizely_sdk_key', sdkKeyFromUrl);
    return sdkKeyFromUrl;
  }
  
  // Fall back to localStorage
  const sdkKeyFromStorage = localStorage.getItem('optimizely_sdk_key');
  if (sdkKeyFromStorage) {
    return sdkKeyFromStorage;
  }
  
  // Default SDK key if none found
  return 'VcBzHwxVF7kba7WCvzSfW';
};

const optimizelyClient = createInstance({
  sdkKey: getSdkKey(),
  datafileOptions: {
    autoUpdate: true,
    updateInterval: 6000, // 1 minute in milliseconds
  },
});

export default optimizelyClient; 