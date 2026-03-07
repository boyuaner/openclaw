import type { AgentMessage } from "@mariozechner/pi-agent-core";
import { describe, expect, it } from "vitest";
import {
  createMessageCharEstimateCache,
  estimateContextChars,
  getToolResultText,
} from "./tool-result-char-estimator.js";

describe("tool-result-char-estimator", () => {
  it("ignores malformed text blocks without throwing", () => {
    const malformedToolResult = {
      role: "toolResult",
      toolCallId: "call_1",
      toolName: "read",
      content: [{ type: "text" }, { type: "text", text: "ok" }],
      isError: false,
      timestamp: Date.now(),
    } as unknown as AgentMessage;

    expect(getToolResultText(malformedToolResult)).toBe("ok");
    expect(() =>
      estimateContextChars([malformedToolResult], createMessageCharEstimateCache()),
    ).not.toThrow();
  });
});
