import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "../features/auth/mutations";
import { authQueryKeys, useCurrentUser } from "../features/auth/queries";
import { useNavigate } from "react-router";

export const AppPage = () => {
  const { data, isLoading } = useCurrentUser();
  const userId = data?.user.userId;
  const logoutMutation = useLogout();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    await queryClient.invalidateQueries({
      queryKey: authQueryKeys.currentUser,
    });
    navigate("/login");
  };
  return (
    <>
      <div>This is protected app area</div>
      {isLoading ? null : <div>The user id of current user is {userId}</div>}
      <button onClick={handleLogout} disabled={logoutMutation.isPending}>
        {logoutMutation.isPending ? "Logging out" : "Log Out"}
      </button>
      {logoutMutation.isError ? <p>Logout Failed</p> : null}
    </>
  );
};
