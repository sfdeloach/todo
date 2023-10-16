// TODO: import necessary libraries to make calls to db
const { todos, roles, sessions, users } = require('./dummyData');

const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql');

const SessionType = new GraphQLObjectType({
  name: 'Session',
  fields: () => ({
    _id: { type: GraphQLID },
    user_id: { type: GraphQLInt },
    user: {
      type: UserType,
      // TODO: convert resolve to an async call to db
      resolve: (parent, args) => users.find(user => user._id === parent.user_id)
    },
    expires: { type: GraphQLString }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    role_id: { type: GraphQLString },
    role: {
      type: RoleType,
      // TODO: convert resolve to an async call to db
      resolve: (parent, args) => roles.find(role => role._id === parent.role_id)
    },
    isActive: { type: GraphQLBoolean },
    isHidden: { type: GraphQLBoolean },
    name_first: { type: GraphQLString },
    name_last: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const RoleType = new GraphQLObjectType({
  name: 'Role',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    sessions: {
      type: new GraphQLList(SessionType),
      resolve: (parent, args) => sessions
    },
    session: {
      type: SessionType,
      args: { _id: { type: GraphQLID } },
      resolve: (parent, args) => sessions.find(session => session._id === args._id)
    }
    // book: {
    //   type: BookType,
    //   args: { _id: { type: GraphQLID } },
    //   resolve: async (parent, args) => {
    //     let result = await db.collection('books').findOne({ _id: new ObjectId(args._id) });
    //     console.log(`[${new Date().toLocaleTimeString()}] query book`);
    //     return result;
    //   }
    // },
    // author: {
    //   type: AuthorType,
    //   args: { _id: { type: GraphQLID } },
    //   resolve: async (parent, args) => {
    //     let result = await db.collection('authors').findOne({ _id: new ObjectId(args._id) });
    //     console.log(`[${new Date().toLocaleTimeString()}] query author`);
    //     return result;
    //   }
    // },
    // books: {
    //   type: new GraphQLList(BookType),
    //   resolve: async (parent, args) => {
    //     let result = await db.collection('books').find({}).toArray();
    //     console.log(`[${new Date().toLocaleTimeString()}] query all books`);
    //     return result;
    //   }
    // },
    // authors: {
    //   type: new GraphQLList(AuthorType),
    //   resolve: async (parent, args) => {
    //     let result = await db.collection('authors').find({}).toArray();
    //     console.log(`[${new Date().toLocaleTimeString()}] query all authors`);
    //     return result;
    //   }
    // }
  }
});

// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addAuthor: {
//       type: AuthorType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         age: { type: GraphQLInt }
//       },
//       resolve: async (parent, args) => {
//         let collection = db.collection('authors');
//         let newDocument = { name: args.name, age: args.age };
//         let result = await collection.insertOne(newDocument);

//         if (!result.acknowledged) {
//           console.error(result);
//           return result;
//         }

//         console.log(`[${new Date().toLocaleTimeString()}] added author`);
//         return await collection.findOne({ _id: result.insertedId });
//       }
//     },
//     addBook: {
//       type: BookType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         genre: { type: new GraphQLNonNull(GraphQLString) },
//         author_id: { type: new GraphQLNonNull(GraphQLID) }
//       },
//       resolve: async (parent, args) => {
//         let collection = db.collection('books');
//         let newDocument = { name: args.name, genre: args.genre, author_id: args.author_id };
//         let result = await collection.insertOne(newDocument);

//         if (!result.acknowledged) {
//           console.error(result);
//           return result;
//         }

//         console.log(`[${new Date().toLocaleTimeString()}] added book`);
//         return await collection.findOne({ _id: result.insertedId });
//       }
//     }
//     // TODO: update, and delete, (insertMany and deleteAll for testing)
//   }
// });

module.exports = {
  schema: new GraphQLSchema({
    query: RootQuery
    // mutation: Mutation
  })
};
