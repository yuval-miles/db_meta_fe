import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { authLoading, token } = useAuth();
  if (authLoading) return <></>;
  return <Outlet />;
}

export default App;
