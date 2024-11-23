import { format } from "date-fns";

type FormattedDateProps = {
  date: string;
};

/**
 * Display a date in a human-readable format, wrapped in a `<time>` element.
 * @param date The date string to format.
 */
export function FormattedDate({ date }: FormattedDateProps) {
  return <time dateTime={date}>{format(date, "PPP")}</time>;
}
