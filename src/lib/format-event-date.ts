/**
 * Formats an event's start/end into the card label from the design, always in
 * Calgary time (server render timezone is UTC on Vercel):
 *
 *   OCT 8 · 5PM - 8PM            same day
 *   SEPT 14-15 · 9AM - 4PM       multi-day, same month
 *   SEPT 30-OCT 2 · 9AM - 4PM    multi-day, spans months
 *   OCT 25 · 5:30PM              no end date
 */

const TIME_ZONE = "America/Edmonton";

// The design uses "SEPT", which no Intl locale produces, so map it by hand.
const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC",
];

type Parts = { month: number; day: number; hour: number; minute: number };

function toParts(iso: string): Parts {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  return {
    month: get("month") - 1,
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
}

function formatTime({ hour, minute }: Parts): string {
  const suffix = hour < 12 ? "AM" : "PM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const m = minute === 0 ? "" : `:${String(minute).padStart(2, "0")}`;
  return `${h}${m}${suffix}`;
}

export function formatEventDateTime(
  startIso: string,
  endIso?: string | null,
): string {
  const start = toParts(startIso);
  const startDate = `${MONTHS[start.month]} ${start.day}`;

  if (!endIso) return `${startDate} · ${formatTime(start)}`;

  const end = toParts(endIso);
  let date = startDate;
  if (end.month !== start.month) {
    date = `${startDate}-${MONTHS[end.month]} ${end.day}`;
  } else if (end.day !== start.day) {
    date = `${startDate}-${end.day}`;
  }

  return `${date} · ${formatTime(start)} - ${formatTime(end)}`;
}
