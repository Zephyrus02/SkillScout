import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

const clerk = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerk) {
  throw new Error('Clerk publishable key is missing');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerk}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
