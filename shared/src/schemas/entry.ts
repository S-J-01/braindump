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

const EntrySchema = z.discriminatedUnion("type", [LinkEntrySchema]);
const EntryInputSchema = z.discriminatedUnion("type", [LinkEntryInputSchema]);
