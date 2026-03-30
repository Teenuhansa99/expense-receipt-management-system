import { formatCurrency } from "../utils/formatCurrency";

describe("formatCurrency", () => {
  it("should format whole numbers correctly", () => {
    expect(formatCurrency(1200)).toBe("Rs. 1200.00");
  });

  it("should format decimal numbers correctly", () => {
    expect(formatCurrency(99.5)).toBe("Rs. 99.50");
  });
});