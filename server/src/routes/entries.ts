import express from "express";
import { auth } from "../middleware/auth";
import { EntryInput, EntryInputSchema } from "@braindump/shared";
import { logger } from "../lib/logger";
import { Entry } from "../db/models/Entry";
import { AppError } from "../lib/errors";
export const entriesRouter = express.Router();
entriesRouter.use(auth);

entriesRouter.post("/", async (req, res, next) => {
  const isEntryInputValid = EntryInputSchema.safeParse(req.body);
  if (!isEntryInputValid.success) {
    logger.error(`Invalid entry input: ${isEntryInputValid.error}`);
    return res.status(400).json({ message: "Entry creation failed" });
  }
  const entryInput: EntryInput = isEntryInputValid.data;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.userId;
  try {
    const newEntry = await Entry.create({
      userId: userId,
      type: entryInput.type,
      title: entryInput.title,
      tags: entryInput.tags,
      data: entryInput.data,
    });

    return res.status(201).json({
      entry: {
        id: newEntry.id,
      },
    });
  } catch (error) {
    logger.error(`Entry creation failed with error ${error}`);
    return next(new AppError("Entry creation failed", 500));
  }
});

entriesRouter.get("/", async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.userId;
  try {
    const entries = await Entry.find({ userId: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      entries: entries,
    });
  } catch (error) {
    logger.error(`Entry retrieval failed with error ${error}`);
    return next(new AppError("Entry retrieval failed", 500));
  }
});
