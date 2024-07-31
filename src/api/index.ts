import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
    // const user = await prisma.user.create({
    //     data:{
    //         name: 'tom hole',
    //         email: 'thomas@prisma.com',
    //         password: 'password',
    //     }
    // })

    // console.log(user);
    
    const users = await prisma.user.findMany();
    console.log(users);
    
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });