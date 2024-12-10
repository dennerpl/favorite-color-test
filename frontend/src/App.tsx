import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet, Router, useNavigate } from "react-router-dom";
import type { Navigation, Session } from "@toolpad/core";
import { SessionContext } from "./SessionContext";
import "tailwindcss/tailwind.css";
import { People } from "@mui/icons-material";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Menu",
  },
  {
    title: "Perfil",
    icon: <DashboardIcon />,
  },
  {
    segment: "users",
    title: "Users",
    icon: <People />,
  },
];

const BRANDING = {
  title: "My Favorite Color App",
};

export default function App() {
  const [session, setSession] = React.useState<Session | null>(null);
  const navigate = useNavigate();

  const signIn = React.useCallback(() => {
    navigate("/sign-in");
  }, [navigate]);

  const signOut = React.useCallback(() => {
    setSession(null);
    navigate("/sign-in");
  }, [navigate]);

  const sessionContextValue = React.useMemo(
    () => ({ session, setSession }),
    [session, setSession]
  );

  return (
    <SessionContext.Provider value={sessionContextValue}>
      <AppProvider
        navigation={NAVIGATION}
        branding={BRANDING}
        session={session}
        authentication={{ signIn, signOut }}
      >
        <Outlet />
      </AppProvider>
    </SessionContext.Provider>
  );
}
