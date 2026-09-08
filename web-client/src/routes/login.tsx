import { useState, type SubmitEventHandler } from "react";
import { AuthCard } from "../features/auth/components/AuthCard";
import { useLogin } from "../features/auth/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router";
import { authQueryKeys, useCurrentUser } from "../features/auth/queries";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await loginMutation.mutateAsync({ email, password });
    await queryClient.invalidateQueries({
      queryKey: authQueryKeys.currentUser,
    });
    navigate("/app");
  };

  const { data, isLoading } = useCurrentUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return <Navigate replace to="/app" />;
  }
  return (
    <AuthCard title="Log In" subtitle="Log In To Continue">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in ..." : "Log In"}
        </button>
        {loginMutation.isError ? <p>Log In Failed</p> : null}
      </form>
    </AuthCard>
  );
};
