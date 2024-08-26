import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { UserAuthProvider } from './context/UserAuthContext';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root

root.render(
  <AdminAuthProvider>
    <UserAuthProvider>
      <App />
    </UserAuthProvider>
  </AdminAuthProvider>
);
