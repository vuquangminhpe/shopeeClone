import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './Contexts/app.context.tsx'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='948388153743-36928npurnkg9tt75b5mciv3hngojuuv.apps.googleusercontent.com'>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <App />
          </AppProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
