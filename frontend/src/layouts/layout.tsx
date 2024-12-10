import { Outlet, Navigate } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useSession } from "../SessionContext";

export default function Layout() {
  const { session } = useSession();

  if (!session) {
    // Add the `callbackUrl` search parameter
    const redirectTo = "/sign-in";

    return <Navigate to={redirectTo} replace />;
  }

  return (
    <DashboardLayout>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
