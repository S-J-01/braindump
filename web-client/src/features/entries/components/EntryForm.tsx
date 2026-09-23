import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { useCreateEntry } from "../mutations";

export const EntryForm = () => {
  const [entryType, setEntryType] = useState<"link" | "note">("link");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const createEntryMutation = useCreateEntry();
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const entryInput =
      entryType === "link"
        ? {
            type: "link" as const,
            title: title,
            tags: tagsArray,
            data: {
              url: url,
              ...(description.trim() !== "" && {
                description: description.trim(),
              }),
            },
          }
        : {
            type: "note" as const,
            title: title,
            tags: tagsArray,
            data: {
              content: content,
            },
          };
    try {
      await createEntryMutation.mutateAsync(entryInput);
    } catch (error) {
      console.error("Failed to add entry", error);
    }
  };

  const handleEntryType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    if (value === "link" || value === "note") {
      setEntryType(value);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          value={title}
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Enter Tags separated by commas</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <select value={entryType} onChange={handleEntryType}>
          <option value="link">Link</option>
          <option value="note">Note</option>
        </select>
        {entryType === "link" ? (
          <>
            <label>URL</label>
            <input
              type="url"
              value={url}
              required
              onChange={(e) => setUrl(e.target.value)}
            />
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>
            <label>Content</label>
            <textarea
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </>
        )}
        <button type="submit" disabled={createEntryMutation.isPending}>
          {createEntryMutation.isPending ? "Adding..." : "Add Entry"}
        </button>
        {createEntryMutation.isError ? <p>Add Entry Failed</p> : null}
      </form>
    </>
  );
};
