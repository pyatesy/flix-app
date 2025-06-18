import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateUserId } from '../utils/userId';

interface UserContextType {
  userId: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Check if userId exists in localStorage
    const storedUserId = localStorage.getItem('userId');
    
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // Generate new userId if none exists
      const newUserId = generateUserId();
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};



export const useUserId = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserId must be used within a UserProvider');
  }
  return context;
}; 