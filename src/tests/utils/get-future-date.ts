import { setYear, parseISO } from "date-fns";

/**
 * Receives "2024-06-15"  and returns "2025-06-15"
 */
export const getFutureDate = (date: string): Date => {
  const parsedDate = parseISO(date);
  const futureDate = setYear(parsedDate, parsedDate.getFullYear() + 1);

  return futureDate;
};
