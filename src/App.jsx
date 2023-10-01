import { AuthContextProvider } from "./context/AuthContext.jsx";
import {CartContextProvider} from "./context/CartContext.jsx";

function App({ children }) {
  return (
      <CartContextProvider>
          <AuthContextProvider>
              {children}
          </AuthContextProvider>
      </CartContextProvider>
  )
}

export default App
