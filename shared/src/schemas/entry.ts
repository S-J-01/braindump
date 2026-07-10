import * as z from "zod";

const LinkEntrySchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.literal("link"),
  title: z
    .string()
    .trim()
    .min(1, { error: "Title must contain at least 1 character" }),
  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, { error: "Tag name must contain at least 1 character" }),
    )
    .default([]),
  data: z.object({
    url: z.url({
      protocol: /^https?$/,
      hostname: z.regexes.domain,
    }),
    description: z
      .string()
      .trim()
      .min(1, { error: "Description must contain at least 1 character" })
      .optional(),
  }),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

const LinkEntryInputSchema = LinkEntrySchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

const NoteEntrySchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.literal("note"),
  title: z
    .string()
    .trim()
    .min(1, { error: "Title must contain at least 1 character" }),
  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, { error: "Tag name must contain at least 1 character" }),
    )
    .default([]),
  data: z.object({
    content: z
      .string()
      .trim()
      .min(1, { error: "Content must contain at least 1 character" }),
  }),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

const NoteEntryInputSchema = NoteEntrySchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

const EntrySchema = z.discriminatedUnion("type", [
  LinkEntrySchema,
  NoteEntrySchema,
]);
const EntryInputSchema = z.discriminatedUnion("type", [
  LinkEntryInputSchema,
  NoteEntryInputSchema,
]);

type Entry = z.infer<typeof EntrySchema>;
type EntryInput = z.infer<typeof EntryInputSchema>;
type LinkEntry = z.infer<typeof LinkEntrySchema>;
type LinkEntryInput = z.infer<typeof LinkEntryInputSchema>;
type NoteEntry = z.infer<typeof NoteEntrySchema>;
type NoteEntryInput = z.infer<typeof NoteEntryInputSchema>;
export {
  EntrySchema,
  EntryInputSchema,
  LinkEntrySchema,
  LinkEntryInputSchema,
  NoteEntrySchema,
  NoteEntryInputSchema,
};
export type {
  Entry,
  EntryInput,
  LinkEntry,
  LinkEntryInput,
  NoteEntry,
  NoteEntryInput,
};
