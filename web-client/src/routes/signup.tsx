import { useState, type SubmitEventHandler } from "react";
import { AuthCard } from "../features/auth/components/AuthCard";
import { useSignup } from "../features/auth/mutations";

export const Signup = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const signupMutation = useSignup();
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signupMutation.mutate({ email, password });
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
          {signupMutation.isPending ? "Signing Up ..." : "Sign Up"}
        </button>
        {signupMutation.isError ? <p>Sign Up Failed</p> : null}
      </form>
    </AuthCard>
  );
};
