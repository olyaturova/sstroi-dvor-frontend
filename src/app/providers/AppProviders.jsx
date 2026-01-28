import { HashRouter } from "react-router-dom";
import { AuthProvider } from "@/features/auth/model/AuthContext";

export const AppProviders = ({ children }) => (

  <HashRouter>
  <AuthProvider>
        {children}
  </AuthProvider>
  </HashRouter>
);
