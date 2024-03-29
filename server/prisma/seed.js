const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient()


async function main() {
    const users = [];
    for (let i = 0; i < 500; i++) {
      const email = faker.internet.email();
      const username = faker.internet.userName();
      const usertype = Math.random() < 0.5 ? 'Tutor' : 'Student';
      if (usertype === 'Tutor') {
        await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
              email,
              username,
              usertype,
              profile: {
                create: {
                  bio: faker.lorem.sentence(),
                  hourlyRate: generateRandomHourlyRate(),
                },
              }
            },
          });
      }

      const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          username,
          usertype
        },
      });
      users.push(user);
    }
    console.log('Users seeded successfully:', users);
}

function generateRandomHourlyRate() {
    return (Math.random() * (100 - 10) + 10).toFixed(2); 
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
