import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource-variable/source-serif-4/opsz.css'
import '@fontsource-variable/public-sans'
import '@fontsource/caveat/latin-600.css' // handwriting in the hero illustration only
import './styles/index.css'
import App from './App.jsx'
import { OrderProvider } from './order/OrderProvider.jsx'

// HashRouter because GitHub Pages can't rewrite deep links to index.html
// (docs/PRD.md §5.1).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <OrderProvider>
        <App />
      </OrderProvider>
    </HashRouter>
  </StrictMode>,
)
