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
    // Juli 2025
    {
      date: "2025-07-01",
      productionQuantity: 9,
      quality: 4,
      demand: 3,
      price: 153000,
    },
    {
      date: "2025-07-02",
      productionQuantity: 7,
      quality: 3,
      demand: 2,
      price: 105000,
    },
    {
      date: "2025-07-03",
      productionQuantity: 11,
      quality: 2,
      demand: 1,
      price: 143000,
    },
    {
      date: "2025-07-04",
      productionQuantity: 10,
      quality: 5,
      demand: 3,
      price: 190000,
    },
    {
      date: "2025-07-05",
      productionQuantity: 20,
      quality: 2,
      demand: 1,
      price: 260000,
    },
    {
      date: "2025-07-06",
      productionQuantity: 5,
      quality: 1,
      demand: 1,
      price: 56000,
    },
    {
      date: "2025-07-07",
      productionQuantity: 12,
      quality: 3,
      demand: 2,
      price: 160000,
    },
    {
      date: "2025-07-08",
      productionQuantity: 15,
      quality: 5,
      demand: 3,
      price: 285000,
    },
    {
      date: "2025-07-09",
      productionQuantity: 25,
      quality: 2,
      demand: 3,
      price: 325000,
    },
    {
      date: "2025-07-10",
      productionQuantity: 9,
      quality: 4,
      demand: 3,
      price: 153000,
    },
    {
      date: "2025-07-11",
      productionQuantity: 30,
      quality: 1,
      demand: 2,
      price: 330000,
    },
    {
      date: "2025-07-12",
      productionQuantity: 8,
      quality: 1,
      demand: 1,
      price: 88000,
    },
    {
      date: "2025-07-13",
      productionQuantity: 11,
      quality: 3,
      demand: 2,
      price: 165000,
    },
    {
      date: "2025-07-14",
      productionQuantity: 13,
      quality: 5,
      demand: 2,
      price: 247000,
    },
    {
      date: "2025-07-15",
      productionQuantity: 15,
      quality: 2,
      demand: 1,
      price: 195000,
    },
    {
      date: "2025-07-16",
      productionQuantity: 17,
      quality: 4,
      demand: 3,
      price: 289000,
    },
    {
      date: "2025-07-17",
      productionQuantity: 30,
      quality: 5,
      demand: 2,
      price: 570000,
    },
    {
      date: "2025-07-18",
      productionQuantity: 25,
      quality: 1,
      demand: 1,
      price: 275000,
    },
    {
      date: "2025-07-19",
      productionQuantity: 10,
      quality: 3,
      demand: 2,
      price: 158000,
    },
    {
      date: "2025-07-20",
      productionQuantity: 16,
      quality: 2,
      demand: 1,
      price: 208000,
    },
    {
      date: "2025-07-21",
      productionQuantity: 9,
      quality: 2,
      demand: 3,
      price: 117000,
    },
    {
      date: "2025-07-22",
      productionQuantity: 5,
      quality: 4,
      demand: 3,
      price: 225000,
    },
    {
      date: "2025-07-23",
      productionQuantity: 25,
      quality: 3,
      demand: 2,
      price: 375000,
    },
    {
      date: "2025-07-24",
      productionQuantity: 20,
      quality: 5,
      demand: 3,
      price: 380000,
    },
    {
      date: "2025-07-25",
      productionQuantity: 18,
      quality: 5,
      demand: 3,
      price: 342600,
    },
    {
      date: "2025-07-26",
      productionQuantity: 13,
      quality: 5,
      demand: 3,
      price: 247000,
    },
    {
      date: "2025-07-27",
      productionQuantity: 18,
      quality: 4,
      demand: 3,
      price: 306000,
    },
    {
      date: "2025-07-28",
      productionQuantity: 19,
      quality: 2,
      demand: 1,
      price: 247000,
    },
    {
      date: "2025-07-29",
      productionQuantity: 17,
      quality: 3,
      demand: 2,
      price: 255000,
    },
    {
      date: "2025-07-30",
      productionQuantity: 10,
      quality: 5,
      demand: 3,
      price: 190000,
    },

    // Agustus 2025
    {
      date: "2025-08-01",
      productionQuantity: 15,
      quality: 2,
      demand: 3,
      price: 195000,
    },
    {
      date: "2025-08-02",
      productionQuantity: 9,
      quality: 1,
      demand: 2,
      price: 99000,
    },
    {
      date: "2025-08-03",
      productionQuantity: 8,
      quality: 1,
      demand: 1,
      price: 88000,
    },
    {
      date: "2025-08-04",
      productionQuantity: 11,
      quality: 5,
      demand: 2,
      price: 209000,
    },
    {
      date: "2025-08-05",
      productionQuantity: 7,
      quality: 4,
      demand: 3,
      price: 119000,
    },
    {
      date: "2025-08-06",
      productionQuantity: 20,
      quality: 3,
      demand: 2,
      price: 300000,
    },
    {
      date: "2025-08-07",
      productionQuantity: 18,
      quality: 1,
      demand: 1,
      price: 198000,
    },
    {
      date: "2025-08-08",
      productionQuantity: 10,
      quality: 5,
      demand: 3,
      price: 190000,
    },
    {
      date: "2025-08-09",
      productionQuantity: 32,
      quality: 5,
      demand: 3,
      price: 608000,
    },
    {
      date: "2025-08-10",
      productionQuantity: 25,
      quality: 4,
      demand: 3,
      price: 425000,
    },
    {
      date: "2025-08-11",
      productionQuantity: 7,
      quality: 1,
      demand: 1,
      price: 77000,
    },
    {
      date: "2025-08-12",
      productionQuantity: 9,
      quality: 3,
      demand: 2,
      price: 135000,
    },
    {
      date: "2025-08-13",
      productionQuantity: 8,
      quality: 2,
      demand: 1,
      price: 104000,
    },
    {
      date: "2025-08-14",
      productionQuantity: 6,
      quality: 4,
      demand: 3,
      price: 85000,
    },
    {
      date: "2025-08-15",
      productionQuantity: 13,
      quality: 1,
      demand: 2,
      price: 143000,
    },
    {
      date: "2025-08-16",
      productionQuantity: 11,
      quality: 3,
      demand: 2,
      price: 165000,
    },
    {
      date: "2025-08-17",
      productionQuantity: 30,
      quality: 4,
      demand: 3,
      price: 510000,
    },
    {
      date: "2025-08-18",
      productionQuantity: 18,
      quality: 1,
      demand: 1,
      price: 198000,
    },
    {
      date: "2025-08-19",
      productionQuantity: 40,
      quality: 5,
      demand: 3,
      price: 760000,
    },
    {
      date: "2025-08-20",
      productionQuantity: 5,
      quality: 1,
      demand: 1,
      price: 55000,
    },
    {
      date: "2025-08-21",
      productionQuantity: 10,
      quality: 5,
      demand: 3,
      price: 190000,
    },
    {
      date: "2025-08-22",
      productionQuantity: 11,
      quality: 5,
      demand: 3,
      price: 209000,
    },
    {
      date: "2025-08-23",
      productionQuantity: 6,
      quality: 5,
      demand: 3,
      price: 114000,
    },
    {
      date: "2025-08-24",
      productionQuantity: 12,
      quality: 5,
      demand: 3,
      price: 228000,
    },

    {
      date: "2025-08-25",
      productionQuantity: 15,
      quality: 2,
      demand: 1,
      price: 195000,
    },
    {
      date: "2025-08-26",
      productionQuantity: 17,
      quality: 5,
      demand: 3,
      price: 323000,
    },
    {
      date: "2025-08-27",
      productionQuantity: 5,
      quality: 5,
      demand: 3,
      price: 95000,
    },
    {
      date: "2025-08-28",
      productionQuantity: 17,
      quality: 5,
      demand: 3,
      price: 323000,
    },
    {
      date: "2025-08-29",
      productionQuantity: 9,
      quality: 1,
      demand: 1,
      price: 99000,
    },
    {
      date: "2025-08-30",
      productionQuantity: 18,
      quality: 3,
      demand: 2,
      price: 270000,
    },

    // September 2025
    {
      date: "2025-09-01",
      productionQuantity: 10,
      quality: 2,
      demand: 1,
      price: 130000,
    },
    {
      date: "2025-09-02",
      productionQuantity: 25,
      quality: 2,
      demand: 3,
      price: 325000,
    },
    {
      date: "2025-09-03",
      productionQuantity: 7,
      quality: 4,
      demand: 3,
      price: 119000,
    },
    {
      date: "2025-09-04",
      productionQuantity: 11,
      quality: 1,
      demand: 1,
      price: 121000,
    },
    {
      date: "2025-09-05",
      productionQuantity: 13,
      quality: 5,
      demand: 2,
      price: 247000,
    },
    {
      date: "2025-09-06",
      productionQuantity: 15,
      quality: 5,
      demand: 3,
      price: 285000,
    },
    {
      date: "2025-09-07",
      productionQuantity: 40,
      quality: 2,
      demand: 1,
      price: 520000,
    },
    {
      date: "2025-09-08",
      productionQuantity: 6,
      quality: 1,
      demand: 1,
      price: 66000,
    },
    {
      date: "2025-09-09",
      productionQuantity: 8,
      quality: 1,
      demand: 1,
      price: 88000,
    },
    {
      date: "2025-09-10",
      productionQuantity: 12,
      quality: 4,
      demand: 3,
      price: 204000,
    },
    {
      date: "2025-09-11",
      productionQuantity: 14,
      quality: 4,
      demand: 3,
      price: 238000,
    },
    {
      date: "2025-09-12",
      productionQuantity: 17,
      quality: 5,
      demand: 3,
      price: 323000,
    },
    {
      date: "2025-09-13",
      productionQuantity: 20,
      quality: 3,
      demand: 2,
      price: 300000,
    },
    {
      date: "2025-09-14",
      productionQuantity: 25,
      quality: 4,
      demand: 3,
      price: 425000,
    },
    {
      date: "2025-09-15",
      productionQuantity: 19,
      quality: 1,
      demand: 1,
      price: 209000,
    },
    {
      date: "2025-09-16",
      productionQuantity: 6,
      quality: 5,
      demand: 2,
      price: 114000,
    },
    {
      date: "2025-09-17",
      productionQuantity: 9,
      quality: 5,
      demand: 3,
      price: 171000,
    },
    {
      date: "2025-09-18",
      productionQuantity: 10,
      quality: 1,
      demand: 1,
      price: 110000,
    },
    {
      date: "2025-09-19",
      productionQuantity: 30,
      quality: 4,
      demand: 3,
      price: 510000,
    },
    {
      date: "2025-09-20",
      productionQuantity: 16,
      quality: 5,
      demand: 3,
      price: 304000,
    },
    {
      date: "2025-09-21",
      productionQuantity: 18,
      quality: 5,
      demand: 3,
      price: 342000,
    },
    {
      date: "2025-09-22",
      productionQuantity: 21,
      quality: 5,
      demand: 3,
      price: 399000,
    },
    {
      date: "2025-09-23",
      productionQuantity: 23,
      quality: 4,
      demand: 3,
      price: 391000,
    },
    {
      date: "2025-09-24",
      productionQuantity: 11,
      quality: 5,
      demand: 3,
      price: 209000,
    },
    {
      date: "2025-09-25",
      productionQuantity: 7,
      quality: 5,
      demand: 3,
      price: 133000,
    },
    {
      date: "2025-09-26",
      productionQuantity: 11,
      quality: 1,
      demand: 1,
      price: 121000,
    },
    {
      date: "2025-09-27",
      productionQuantity: 40,
      quality: 1,
      demand: 2,
      price: 440000,
    },
    {
      date: "2025-09-28",
      productionQuantity: 6,
      quality: 1,
      demand: 1,
      price: 66000,
    },
    {
      date: "2025-09-29",
      productionQuantity: 12,
      quality: 2,
      demand: 1,
      price: 156000,
    },
    {
      date: "2025-09-30",
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
  // await createAdmin();
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
