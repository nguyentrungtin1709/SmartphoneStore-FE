import { AuthContextProvider } from "./context/AuthContext.jsx";

function App({ children }) {
  return (
      <AuthContextProvider>
          {children}
      </AuthContextProvider>
  )
}

export default App
