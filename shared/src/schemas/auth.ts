import * as z from "zod";

const SignUpInputSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(12).max(50),
});

const LogInInputSchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(12).max(50),
});

type SignUpInput = z.infer<typeof SignUpInputSchema>;
type LogInInput = z.infer<typeof LogInInputSchema>;

export { SignUpInputSchema, LogInInputSchema };
export type { SignUpInput, LogInInput };
