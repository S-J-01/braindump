import { useState, type SubmitEventHandler } from "react";
import { useAskRag } from "../mutations";
import type { QuestionInput } from "@braindump/shared";

export const AskForm = () => {
  const [question, setQuestion] = useState("");
  const askRagMutation = useAskRag();
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const questionInput: QuestionInput = {
      question: question,
    };

    try {
      await askRagMutation.mutateAsync(questionInput);
    } catch (error) {
      console.error("Failed to answer question", error);
    }
  };
  let answerInParts: string[] = [];
  let renderedParts;
  if (askRagMutation.data !== undefined) {
    answerInParts = askRagMutation.data.answer.split(/(\[S\d+\])/);
    renderedParts = answerInParts.map((part, index) => {
      const matchingCitation = askRagMutation.data.citations.find(
        (citation) => citation.label === part,
      );
      if (matchingCitation !== undefined) {
        return (
          <button
            type="button"
            key={index}
            onClick={() => console.log(matchingCitation)}
          >
            {part}
          </button>
        );
      }
      return part;
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Ask Braindump</label>
        <textarea
          value={question}
          required
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <button type="submit" disabled={askRagMutation.isPending}>
          {askRagMutation.isPending ? "Asking..." : "Ask Braindump"}
        </button>
        {askRagMutation.isError ? <p>Ask Braindump failed</p> : null}
        {askRagMutation.data ? <p>{renderedParts}</p> : null}
      </form>
    </>
  );
};
