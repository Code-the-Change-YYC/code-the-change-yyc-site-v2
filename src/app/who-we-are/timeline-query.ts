export const TIMELINE_QUERY = `
  query TimelineEntries {
    timelineCollection(order: year_ASC) {
      items {
        sys { id }
        year
        description
        smallImage { url }
        largeImage { url }
      }
    }
  }
`;

export type TimelineEntry = {
  sys: { id: string };
  year: number;
  description: string | null;
  smallImage: { url: string } | null;
  largeImage: { url: string } | null;
};

export type TimelineResponse = {
  timelineCollection: { items: TimelineEntry[] };
};
