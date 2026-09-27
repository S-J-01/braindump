import type { SerializedEntry } from "@braindump/shared";
import { useDeleteEntry } from "../mutations";
import { useQueryClient } from "@tanstack/react-query";
import { entryQueryKey } from "../queries";

export const EntryList = ({ entries }: { entries: SerializedEntry[] }) => {
  const deleteEntryMutation = useDeleteEntry();
  const queryClient = useQueryClient();
  const handleDelete = async (entryId: string, userId: string) => {
    try {
      await deleteEntryMutation.mutateAsync(entryId);
      await queryClient.invalidateQueries({
        queryKey: entryQueryKey.list(userId),
      });
    } catch (error) {
      console.error("Failed to delete entry", error);
    }
  };

  return (
    <>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <h2>{entry.title}</h2>
            <p>Type: {entry.type}</p>

            {entry.tags.length > 0 ? (
              <p>Tags: {entry.tags.join(", ")}</p>
            ) : null}

            {entry.type === "link" && entry.data.url ? (
              <a href={entry.data.url}>{entry.data.url}</a>
            ) : null}

            {entry.type === "note" && entry.data.content ? (
              <p>{entry.data.content}</p>
            ) : null}
            <button
              type="button"
              onClick={() => handleDelete(entry.id, entry.userId)}
              disabled={deleteEntryMutation.isPending}
            >
              {deleteEntryMutation.variables === entry.id &&
              deleteEntryMutation.isPending
                ? "Deleting..."
                : "Delete"}
            </button>
          </li>
        ))}
      </ul>
      {deleteEntryMutation.isError ? <p>Delete Entry Failed</p> : null}
    </>
  );
};
