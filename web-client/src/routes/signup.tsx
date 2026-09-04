import { useState, type SubmitEventHandler } from "react";
import { AuthCard } from "../features/auth/components/AuthCard";
import { useSignup } from "../features/auth/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authQueryKeys } from "../features/auth/queries";
export const Signup = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const signupMutation = useSignup();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await signupMutation.mutateAsync({ email, password });
    await queryClient.invalidateQueries({
      queryKey: authQueryKeys.currentUser,
    });
    navigate("/app");
  };

  return (
    <AuthCard title="Sign Up" subtitle="Sign Up To Continue">
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
        <button type="submit" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? "Signing up ..." : "Sign Up"}
        </button>
        {signupMutation.isError ? <p>Sign Up Failed</p> : null}
      </form>
    </AuthCard>
  );
};
