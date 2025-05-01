// Jai Shree Ram

import React, { createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Create Context
const SupabaseContext = createContext(supabase);

// Custom hook to access Supabase context
export const useSupabase = () => useContext(SupabaseContext);

// Supabase Context Provider
export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};
