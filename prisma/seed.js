const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function createAdmin() {
  console.log("Seeding admin...");
  const defaultAdmin = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    name: process.env.ADMIN_NAME,
  };
  const existingAdmin = await prisma.admin.findFirst({
    where: { username: defaultAdmin.username },
  });
  if (!existingAdmin) {
    const hashedPassword = await hash(defaultAdmin.password, 10);
    await prisma.admin.create({
      data: {
        username: defaultAdmin.username,
        password: hashedPassword,
        name: defaultAdmin.name,
      },
    });
    console.log("Admin seeded successfully!");
  } else {
    console.log("Admin already exists. Skipping seeding.");
  }
}

async function createSeaweedPrices() {
  console.log("Seeding seaweed prices...");

  const existingData = await prisma.seaweedPrices.findFirst();
  if (existingData) {
    console.log("Seaweed prices data already exists. Skipping seeding.");
    return;
  }

  const seaweedData = [
    {
      date: "2025-07-01T00:00:00.000Z",
      productionQuantity: 9,
      quality: 4,
      demand: 3,
      price: 153000,
    },
    {
      date: "2025-07-02T00:00:00.000Z",
      productionQuantity: 7,
      quality: 3,
      demand: 2,
      price: 105000,
    },
    {
      date: "2025-07-03T00:00:00.000Z",
      productionQuantity: 11,
      quality: 2,
      demand: 1,
      price: 143000,
    },
    {
      date: "2025-07-04T00:00:00.000Z",
      productionQuantity: 10,
      quality: 5,
      demand: 3,
      price: 190000,
    },
    {
      date: "2025-07-05T00:00:00.000Z",
      productionQuantity: 20,
      quality: 2,
      demand: 1,
      price: 260000,
    },
    {
      date: "2025-07-06T00:00:00.000Z",
      productionQuantity: 5,
      quality: 1,
      demand: 1,
      price: 56000,
    },
    {
      date: "2025-07-07T00:00:00.000Z",
      productionQuantity: 12,
      quality: 3,
      demand: 2,
      price: 160000,
    },
    {
      date: "2025-07-08T00:00:00.000Z",
      productionQuantity: 15,
      quality: 5,
      demand: 3,
      price: 285000,
    },
    {
      date: "2025-07-09T00:00:00.000Z",
      productionQuantity: 25,
      quality: 2,
      demand: 3,
      price: 325000,
    },
    {
      date: "2025-07-10T00:00:00.000Z",
      productionQuantity: 9,
      quality: 4,
      demand: 3,
      price: 153000,
    },
    {
      date: "2025-07-11T00:00:00.000Z",
      productionQuantity: 30,
      quality: 1,
      demand: 2,
      price: 330000,
    },
    {
      date: "2025-07-12T00:00:00.000Z",
      productionQuantity: 8,
      quality: 1,
      demand: 1,
      price: 88000,
    },
    {
      date: "2025-07-13T00:00:00.000Z",
      productionQuantity: 11,
      quality: 3,
      demand: 2,
      price: 165000,
    },
    {
      date: "2025-07-14T00:00:00.000Z",
      productionQuantity: 13,
      quality: 5,
      demand: 2,
      price: 247000,
    },
    {
      date: "2025-07-15T00:00:00.000Z",
      productionQuantity: 15,
      quality: 2,
      demand: 1,
      price: 195000,
    },
    {
      date: "2025-07-16T00:00:00.000Z",
      productionQuantity: 17,
      quality: 4,
      demand: 3,
      price: 289000,
    },
    {
      date: "2025-07-17T00:00:00.000Z",
      productionQuantity: 30,
      quality: 5,
      demand: 2,
      price: 570000,
    },
    {
      date: "2025-07-18T00:00:00.000Z",
      productionQuantity: 25,
      quality: 1,
      demand: 1,
      price: 275000,
    },
    {
      date: "2025-07-19T00:00:00.000Z",
      productionQuantity: 10,
      quality: 3,
      demand: 2,
      price: 158000,
    },
    {
      date: "2025-07-20T00:00:00.000Z",
      productionQuantity: 16,
      quality: 2,
      demand: 1,
      price: 208000,
    },
    {
      date: "2025-07-21T00:00:00.000Z",
      productionQuantity: 9,
      quality: 2,
      demand: 3,
      price: 117000,
    },
    {
      date: "2025-07-22T00:00:00.000Z",
      productionQuantity: 5,
      quality: 4,
      demand: 3,
      price: 225000,
    },
    {
      date: "2025-07-23T00:00:00.000Z",
      productionQuantity: 25,
      quality: 3,
      demand: 2,
      price: 375000,
    },
    {
      date: "2025-07-24T00:00:00.000Z",
      productionQuantity: 20,
      quality: 5,
      demand: 3,
      price: 380000,
    },
    {
      date: "2025-07-25T00:00:00.000Z",
      productionQuantity: 18,
      quality: 5,
      demand: 3,
      price: 342600,
    },
    {
      date: "2025-07-26T00:00:00.000Z",
      productionQuantity: 13,
      quality: 5,
      demand: 3,
      price: 247000,
    },
    {
      date: "2025-07-27T00:00:00.000Z",
      productionQuantity: 18,
      quality: 4,
      demand: 3,
      price: 306000,
    },
    {
      date: "2025-07-28T00:00:00.000Z",
      productionQuantity: 19,
      quality: 2,
      demand: 1,
      price: 247000,
    },
    {
      date: "2025-07-29T00:00:00.000Z",
      productionQuantity: 17,
      quality: 3,
      demand: 2,
      price: 255000,
    },
    {
      date: "2025-07-30T00:00:00.000Z",
      productionQuantity: 10,
      quality: 5,
      demand: 3,
      price: 190000,
    },
    {
      date: "2025-08-01T00:00:00.000Z",
      productionQuantity: 15,
      quality: 2,
      demand: 3,
      price: 195000,
    },
    {
      date: "2025-08-02T00:00:00.000Z",
      productionQuantity: 9,
      quality: 1,
      demand: 2,
      price: 99000,
    },
    {
      date: "2025-08-03T00:00:00.000Z",
      productionQuantity: 8,
      quality: 1,
      demand: 1,
      price: 88000,
    },
    {
      date: "2025-08-04T00:00:00.000Z",
      productionQuantity: 11,
      quality: 5,
      demand: 2,
      price: 209000,
    },
    {
      date: "2025-08-05T00:00:00.000Z",
      productionQuantity: 7,
      quality: 4,
      demand: 3,
      price: 119000,
    },
    {
      date: "2025-08-06T00:00:00.000Z",
      productionQuantity: 20,
      quality: 3,
      demand: 2,
      price: 300000,
    },
    {
      date: "2025-08-07T00:00:00.000Z",
      productionQuantity: 18,
      quality: 1,
      demand: 1,
      price: 198000,
    },
    {
      date: "2025-08-08T00:00:00.000Z",
      productionQuantity: 10,
      quality: 5,
      demand: 3,
      price: 190000,
    },
    {
      date: "2025-08-09T00:00:00.000Z",
      productionQuantity: 32,
      quality: 5,
      demand: 3,
      price: 608000,
    },
    {
      date: "2025-08-10T00:00:00.000Z",
      productionQuantity: 25,
      quality: 4,
      demand: 3,
      price: 425000,
    },
    {
      date: "2025-08-11T00:00:00.000Z",
      productionQuantity: 7,
      quality: 1,
      demand: 1,
      price: 77000,
    },
    {
      date: "2025-08-12T00:00:00.000Z",
      productionQuantity: 9,
      quality: 3,
      demand: 2,
      price: 135000,
    },
    {
      date: "2025-08-13T00:00:00.000Z",
      productionQuantity: 8,
      quality: 2,
      demand: 1,
      price: 104000,
    },
    {
      date: "2025-08-14T00:00:00.000Z",
      productionQuantity: 6,
      quality: 4,
      demand: 3,
      price: 85000,
    },
    {
      date: "2025-08-15T00:00:00.000Z",
      productionQuantity: 13,
      quality: 1,
      demand: 2,
      price: 143000,
    },
    {
      date: "2025-08-16T00:00:00.000Z",
      productionQuantity: 11,
      quality: 3,
      demand: 2,
      price: 165000,
    },
    {
      date: "2025-08-17T00:00:00.000Z",
      productionQuantity: 30,
      quality: 4,
      demand: 3,
      price: 510000,
    },
    {
      date: "2025-08-18T00:00:00.000Z",
      productionQuantity: 18,
      quality: 1,
      demand: 1,
      price: 198000,
    },
    {
      date: "2025-08-19T00:00:00.000Z",
      productionQuantity: 40,
      quality: 5,
      demand: 3,
      price: 760000,
    },
    {
      date: "2025-08-20T00:00:00.000Z",
      productionQuantity: 5,
      quality: 1,
      demand: 1,
      price: 55000,
    },
    {
      date: "2025-08-21T00:00:00.000Z",
      productionQuantity: 10,
      quality: 5,
      demand: 3,
      price: 190000,
    },
    {
      date: "2025-08-22T00:00:00.000Z",
      productionQuantity: 11,
      quality: 5,
      demand: 3,
      price: 209000,
    },
    {
      date: "2025-08-23T00:00:00.000Z",
      productionQuantity: 6,
      quality: 5,
      demand: 3,
      price: 114000,
    },
    {
      date: "2025-08-24T00:00:00.000Z",
      productionQuantity: 12,
      quality: 5,
      demand: 3,
      price: 228000,
    },
    {
      date: "2025-08-25T00:00:00.000Z",
      productionQuantity: 15,
      quality: 2,
      demand: 1,
      price: 195000,
    },
    {
      date: "2025-08-26T00:00:00.000Z",
      productionQuantity: 17,
      quality: 5,
      demand: 3,
      price: 323000,
    },
    {
      date: "2025-08-27T00:00:00.000Z",
      productionQuantity: 5,
      quality: 5,
      demand: 3,
      price: 95000,
    },
    {
      date: "2025-08-28T00:00:00.000Z",
      productionQuantity: 17,
      quality: 5,
      demand: 3,
      price: 323000,
    },
    {
      date: "2025-08-29T00:00:00.000Z",
      productionQuantity: 9,
      quality: 1,
      demand: 1,
      price: 99000,
    },
    {
      date: "2025-08-30T00:00:00.000Z",
      productionQuantity: 18,
      quality: 3,
      demand: 2,
      price: 270000,
    },
    {
      date: "2025-09-01T00:00:00.000Z",
      productionQuantity: 10,
      quality: 2,
      demand: 1,
      price: 130000,
    },
    {
      date: "2025-09-02T00:00:00.000Z",
      productionQuantity: 25,
      quality: 2,
      demand: 3,
      price: 325000,
    },
    {
      date: "2025-09-03T00:00:00.000Z",
      productionQuantity: 7,
      quality: 4,
      demand: 3,
      price: 119000,
    },
    {
      date: "2025-09-04T00:00:00.000Z",
      productionQuantity: 11,
      quality: 1,
      demand: 1,
      price: 121000,
    },
    {
      date: "2025-09-05T00:00:00.000Z",
      productionQuantity: 13,
      quality: 5,
      demand: 2,
      price: 247000,
    },
    {
      date: "2025-09-06T00:00:00.000Z",
      productionQuantity: 15,
      quality: 5,
      demand: 3,
      price: 285000,
    },
    {
      date: "2025-09-07T00:00:00.000Z",
      productionQuantity: 40,
      quality: 2,
      demand: 1,
      price: 520000,
    },
    {
      date: "2025-09-08T00:00:00.000Z",
      productionQuantity: 6,
      quality: 1,
      demand: 1,
      price: 66000,
    },
    {
      date: "2025-09-09T00:00:00.000Z",
      productionQuantity: 8,
      quality: 1,
      demand: 1,
      price: 88000,
    },
    {
      date: "2025-09-10T00:00:00.000Z",
      productionQuantity: 12,
      quality: 4,
      demand: 3,
      price: 204000,
    },
    {
      date: "2025-09-11T00:00:00.000Z",
      productionQuantity: 14,
      quality: 4,
      demand: 3,
      price: 238000,
    },
    {
      date: "2025-09-12T00:00:00.000Z",
      productionQuantity: 17,
      quality: 5,
      demand: 3,
      price: 323000,
    },
    {
      date: "2025-09-13T00:00:00.000Z",
      productionQuantity: 20,
      quality: 3,
      demand: 2,
      price: 300000,
    },
    {
      date: "2025-09-14T00:00:00.000Z",
      productionQuantity: 25,
      quality: 4,
      demand: 3,
      price: 425000,
    },
    {
      date: "2025-09-15T00:00:00.000Z",
      productionQuantity: 19,
      quality: 1,
      demand: 1,
      price: 209000,
    },
    {
      date: "2025-09-16T00:00:00.000Z",
      productionQuantity: 6,
      quality: 5,
      demand: 2,
      price: 114000,
    },
    {
      date: "2025-09-17T00:00:00.000Z",
      productionQuantity: 9,
      quality: 5,
      demand: 3,
      price: 171000,
    },
    {
      date: "2025-09-18T00:00:00.000Z",
      productionQuantity: 10,
      quality: 1,
      demand: 1,
      price: 110000,
    },
    {
      date: "2025-09-19T00:00:00.000Z",
      productionQuantity: 30,
      quality: 4,
      demand: 3,
      price: 510000,
    },
    {
      date: "2025-09-20T00:00:00.000Z",
      productionQuantity: 16,
      quality: 5,
      demand: 3,
      price: 304000,
    },
    {
      date: "2025-09-21T00:00:00.000Z",
      productionQuantity: 18,
      quality: 5,
      demand: 3,
      price: 342000,
    },
    {
      date: "2025-09-22T00:00:00.000Z",
      productionQuantity: 21,
      quality: 5,
      demand: 3,
      price: 399000,
    },
    {
      date: "2025-09-23T00:00:00.000Z",
      productionQuantity: 23,
      quality: 4,
      demand: 3,
      price: 391000,
    },
    {
      date: "2025-09-24T00:00:00.000Z",
      productionQuantity: 11,
      quality: 5,
      demand: 3,
      price: 209000,
    },
    {
      date: "2025-09-25T00:00:00.000Z",
      productionQuantity: 7,
      quality: 5,
      demand: 3,
      price: 133000,
    },
    {
      date: "2025-09-26T00:00:00.000Z",
      productionQuantity: 11,
      quality: 1,
      demand: 1,
      price: 121000,
    },
    {
      date: "2025-09-27T00:00:00.000Z",
      productionQuantity: 40,
      quality: 1,
      demand: 2,
      price: 440000,
    },
    {
      date: "2025-09-28T00:00:00.000Z",
      productionQuantity: 6,
      quality: 1,
      demand: 1,
      price: 66000,
    },
    {
      date: "2025-09-29T00:00:00.000Z",
      productionQuantity: 12,
      quality: 2,
      demand: 1,
      price: 156000,
    },
    {
      date: "2025-09-30T00:00:00.000Z",
      productionQuantity: 20,
      quality: 5,
      demand: 3,
      price: 380000,
    },
  ];

  const formattedData = seaweedData.map((item) => ({
    ...item,
    date: new Date(item.date),
  }));

  await prisma.seaweedPrices.createMany({
    data: formattedData,
  });

  console.log(
    `Seeded ${seaweedData.length} seaweed price records successfully!`
  );
}

async function main() {
  await createAdmin();
  await createSeaweedPrices();

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
