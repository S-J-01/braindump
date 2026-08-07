import { Navigate, Outlet } from "react-router";
import { useCurrentUser } from "../queries";

export const ProtectedRoute = () => {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <Navigate replace to="/login" />;
  }
  return <Outlet />;
};
