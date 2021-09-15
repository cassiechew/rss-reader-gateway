const { buildSchema, Source } = require('graphql');

const source = new Source(/* GraphQL */`
schema {
  query: Query
  mutation: Mutation
}

type Query {
  login(password: String!, username: String!): LoginResponse!
}

type LoginResponse {
  success: Boolean!
  message: String
}

type Mutation {
  addOrCreateUser(email: String!, lastName: String!, firstName: String!, password: String!, username: String!): UserResponse!
}

type UserResponse {
  success: Boolean!
  message: String
  user: User
}

type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
}

`, `.mesh/sources/Login/schema.graphql`);

module.exports = buildSchema(source, {
  assumeValid: true,
  assumeValidSDL: true
});