import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "../features/auth/mutations";
import { authQueryKeys, useCurrentUser } from "../features/auth/queries";
import { useNavigate } from "react-router";
import { useEntries } from "../features/entries/queries";
import { EntryForm } from "../features/entries/components/EntryForm";
import { EntryList } from "../features/entries/components/EntryList";

export const AppPage = () => {
  const currentUserQuery = useCurrentUser();

  const userId = currentUserQuery.data?.user.userId;
  const entriesQuery = useEntries(userId);
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

      {currentUserQuery.isLoading ? (
        <p>Loading session...</p>
      ) : !currentUserQuery.data ? null : (
        <>
          <div>
            The user id of current user is {currentUserQuery.data.user.userId}
          </div>

          <button onClick={handleLogout} disabled={logoutMutation.isPending}>
            {logoutMutation.isPending ? "Logging out" : "Log Out"}
          </button>

          {logoutMutation.isError ? <p>Logout failed</p> : null}
          <EntryForm userId={currentUserQuery.data.user.userId}></EntryForm>
          <section>
            <h1>Your entries</h1>

            {entriesQuery.isLoading ? <p>Loading entries...</p> : null}

            {entriesQuery.isError ? <p>Failed to load entries</p> : null}

            {entriesQuery.data && entriesQuery.data.entries.length === 0 ? (
              <p>No entries yet</p>
            ) : null}

            {entriesQuery.data && entriesQuery.data.entries.length > 0 ? (
              <EntryList entries={entriesQuery.data.entries}></EntryList>
            ) : null}
          </section>
        </>
      )}
    </>
  );
};
