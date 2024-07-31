import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
    // const user = await prisma.user.create({
    //     data:{
    //         name: 'dim hole',
    //         email: 'dmitrov@prisma.com',
    //         password: 'password',
    //         tasks: {
    //             create: {
    //                 title: "first task",
    //                 description: "create a new task"
    //             }
    //         }
    //     }
    // })

    // console.log(user);
    
    // const users = await prisma.user.findMany();
    // console.log(users);

    // const allUsers = await prisma.user.findMany({
    //     include: {
    //         tasks: true
    //     }
    // })
    
    
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