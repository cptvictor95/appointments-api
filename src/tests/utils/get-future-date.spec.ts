import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

test("increases the date by 1 year", () => {
  const date = "2024-06-15";
  const futureDate = getFutureDate(date);

  expect(futureDate.getFullYear()).toEqual(2025);
});
