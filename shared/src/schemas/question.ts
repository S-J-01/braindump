import * as z from "zod";
export const QuestionInputSchema = z.object({
  question: z.string().trim().min(1).max(2000),
});
export type QuestionInput = z.infer<typeof QuestionInputSchema>;
