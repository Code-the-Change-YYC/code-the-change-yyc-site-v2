// src/app/about/timeline-query.ts
export const TIMELINE_QUERY = `
  query TimelineEntries {
    timelineCollection(order: year_ASC) {
      items {
        year
        description
        smallImage { url width height }
        largeImage { url width height }
      }
    }
  }
`;

export type TimelineEntry = {
  year: number;
  description: string | null;
  smallImage: { url: string; width: number; height: number } | null;
  largeImage: { url: string; width: number; height: number } | null;
};

export type TimelineResponse = {
  timelineCollection: { items: TimelineEntry[] };
};
