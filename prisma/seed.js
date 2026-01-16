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
  await prisma.seaweedPrices.deleteMany();

  const seaweedData = [
    {
      date: "2021-01-01T00:00:00.000Z",
      productionQuantity: 12,
      quality: 4, // Tinggi
      demand: 1, // Rendah
      price: 20000,
    },
    {
      date: "2021-01-02T00:00:00.000Z",
      productionQuantity: 15,
      quality: 3, // Sedang
      demand: 2, // Sedang
      price: 15000,
    },
    {
      date: "2021-01-03T00:00:00.000Z",
      productionQuantity: 10,
      quality: 5, // Sangat Tinggi
      demand: 1, // Rendah
      price: 24000,
    },
    {
      date: "2021-01-04T00:00:00.000Z",
      productionQuantity: 18,
      quality: 2, // Rendah
      demand: 2, // Sedang
      price: 12000,
    },
    {
      date: "2021-01-05T00:00:00.000Z",
      productionQuantity: 20,
      quality: 4, // Tinggi
      demand: 3, // Tinggi
      price: 24000,
    },
    {
      date: "2021-01-06T00:00:00.000Z",
      productionQuantity: 14,
      quality: 3, // Sedang
      demand: 1, // Rendah
      price: 15000,
    },
    {
      date: "2021-01-07T00:00:00.000Z",
      productionQuantity: 16,
      quality: 1, // Sangat Rendah
      demand: 1, // Rendah
      price: 11000,
    },
    {
      date: "2021-01-08T00:00:00.000Z",
      productionQuantity: 11,
      quality: 4, // Tinggi
      demand: 2, // Sedang
      price: 20000,
    },
    {
      date: "2021-01-09T00:00:00.000Z",
      productionQuantity: 22,
      quality: 3, // Sedang
      demand: 3, // Tinggi
      price: 20000,
    },
    {
      date: "2021-01-10T00:00:00.000Z",
      productionQuantity: 19,
      quality: 5, // Sangat Tinggi
      demand: 2, // Sedang
      price: 25000,
    },
    {
      date: "2021-01-11T00:00:00.000Z",
      productionQuantity: 13,
      quality: 2, // Rendah
      demand: 1, // Rendah
      price: 11000,
    },
    {
      date: "2021-01-12T00:00:00.000Z",
      productionQuantity: 17,
      quality: 4, // Tinggi
      demand: 3, // Tinggi
      price: 24000,
    },
    {
      date: "2022-01-01T00:00:00.000Z",
      productionQuantity: 21,
      quality: 5, // Sangat Tinggi
      demand: 2, // Sedang
      price: 25000,
    },
    {
      date: "2022-01-02T00:00:00.000Z",
      productionQuantity: 18,
      quality: 1, // Sangat Rendah
      demand: 1, // Rendah
      price: 11000,
    },
    {
      date: "2022-01-03T00:00:00.000Z",
      productionQuantity: 23,
      quality: 3, // Sedang
      demand: 3, // Tinggi
      price: 20000,
    },
    {
      date: "2022-01-04T00:00:00.000Z",
      productionQuantity: 20,
      quality: 4, // Tinggi
      demand: 3, // Tinggi
      price: 24000,
    },
    {
      date: "2022-01-05T00:00:00.000Z",
      productionQuantity: 16,
      quality: 3, // Sedang
      demand: 2, // Sedang
      price: 15000,
    },
    {
      date: "2022-01-06T00:00:00.000Z",
      productionQuantity: 14,
      quality: 4, // Tinggi
      demand: 1, // Rendah
      price: 20000,
    },
    {
      date: "2022-01-07T00:00:00.000Z",
      productionQuantity: 25,
      quality: 2, // Rendah
      demand: 3, // Tinggi
      price: 12000,
    },
    {
      date: "2022-01-08T00:00:00.000Z",
      productionQuantity: 22,
      quality: 5, // Sangat Tinggi
      demand: 3, // Tinggi
      price: 25000,
    },
    {
      date: "2022-01-09T00:00:00.000Z",
      productionQuantity: 19,
      quality: 3, // Sedang
      demand: 1, // Rendah
      price: 15000,
    },
    {
      date: "2022-01-10T00:00:00.000Z",
      productionQuantity: 24,
      quality: 4, // Tinggi
      demand: 3, // Tinggi
      price: 24000,
    },
    {
      date: "2022-01-11T00:00:00.000Z",
      productionQuantity: 17,
      quality: 1, // Sangat Rendah
      demand: 2, // Sedang
      price: 12000,
    },
    {
      date: "2022-01-12T00:00:00.000Z",
      productionQuantity: 26,
      quality: 3, // Sedang
      demand: 3, // Tinggi
      price: 20000,
    },
    {
      date: "2023-01-01T00:00:00.000Z",
      productionQuantity: 28,
      quality: 4, // Tinggi
      demand: 3, // Tinggi
      price: 24000,
    },
    {
      date: "2023-01-02T00:00:00.000Z",
      productionQuantity: 21,
      quality: 3, // Sedang
      demand: 1, // Rendah
      price: 15000,
    },
    {
      date: "2023-01-03T00:00:00.000Z",
      productionQuantity: 30,
      quality: 5, // Sangat Tinggi
      demand: 2, // Sedang
      price: 25000,
    },
    {
      date: "2023-01-04T00:00:00.000Z",
      productionQuantity: 27,
      quality: 2, // Rendah
      demand: 2, // Sedang
      price: 12000,
    },
    {
      date: "2023-01-05T00:00:00.000Z",
      productionQuantity: 24,
      quality: 3, // Sedang
      demand: 3, // Tinggi
      price: 20000,
    },
    {
      date: "2023-01-06T00:00:00.000Z",
      productionQuantity: 32,
      quality: 4, // Tinggi
      demand: 3, // Tinggi
      price: 24000,
    },
    {
      date: "2023-01-07T00:00:00.000Z",
      productionQuantity: 22,
      quality: 1, // Sangat Rendah
      demand: 1, // Rendah
      price: 11000,
    },
    {
      date: "2023-01-08T00:00:00.000Z",
      productionQuantity: 29,
      quality: 3, // Sedang
      demand: 2, // Sedang
      price: 15000,
    },
    {
      date: "2023-01-09T00:00:00.000Z",
      productionQuantity: 34,
      quality: 5, // Sangat Tinggi
      demand: 3, // Tinggi
      price: 25000,
    },
    {
      date: "2023-01-10T00:00:00.000Z",
      productionQuantity: 26,
      quality: 3, // Sedang
      demand: 1, // Rendah
      price: 15000,
    },
    {
      date: "2023-01-11T00:00:00.000Z",
      productionQuantity: 31,
      quality: 4, // Tinggi
      demand: 2, // Sedang
      price: 20000,
    },
    {
      date: "2023-01-12T00:00:00.000Z",
      productionQuantity: 28,
      quality: 2, // Rendah
      demand: 3, // Tinggi
      price: 12000,
    },
    {
      date: "2024-01-01T00:00:00.000Z",
      productionQuantity: 35,
      quality: 5, // Sangat Tinggi
      demand: 3, // Tinggi
      price: 25000,
    },
    {
      date: "2024-01-02T00:00:00.000Z",
      productionQuantity: 30,
      quality: 3, // Sedang
      demand: 2, // Sedang
      price: 15000,
    },
    {
      date: "2024-01-03T00:00:00.000Z",
      productionQuantity: 33,
      quality: 3, // Sedang
      demand: 2, // Sedang
      price: 12000,
    },
    {
      date: "2024-01-04T00:00:00.000Z",
      productionQuantity: 38,
      quality: 4, // Tinggi
      demand: 3, // Tinggi
      price: 24000,
    },
    {
      date: "2024-01-05T00:00:00.000Z",
      productionQuantity: 27,
      quality: 3, // Sedang
      demand: 1, // Rendah
      price: 15000,
    },
    {
      date: "2024-01-06T00:00:00.000Z",
      productionQuantity: 36,
      quality: 5, // Sangat Tinggi
      demand: 2, // Sedang
      price: 25000,
    },
    {
      date: "2024-01-07T00:00:00.000Z",
      productionQuantity: 29,
      quality: 1, // Sangat Rendah
      demand: 1, // Rendah
      price: 11000,
    },
    {
      date: "2024-01-08T00:00:00.000Z",
      productionQuantity: 40,
      quality: 4, // Tinggi
      demand: 3, // Tinggi
      price: 24000,
    },
    {
      date: "2024-01-09T00:00:00.000Z",
      productionQuantity: 34,
      quality: 3, // Sedang
      demand: 3, // Tinggi
      price: 20000,
    },
    {
      date: "2024-01-10T00:00:00.000Z",
      productionQuantity: 31,
      quality: 2, // Rendah
      demand: 2, // Sedang
      price: 12000,
    },
    {
      date: "2024-01-11T00:00:00.000Z",
      productionQuantity: 37,
      quality: 4, // Tinggi
      demand: 2, // Sedang
      price: 20000,
    },
    {
      date: "2024-01-12T00:00:00.000Z",
      productionQuantity: 32,
      quality: 3, // Sedang
      demand: 1, // Rendah
      price: 15000,
    },
    {
      date: "2025-01-01T00:00:00.000Z",
      productionQuantity: 42,
      quality: 5, // Sangat Tinggi
      demand: 3, // Tinggi
      price: 25000,
    },
    {
      date: "2025-01-02T00:00:00.000Z",
      productionQuantity: 35,
      quality: 3, // Sedang
      demand: 2, // Sedang
      price: 15000,
    },
    {
      date: "2025-01-03T00:00:00.000Z",
      productionQuantity: 39,
      quality: 2, // Rendah
      demand: 2, // Sedang
      price: 12000,
    },
    {
      date: "2025-01-04T00:00:00.000Z",
      productionQuantity: 45,
      quality: 4, // Tinggi
      demand: 3, // Tinggi
      price: 24000,
    },
    {
      date: "2025-01-05T00:00:00.000Z",
      productionQuantity: 33,
      quality: 3, // Sedang
      demand: 1, // Rendah
      price: 15000,
    },
    {
      date: "2025-01-06T00:00:00.000Z",
      productionQuantity: 41,
      quality: 5, // Sangat Tinggi
      demand: 2, // Sedang
      price: 24500,
    },
    {
      date: "2025-01-07T00:00:00.000Z",
      productionQuantity: 36,
      quality: 1, // Sangat Rendah
      demand: 1, // Rendah
      price: 11000,
    },
    {
      date: "2025-01-08T00:00:00.000Z",
      productionQuantity: 48,
      quality: 4, // Tinggi
      demand: 3, // Tinggi
      price: 24000,
    },
    {
      date: "2025-01-09T00:00:00.000Z",
      productionQuantity: 38,
      quality: 3, // Sedang
      demand: 3, // Tinggi
      price: 20000,
    },
    {
      date: "2025-01-10T00:00:00.000Z",
      productionQuantity: 44,
      quality: 2, // Rendah
      demand: 2, // Sedang
      price: 12000,
    },
    {
      date: "2025-01-11T00:00:00.000Z",
      productionQuantity: 40,
      quality: 4, // Tinggi
      demand: 2, // Sedang
      price: 20000,
    },
    {
      date: "2025-01-12T00:00:00.000Z",
      productionQuantity: 46,
      quality: 5, // Sangat Tinggi
      demand: 3, // Tinggi
      price: 25000,
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
