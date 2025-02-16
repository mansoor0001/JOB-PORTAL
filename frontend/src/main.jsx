import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    <Toaster/>
     </BrowserRouter>
  </StrictMode>,
)
