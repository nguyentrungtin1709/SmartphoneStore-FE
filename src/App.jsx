import { AuthContextProvider } from "./context/AuthContext.jsx";
import {SmartphonesContextProvider} from "./context/SmartphonesContext.jsx";

function App({ children }) {
  return (
      <SmartphonesContextProvider>
          <AuthContextProvider>
              {children}
          </AuthContextProvider>
      </SmartphonesContextProvider>
  )
}

export default App
