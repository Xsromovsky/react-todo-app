
import { PrismaClient } from '@prisma/client';
import express from 'express';


const app = express()
const port = process.env.PORT || 3100
const prisma = new PrismaClient()
const jwtSecret = process.env.JWT_SECRET || "secretkey"

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/api/users', async (req, res) => {
//   // const users = await prisma.user.findMany();
//   // res.send(users)
//   const allUsers = await prisma.user.findMany({
//     include: {
//       tasks: true
//     }
//   })
//   res.send(allUsers)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
