import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import AuthContextProvider from './context/AuthContext.jsx'
import CartContextProvider from './context/CartContext.jsx'
import UserContextProvider from './context/UseContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
<UserContextProvider>



      <CartContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </CartContextProvider>
</UserContextProvider>





    </NextUIProvider>
  </StrictMode>,
)
