const { buildSchema, Source } = require('graphql');

const source = new Source(/* GraphQL */`
schema {
  query: Query
  mutation: Mutation
}

type Query {
  load(feed: String!): String!
  rss(user: String!): [[String!]!]!
}

type Mutation {
  addOrCreateFeed(user: String!, feed: String!, feedName: String!): FeedUpdateResponse!
}

type FeedUpdateResponse {
  success: Boolean!
  message: String
}

`, `.mesh/sources/Rss/schema.graphql`);

module.exports = buildSchema(source, {
  assumeValid: true,
  assumeValidSDL: true
});