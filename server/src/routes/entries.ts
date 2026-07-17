import express from "express";
import { auth } from "../middleware/auth";
import { EntryInput, EntryInputSchema } from "@braindump/shared";
import { logger } from "../lib/logger";
import { Entry } from "../db/models/Entry";
import { AppError } from "../lib/errors";
import mongoose from "mongoose";
import { serializeEntry } from "../lib/entrySerializer";
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
    const serializedNewEntry = serializeEntry(newEntry);
    return res.status(201).json({
      message: "Entry created successfully",
      entry: serializedNewEntry,
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

    const serializedEntries = entries.map((entry) => serializeEntry(entry));
    return res.status(200).json({
      message: "Entries retrieved successfully",
      entries: serializedEntries,
    });
  } catch (error) {
    logger.error(`Entry retrieval failed with error ${error}`);
    return next(new AppError("Entry retrieval failed", 500));
  }
});

entriesRouter.get("/:id", async (req, res, next) => {
  const requiredEntryId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(requiredEntryId)) {
    return res.status(400).json({ message: "Invalid entry id" });
  }
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.userId;
  try {
    const entry = await Entry.findOne({ userId: userId, _id: requiredEntryId });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    const serializedEntry = serializeEntry(entry);
    return res.status(200).json({
      message: "Entry retrieved successfully",
      entry: serializedEntry,
    });
  } catch (error) {
    logger.error(`Entry retrieval failed with error ${error}`);
    return next(new AppError("Entry retrieval failed", 500));
  }
});

entriesRouter.delete("/:id", async (req, res, next) => {
  const requiredEntryId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(requiredEntryId)) {
    return res.status(400).json({ message: "Invalid entry id" });
  }
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.userId;
  try {
    const deletedEntry = await Entry.findOneAndDelete({
      userId: userId,
      _id: requiredEntryId,
    });
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    const serializedDeletedEntry = serializeEntry(deletedEntry);
    return res.status(200).json({
      message: "Entry deleted successfully",
      entry: serializedDeletedEntry,
    });
  } catch (error) {
    logger.error(`Entry deletion failed with error: ${error}`);
    return next(new AppError("Entry deletion failed", 500));
  }
});

entriesRouter.patch("/:id", async (req, res, next) => {
  const requiredEntryId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(requiredEntryId)) {
    return res.status(400).json({ message: "Invalid entry id" });
  }
  const isEntryInputValid = EntryInputSchema.safeParse(req.body);
  if (!isEntryInputValid.success) {
    logger.error(`Invalid entry input: ${isEntryInputValid.error}`);
    return res.status(400).json({ message: "Entry update failed" });
  }
  const entryUpdate: EntryInput = isEntryInputValid.data;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.userId;
  try {
    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: requiredEntryId, userId: userId },
      {
        type: entryUpdate.type,
        title: entryUpdate.title,
        tags: entryUpdate.tags,
        data: entryUpdate.data,
      },
      {
        returnDocument: "after",
      },
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    const serializedUpdatedEntry = serializeEntry(updatedEntry);
    return res.status(200).json({
      message: "Entry updated successfully",
      entry: serializedUpdatedEntry,
    });
  } catch (error) {
    logger.error(`Entry update failed with error: ${error}`);
    return next(new AppError("Entry update failed", 500));
  }
});
