import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
// Source Serif stays variable for its optical sizes: display headlines use the
// finer display cut automatically. Public Sans has no optical axis, so static
// Latin files for just the weights in use are smaller with no visual change.
import '@fontsource-variable/source-serif-4/opsz.css'
import '@fontsource-variable/source-serif-4/opsz-italic.css'
import '@fontsource/public-sans/latin-400.css'
import '@fontsource/public-sans/latin-400-italic.css'
import '@fontsource/public-sans/latin-500.css'
import '@fontsource/public-sans/latin-600.css'
import '@fontsource/public-sans/latin-700.css'
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
