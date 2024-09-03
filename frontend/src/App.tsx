import { AuthProvider } from "./contexts/AuthContext";
import { ResourceProvider } from "./contexts/ResourceContext";
import { ToastProvider } from "./contexts/ToastContext";
import { Routes } from "./routes/Routes";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ResourceProvider>
          <Routes />
        </ResourceProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
