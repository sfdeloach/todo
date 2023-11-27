// TODO: import necessary libraries to make calls to db
const crypto = require('crypto');
let { todos, roles, users } = require('./dummyData');

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

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    _id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    user: {
      type: UserType,
      // TODO: convert to an async call to db
      resolve: (parent, args) => users.find(user => user._id === parent.user_id)
    },
    position: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    isHidden: { type: GraphQLBoolean },
    text: { type: GraphQLString }
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
    todos: {
      type: new GraphQLList(TodoType),
      // TODO: convert resolve to an async call to db
      resolve: (parent, args) =>
        todos.filter(todo => todo.user_id === parent._id)
    },
    isActive: { type: GraphQLBoolean },
    isHidden: { type: GraphQLBoolean },
    name_first: { type: GraphQLString },
    name_last: { type: GraphQLString },
    username: { type: GraphQLString },
    hash: { type: GraphQLString }
  })
});

const RoleType = new GraphQLObjectType({
  name: 'Role',
  fields: () => ({
    _id: { type: GraphQLID },
    authLevel: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      // TODO: convert resolve to an async call to db
      resolve: (parent, args) =>
        users.filter(user => user.role_id === parent._id)
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: (parent, args) => users
    },
    user: {
      type: UserType,
      args: { _id: { type: GraphQLID } },
      resolve: (parent, args) =>
        users.find(user => user._id === parseInt(args._id))
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: (parent, args) => todos
    },
    todo: {
      type: TodoType,
      args: { _id: { type: GraphQLID } },
      resolve: (parent, args) =>
        todos.find(todo => todo._id === parseInt(args._id))
    },
    roles: {
      type: new GraphQLList(RoleType),
      resolve: (parent, args) => roles
    },
    role: {
      type: RoleType,
      args: { _id: { type: GraphQLID } },
      resolve: (parent, args) =>
        roles.find(role => role._id === parseInt(args._id))
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: new GraphQLList(TodoType),
      args: {
        user_id: { type: GraphQLString },
        text: { type: GraphQLString }
      },
      // TODO: convert to an async call to db
      resolve: (parent, args) => {
        // iterate thru todos, find next position
        const nextPosition = todos.reduce((previous, nextTodo) => {
          if (nextTodo.user_id !== parseInt(args.user_id)) {
            return previous;
          }

          return previous < nextTodo.position ? nextTodo.position : previous;
        }, 0);

        // create new todo
        const newTodo = {
          _id: crypto.randomUUID(),
          user_id: parseInt(args.user_id),
          position: nextPosition + 1,
          isActive: true,
          isHidden: false,
          text: args.text
        };

        todos.push(newTodo);

        return todos;
      }
    },
    updateTodo: {
      type: new GraphQLList(TodoType),
      args: {
        _id: { type: GraphQLString },
        action: { type: GraphQLString },
        text: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        // toggle the intended _id
        const index = todos.findIndex(todo => todo._id === args._id);

        switch (args.action) {
          case 'check':
            todos[index].isActive = !todos[index].isActive;
            break;
          case 'edit':
            todos[index].text = args.text;
            break;
          case 'hide':
            todos[index].isHidden = true;
            break;
          default:
            throw new Error(`action "${args.action}" is not recognized`);
        }

        return todos;
      }
    }
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
    query: RootQuery,
    mutation: Mutation
  })
};
