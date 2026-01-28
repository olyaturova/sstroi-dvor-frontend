import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/features/auth/model/AuthContext";

export const AppProviders = ({ children }) => (

  <BrowserRouter>
  <AuthProvider>
        {children}
  </AuthProvider>
  </BrowserRouter>
);
