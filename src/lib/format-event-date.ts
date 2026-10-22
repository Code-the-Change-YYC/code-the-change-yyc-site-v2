/**
 * Formats an event's start/end into the card label from the design, as the wall-clock
 * time entered in the CMS:
 *
 *   OCT 8 · 5PM - 8PM            same day
 *   SEPT 14-15 · 9AM - 4PM       multi-day, same month
 *   SEPT 30-OCT 2 · 9AM - 4PM    multi-day, spans months
 *   OCT 25 · 5:30PM              no end date
 */

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

// Editors type local (Calgary) wall-clock times into Contentful, but it stores
// them as UTC ("2025-11-08T09:00:00.000Z" for 9AM). Converting to a timezone
// would shift that to 2AM, so read the components straight from the string
// and ignore any offset/Z.
function toParts(iso: string): Parts {
  const m = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/.exec(iso);
  if (!m) return { month: 0, day: 1, hour: 0, minute: 0 };
  return {
    month: Number(m[2]) - 1,
    day: Number(m[3]),
    hour: Number(m[4]),
    minute: Number(m[5]),
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
