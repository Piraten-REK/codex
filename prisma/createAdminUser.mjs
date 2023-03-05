import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    username: 'admin',
    displayName: 'Administrator',
    email: 'admin@example.com',
    password: bcrypt.hashSync('password', 12),
    bio: 'Just your generic admin user',
    isAdmin: true
  }
})
  .then(() => console.log('Admin user created'))
  .catch(error => console.error(error))
  .finally(() => prisma.$disconnect())
