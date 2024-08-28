import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import ValueProviderComponent from './components/Context/ValueProviderComponent.jsx'

createRoot(document.getElementById('root')).render(
    <ValueProviderComponent>
  <StrictMode>
      <App />
  </StrictMode>,
    </ValueProviderComponent>
)
