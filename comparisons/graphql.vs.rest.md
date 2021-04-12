# GraphQL vs REST API

## Pros for GraphQL

1) Condensed response bodies
2) Loose coupling of client + server
3) Aggregated HTTP requests
4) strong typing
5) Autotype generation tools
6) fragments
7) subscriptions
8) Persisted queries

## Cons for GraphQL

1) Bloated endpoints
2) Partial data failures
3) performance issues with overly nested queries
4) Schema changes can hurt

## Pros of REST

1) More optimized HTTP caching
   * Freshness and Validation (cache-control and ETag)
2) Better error handling
3) File uploads

## Cons of REST

1) N+1 request problem
2) Versioning
3) Over Fetching
4) Coupled client + server