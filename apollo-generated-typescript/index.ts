const { ApolloServer, gql } = require('apollo-server')
import { Resolvers, Class } from './resolvers-types'

const typeDefs = gql`
  type Class {
    name: String
    students: [Student]
  }

  type Student {
    name: String
    SAT: Int
  }

  type Query {
    listAllClasses: [Class]
  }

  type Mutation {
    setFlavian(name: String, SAT: Int): Student
  }
`

const classes: Class[] = [
  {
    name: 'History 101',
    studentNames: ['Flavian'],
    students: function () {
      return (this.studentNames as string[]).map(
        (x) => students.filter((y) => y.name === x)[0]
      )
    },
  },
]

const students = [
  {
    name: 'Flavian',
    SAT: 99,
  },
]

const resolvers: Resolvers = {
  Query: {
    listAllClasses: () => classes,
  },
  Mutation: {
    setFlavian: (_, { name, SAT }) => (students[0] = { name, SAT }),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
