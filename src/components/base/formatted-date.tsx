import { format, formatISO } from "date-fns";

type FormattedDateProps = {
  date: Date;
};

/**
 * Display a date in a human-readable format, wrapped in a `<time>` element.
 */
export function FormattedDate({ date }: FormattedDateProps) {
  const isoDateString = formatISO(date, { representation: "date" });
  const localizedDateString = format(date, "PPP");

  return <time dateTime={isoDateString}>{localizedDateString}</time>;
}
