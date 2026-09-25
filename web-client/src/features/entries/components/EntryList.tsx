import type { SerializedEntry } from "@braindump/shared";

export const EntryList = ({ entries }: { entries: SerializedEntry[] }) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          <h2>{entry.title}</h2>
          <p>Type: {entry.type}</p>

          {entry.tags.length > 0 ? <p>Tags: {entry.tags.join(", ")}</p> : null}

          {entry.type === "link" && entry.data.url ? (
            <a href={entry.data.url}>{entry.data.url}</a>
          ) : null}

          {entry.type === "note" && entry.data.content ? (
            <p>{entry.data.content}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
};
