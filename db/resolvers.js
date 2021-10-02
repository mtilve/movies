const User = require("../Models/User");
const Movie = require("../Models/Movie");
const Actor = require("../Models/Actor");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const crateToken = (user, secret, expiresIn) => {
  const { id, name, lastname, email } = user;
  return jwt.sign({ id, name, lastname, email }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getMovies: async (_, { input }, ctx, info) => {
        try {
            const movies = await Movie.find({}).populate("actors");
            return movies;
        }
        catch(error)
        {
            console.log(error);
        }
    },
    getMovieById: async (_, { id }, ctx, info) => {
        try {
            const movie = await Movie.findById(id).populate("actors");
            if (!movie){
                throw new Error("Movie not found.");
            }
            return movie;

        }catch(error){
            console.log(error);
        }
    },
    getUser: async (_, { token }, ctx, info) => {
      const userId = await jwt.verify(token, process.env.SECRET);
      return userId;
    },
  },
  Mutation: {
      //////////////////////// User

    newUser: async (_, { input }, ctx, info) => {
      // check if the user is already register
      const { email, password } = input;
      const existUser = await User.findOne({ email });
      console.log(existUser);
      if (existUser) {
        throw new Error("User already exists.");
      }

      // hash password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      try {
        // save in database
        const user = new User(input);
        user.save();
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    authUser: async (_, { input }, ctx, info) => {
      const { email, password } = input;
      const existUser = await User.findOne({ email });
      console.log(existUser);
      if (!existUser) {
        throw new Error("User not exists.");
      }

      // validate password
      const validPassword = await bcryptjs.compare(
        password,
        existUser.password
      );
      if (!validPassword) {
        throw new Error("Password is not valid.");
      }

      // create JWT
      return {
        token: crateToken(existUser, process.env.SECRET, "24h"),
      };
    },
    ///////////////////// Movie
    newMovie: async (_, { input }, ctx, info) => {
        try{
            const movie = new Movie(input);
            const response = await movie.save();

            return response;

        }catch(error){
            console.log(error);
        }
    },
    updateMovie: async (_, { id,  input }, ctx, info) => {
        const movie = await Movie.findById(id);

        if (!movie){
            throw new Error(`Can't find movie ${id}`);
        }

        movie = await Movie.findOneAndUpdate({_id: id}, input, {new : true});

        return movie;
    },
    deleteMovie: async (_, { id }, ctx, info) => {
        const movie = Movie.findById(id);
        if (!movie){
            throw new Error(`Can't find movie ${id}`);
        }

        await Movie.findOneAndDelete({_id: id});
        return "Movie Deleted";
    },
    ///////////// Actor
    newActor: async (_, { input }, ctx, info) => {
        try{
            const actor = new Actor(input);
            const response = await actor.save();

            return response;

        }catch(error){
            console.log(error);
        }
    },
  },
};

module.exports = resolvers;
