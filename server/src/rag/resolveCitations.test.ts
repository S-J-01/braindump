import test from "node:test";
import assert from "node:assert/strict";
import { resolveCitations } from "./resolveCitations";
import { SourceReference } from "./types";
const source1: SourceReference = {
  label: "[S1]",
  chunkId: "chunk1",
  score: 0.71,
  title: "sample title",
  sourceType: "note",
  sourceId: "source1",
  chunkIndex: 1,
  tags: ["sample", "tag"],
};

const source2: SourceReference = {
  label: "[S2]",
  chunkId: "chunk2",
  score: 0.73,
  title: "sample title 2",
  sourceType: "note",
  sourceId: "source2",
  chunkIndex: 2,
  tags: ["sample", "tag", "new"],
};
const source10: SourceReference = {
  label: "[S10]",
  chunkId: "chunk10",
  score: 0.69,
  title: "sample title 10",
  sourceType: "note",
  sourceId: "source10",
  chunkIndex: 3,
  tags: ["sample", "tag", "new", "mufc"],
};

test("preserves valid citation labels and returns their source metadata", () => {
  const answerFromLLM = "This is a sample answer generated from the LLM [S1]";
  const sourcesSuppliedToLLM: SourceReference[] = [source1];
  const result = resolveCitations(answerFromLLM, sourcesSuppliedToLLM);
  assert.equal(result.answer, answerFromLLM);
  assert.deepEqual(result.citations, [source1]);
  assert.equal(result.unknownLabelCount, 0);
});

test("removes unknown citation labels and counts their occurrences", () => {
  const answerFromLLM: string =
    "This is a sample containing an unknown citation [S99]";
  const sourcesSuppliedToLLM: SourceReference[] = [source1];
  const result = resolveCitations(answerFromLLM, sourcesSuppliedToLLM);
  assert.equal(
    result.answer,
    "This is a sample containing an unknown citation",
  );
  assert.deepEqual(result.citations, []);
  assert.equal(result.unknownLabelCount, 1);
});

test("deduplicates valid citations while removing unknown labels", () => {
  const answerFromLLM: string =
    "First claim [S1]. Second claim [S99]. Third claim [S1].";
  const sourcesSuppliedToLLM: SourceReference[] = [source1];
  const result = resolveCitations(answerFromLLM, sourcesSuppliedToLLM);
  assert.equal(
    result.answer,
    "First claim [S1]. Second claim. Third claim [S1].",
  );
  assert.deepEqual(result.citations, [source1]);
  assert.equal(result.unknownLabelCount, 1);
});

test("returns unique citations in order of first appearance", () => {
  const answerFromLLM =
    "First claim [S2]. Second claim [S1]. Third claim [S2].";
  const sourcesSuppliedToLLM = [source1, source2];
  const result = resolveCitations(answerFromLLM, sourcesSuppliedToLLM);
  assert.equal(result.answer, answerFromLLM);
  assert.deepEqual(result.citations, [source2, source1]);
  assert.equal(result.unknownLabelCount, 0);
});

test("does not partially match an unknown citation label", () => {
  const answerFromLLM = "First claim [S10]. Second claim [S1].";
  const sourcesSuppliedToLLM = [source1];
  const result = resolveCitations(answerFromLLM, sourcesSuppliedToLLM);
  assert.equal(result.answer, "First claim. Second claim [S1].");
  assert.deepEqual(result.citations, [source1]);
  assert.equal(result.unknownLabelCount, 1);
});

test("distinguishes valid citation labels with overlapping numbers", () => {
  const answerFromLLM = "First claim [S10]. Second claim [S1].";
  const sourcesSuppliedToLLM = [source1, source10];
  const result = resolveCitations(answerFromLLM, sourcesSuppliedToLLM);
  assert.equal(result.answer, "First claim [S10]. Second claim [S1].");
  assert.deepEqual(result.citations, [source10, source1]);
  assert.equal(result.unknownLabelCount, 0);
});

test("preserves answers without citation labels and returns no citations", () => {
  const answerFromLLM = "This is an answer with no citation labels";
  const sourcesSuppliedToLLM = [source1, source2, source10];
  const result = resolveCitations(answerFromLLM, sourcesSuppliedToLLM);
  assert.equal(result.answer, answerFromLLM);
  assert.deepEqual(result.citations, []);
  assert.equal(result.unknownLabelCount, 0);
});
