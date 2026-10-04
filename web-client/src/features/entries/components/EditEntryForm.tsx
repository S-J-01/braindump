import type { SerializedEntry } from "@braindump/shared";
import { useState, type SubmitEventHandler } from "react";
import { useUpdateEntry } from "../mutations";
import { useQueryClient } from "@tanstack/react-query";
import { entryQueryKey } from "../queries";
type EditEntryFormProps = {
  selectedEntry: SerializedEntry;
  onClose: () => void;
};
export const EditEntryForm = ({
  selectedEntry,
  onClose,
}: EditEntryFormProps) => {
  const entryType = selectedEntry.type;
  const [title, setTitle] = useState(selectedEntry.title);
  const [tags, setTags] = useState(selectedEntry.tags.join(","));
  const [url, setUrl] = useState(
    entryType === "link" ? (selectedEntry.data.url ?? "") : "",
  );
  const [description, setDescription] = useState(
    entryType === "link" ? (selectedEntry.data.description ?? "") : "",
  );
  const [content, setContent] = useState(
    entryType === "note" ? (selectedEntry.data.content ?? "") : "",
  );
  const updateEntryMutation = useUpdateEntry();
  const queryClient = useQueryClient();
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
      await updateEntryMutation.mutateAsync({
        entryId: selectedEntry.id,
        input: entryInput,
      });
      await queryClient.invalidateQueries({
        queryKey: entryQueryKey.list(selectedEntry.userId),
      });
      onClose();
    } catch (error) {
      console.error("Failed to update entry", error);
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
        <select value={entryType} disabled>
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
        <button
          type="button"
          onClick={onClose}
          disabled={updateEntryMutation.isPending}
        >
          Close
        </button>
        <button type="submit" disabled={updateEntryMutation.isPending}>
          {updateEntryMutation.isPending ? "Saving Changes..." : "Save Changes"}
        </button>
        {updateEntryMutation.isError ? <p>Update Entry Failed</p> : null}
      </form>
    </>
  );
};
