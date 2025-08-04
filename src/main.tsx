import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import './i18n.ts';
import router from './routes.tsx';
import { AuthProvider } from './context/authContext.tsx';
import "katex/dist/katex.min.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
