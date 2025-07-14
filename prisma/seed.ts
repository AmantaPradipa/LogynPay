import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash('123456', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@mail.com' },
    update: {},
    create: {
      email: 'demo@mail.com',
      password: hashedPassword,
    },
  })

  console.log('Demo user created:', user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })