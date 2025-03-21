import { Switch, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';

// Mock implementation for chrome.storage.sync when developing in a regular tab
const mockChromeStorage = (() => {
  // Use localStorage to simulate chrome storage
  const storageData = {};
  
  return {
    sync: {
      get: (keys, callback) => {
        try {
          const storedData = JSON.parse(localStorage.getItem('mockChromeStorage') || '{}');
          const result = {};
          
          if (Array.isArray(keys)) {
            keys.forEach(key => {
              result[key] = storedData[key];
            });
          } else if (typeof keys === 'object') {
            Object.keys(keys).forEach(key => {
              result[key] = storedData[key] !== undefined ? storedData[key] : keys[key];
            });
          } else if (typeof keys === 'string') {
            result[keys] = storedData[keys];
          }
          
          setTimeout(() => callback(result), 0);
        } catch (error) {
          console.error('Error reading from mock storage:', error);
          callback({});
        }
      },
      set: (items, callback) => {
        try {
          const storedData = JSON.parse(localStorage.getItem('mockChromeStorage') || '{}');
          const updatedData = { ...storedData, ...items };
          localStorage.setItem('mockChromeStorage', JSON.stringify(updatedData));
          if (callback) setTimeout(callback, 0);
        } catch (error) {
          console.error('Error writing to mock storage:', error);
          if (callback) callback();
        }
      }
    }
  };
})();

export const OverlaySwitcher = () => {
    const [overlayEnabled, setOverlayEnabled] = useState(false);
    // Use the real chrome API in extension context, otherwise use mock
    const storage = typeof chrome !== 'undefined' && chrome.storage ? 
                    chrome.storage : mockChromeStorage;

    useEffect(() => {
        storage.sync.get(['overlayEnabled'], (res) => {
            setOverlayEnabled(res.overlayEnabled || false);
        });
    }, []);

    const handleToggleOverlay = (event) => {
        const newValue = event.target.checked;
        setOverlayEnabled(newValue);
        storage.sync.set({ overlayEnabled: newValue });
        console.log('Overlay enabled:', newValue); // Added for debugging
    };

    return (
        <FormControlLabel
            control={
                <Switch checked={overlayEnabled} onChange={handleToggleOverlay} />
            }
            label="Enable Gmail Overlay"
        />
    );
}