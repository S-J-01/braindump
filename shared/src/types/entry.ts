export type SerializedEntry = {
  id: string;
  userId: string;
  type: "link" | "note";
  title: string;
  tags: string[];
  data: {
    url?: string;
    description?: string;
    content?: string;
  };
  createdAt: string;
  updatedAt: string;
};
