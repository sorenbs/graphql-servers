import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { createServer } from 'http'
import compression from 'compression'
import cors from 'cors'

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

const classes = [
  {
    name: 'History 101',
    studentNames: ['Flavian'],
    students: function () {
      return this.studentNames.map(
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

const resolvers = {
  Query: {
    listAllClasses: () => classes,
  },
  Mutation: {
    setFlavian: (_: any, { name, SAT }: { name: string; SAT: number }) =>
      (students[0] = { name, SAT }),
  },
}

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
app.use('*', cors())
app.use(compression())
server.applyMiddleware({ app, path: '/graphql' })
const httpServer = createServer(app)
httpServer.listen({ port: 3000 }, (): void =>
  console.log(
    `\n🚀      GraphQL is now running on http://localhost:3000/graphql`
  )
)
