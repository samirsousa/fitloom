import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { useGameStore } from './store/useGameStore'
import { registerServiceWorker } from './registerServiceWorker'
import './index.css'

const queryClient = new QueryClient()

// O store já leu o localStorage. Aplica o tema salvo antes de desenhar, para não piscar.
document.documentElement.setAttribute('data-theme', useGameStore.getState().theme)

registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* No GitHub Pages o app vive em /fitloom/; localmente, na raiz */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)