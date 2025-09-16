import { isWithinDND } from "../utils/dnd";

describe("DND Logic (22:00 → 07:00)", () => {
  const start = "22:00";
  const end = "07:00";

  test("blocks at 23:30 (late night, inside DND)", () => {
    expect(isWithinDND("2025-07-28T23:30:00Z", start, end)).toBe(true);
  });

  test("blocks at 02:00 (early morning, inside DND)", () => {
    expect(isWithinDND("2025-07-28T02:00:00Z", start, end)).toBe(true);
  });

  test("allows at 21:00 (before DND start)", () => {
    expect(isWithinDND("2025-07-28T21:00:00Z", start, end)).toBe(false);
  });

  test("allows at 08:00 (after DND end)", () => {
    expect(isWithinDND("2025-07-28T08:00:00Z", start, end)).toBe(false);
  });

  test("edge case: exactly at 22:00 should be blocked", () => {
    expect(isWithinDND("2025-07-28T22:00:00Z", start, end)).toBe(true);
  });

  test("edge case: exactly at 07:00 should be allowed", () => {
    expect(isWithinDND("2025-07-28T07:00:00Z", start, end)).toBe(false);
  });
});
