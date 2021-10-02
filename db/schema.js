const {gql} = require('apollo-server');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Movie {
    id: ID!
    title: String
    poster: String
    date: String
    calification: Int
    actors: [ID]
  }

  type MovieResponse {
    id: ID!
    title: String
    poster: String
    date: String
    calification: Int
    actors: [Actor]
  }

  type Actor {
    id: ID!
    name: String
    lastname: String
    age: Int
    picture: String
    weight: Float
  }
 
  input ActorInput {
    name: String!
    lastname: String!
    age: Int
    picture: String
    weight: Float
  }

  input MovieInput {
    title: String
    poster: String
    date: String
    calification: Int
    actors: [ID]
  }

  type User {
      id: ID
      name: String
      lastname: String
      email: String
      created: String
  }

  type Token {
      token: String
  }

  input UserInput {
    name: String!
    lastname: String!
    email: String!
    password: String!
  }

  input AuthInput {
    email: String!
    password: String!  
  }

  type Mutation {
    # User
        newUser(input: UserInput): User
        authUser(input: AuthInput) : Token

    # Movie
        newMovie(input: MovieInput): Movie
        updateMovie(id: ID!, input: MovieInput): Movie
        deleteMovie(id: ID!): String

    # Actor
        newActor(input: ActorInput): Actor
  }

  type Query {
    # User  
    getUser(token: String!): User
   
    # Movie
    getMovies: [MovieResponse]
    getMovieById(id: ID): Movie

   
  }
`;


module.exports = typeDefs;