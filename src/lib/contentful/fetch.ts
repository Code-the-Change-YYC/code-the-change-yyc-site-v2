import "server-only";

/**
 * Transport for the Contentful GraphQL Content API.
 *
 * We query GraphQL over `fetch` rather than using the `contentful` JS SDK. The
 * reason is caching: Next's tagging (`next: { tags }`) only attaches to the
 * `fetch` primitive. The SDK wraps axios internally, so Next cannot see those
 * requests and every call would need `unstable_cache` to be cacheable at all.
 * Webhook-driven `revalidateTag` is the whole point of this layer.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

function endpoint(): string {
  const space = requireEnv("CONTENTFUL_SPACE_ID");
  const environment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";
  return `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${environment}`;
}

type GraphQLError = { message: string };

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLError[];
};

export type ContentfulFetchOptions = {
  /** The GraphQL document. */
  query: string;
  variables?: Record<string, unknown>;
  /**
   * Draft mode. When true we use the Preview token and skip the cache.
   *
   * Note: this alone is NOT enough to return drafts. The query itself must
   * also pass `preview: $preview` to the collection field, or Contentful
   * silently returns published entries and preview appears broken.
   */
  preview?: boolean;
  /** Cache tags for on-demand revalidation via /api/revalidate. */
  tags?: string[];
};

export async function contentfulFetch<TData>({
  query,
  variables = {},
  preview = false,
  tags = [],
}: ContentfulFetchOptions): Promise<TData> {
  const token = preview
    ? requireEnv("CONTENTFUL_PREVIEW_ACCESS_TOKEN")
    : requireEnv("CONTENTFUL_ACCESS_TOKEN");

  const response = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
    // `cache: "force-cache"` is REQUIRED and easy to forget. fetch has been
    // uncached by default since Next 15 (the Next 13/14 default flipped).
    // Omitting it silently makes every page hit the Contentful API on each
    // request and burns the CDA quota.
    ...(preview
      ? { cache: "no-store" as const }
      : { cache: "force-cache" as const, next: { tags } }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Contentful request failed: ${response.status} ${response.statusText} — ${body}`,
    );
  }

  const json = (await response.json()) as GraphQLResponse<TData>;

  // A GraphQL error still comes back as HTTP 200, so this check is not optional.
  if (json.errors?.length) {
    throw new Error(
      `Contentful GraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`,
    );
  }

  if (!json.data) {
    throw new Error("Contentful returned no data.");
  }

  return json.data;
}
