
import { PrismaClient } from '@prisma/client';
import express from 'express';
import dotenv from 'dotenv'


const app = express()
const port = process.env.PORT || 3100
const prisma = new PrismaClient()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/users',async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
