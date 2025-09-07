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
      productionQuantity: 1720,
      quality: 4,
      demand: 2,
      price: 22400.0,
    },
    {
      date: "2025-07-02",
      productionQuantity: 1450,
      quality: 3,
      demand: 3,
      price: 19800.5,
    },
    {
      date: "2025-07-03",
      productionQuantity: 1890,
      quality: 4,
      demand: 1,
      price: 21500.25,
    },
    {
      date: "2025-07-04",
      productionQuantity: 2150,
      quality: 5,
      demand: 2,
      price: 28900.75,
    },
    {
      date: "2025-07-05",
      productionQuantity: 980,
      quality: 2,
      demand: 3,
      price: 15600.0,
    },
    {
      date: "2025-07-06",
      productionQuantity: 1650,
      quality: 3,
      demand: 2,
      price: 20200.5,
    },
    {
      date: "2025-07-07",
      productionQuantity: 2380,
      quality: 5,
      demand: 1,
      price: 31200.25,
    },
    {
      date: "2025-07-08",
      productionQuantity: 650,
      quality: 1,
      demand: 1,
      price: 10200.25,
    },
    {
      date: "2025-07-09",
      productionQuantity: 1320,
      quality: 2,
      demand: 3,
      price: 17800.75,
    },
    {
      date: "2025-07-10",
      productionQuantity: 2750,
      quality: 5,
      demand: 2,
      price: 32800.0,
    },
    {
      date: "2025-07-11",
      productionQuantity: 1580,
      quality: 3,
      demand: 3,
      price: 21400.5,
    },
    {
      date: "2025-07-12",
      productionQuantity: 1920,
      quality: 4,
      demand: 2,
      price: 24600.25,
    },
    {
      date: "2025-07-13",
      productionQuantity: 850,
      quality: 1,
      demand: 2,
      price: 12800.75,
    },
    {
      date: "2025-07-14",
      productionQuantity: 2450,
      quality: 5,
      demand: 1,
      price: 29600.0,
    },
    {
      date: "2025-07-15",
      productionQuantity: 2950,
      quality: 5,
      demand: 3,
      price: 34200.75,
    },
    {
      date: "2025-07-16",
      productionQuantity: 1680,
      quality: 3,
      demand: 2,
      price: 20800.5,
    },
    {
      date: "2025-07-17",
      productionQuantity: 1250,
      quality: 2,
      demand: 1,
      price: 16400.25,
    },
    {
      date: "2025-07-18",
      productionQuantity: 2180,
      quality: 4,
      demand: 3,
      price: 26200.75,
    },
    {
      date: "2025-07-19",
      productionQuantity: 780,
      quality: 1,
      demand: 2,
      price: 11600.0,
    },
    {
      date: "2025-07-20",
      productionQuantity: 1850,
      quality: 3,
      demand: 3,
      price: 22400.5,
    },
    {
      date: "2025-07-21",
      productionQuantity: 2650,
      quality: 5,
      demand: 1,
      price: 30800.25,
    },
    {
      date: "2025-07-22",
      productionQuantity: 1480,
      quality: 3,
      demand: 2,
      price: 19400.0,
    },
    {
      date: "2025-07-23",
      productionQuantity: 1750,
      quality: 4,
      demand: 2,
      price: 23200.75,
    },
    {
      date: "2025-07-24",
      productionQuantity: 920,
      quality: 1,
      demand: 3,
      price: 13400.5,
    },
    {
      date: "2025-07-25",
      productionQuantity: 2320,
      quality: 5,
      demand: 2,
      price: 28600.25,
    },
    {
      date: "2025-07-26",
      productionQuantity: 1420,
      quality: 2,
      demand: 1,
      price: 18200.75,
    },
    {
      date: "2025-07-27",
      productionQuantity: 1980,
      quality: 4,
      demand: 3,
      price: 25800.0,
    },
    {
      date: "2025-07-28",
      productionQuantity: 1150,
      quality: 2,
      demand: 2,
      price: 16800.5,
    },
    {
      date: "2025-07-29",
      productionQuantity: 1850,
      quality: 4,
      demand: 1,
      price: 20800.5,
    },
    {
      date: "2025-07-30",
      productionQuantity: 2280,
      quality: 5,
      demand: 3,
      price: 29200.75,
    },
    {
      date: "2025-07-31",
      productionQuantity: 1620,
      quality: 3,
      demand: 2,
      price: 21600.0,
    },

    // Agustus 2025
    {
      date: "2025-08-01",
      productionQuantity: 2480,
      quality: 5,
      demand: 2,
      price: 31600.25,
    },
    {
      date: "2025-08-02",
      productionQuantity: 1380,
      quality: 3,
      demand: 3,
      price: 19800.75,
    },
    {
      date: "2025-08-03",
      productionQuantity: 1720,
      quality: 4,
      demand: 1,
      price: 22400.0,
    },
    {
      date: "2025-08-04",
      productionQuantity: 850,
      quality: 1,
      demand: 2,
      price: 12200.5,
    },
    {
      date: "2025-08-05",
      productionQuantity: 1240,
      quality: 2,
      demand: 3,
      price: 16800.0,
    },
    {
      date: "2025-08-06",
      productionQuantity: 2750,
      quality: 5,
      demand: 1,
      price: 33200.25,
    },
    {
      date: "2025-08-07",
      productionQuantity: 1580,
      quality: 3,
      demand: 2,
      price: 21600.75,
    },
    {
      date: "2025-08-08",
      productionQuantity: 1920,
      quality: 4,
      demand: 3,
      price: 24800.0,
    },
    {
      date: "2025-08-09",
      productionQuantity: 1050,
      quality: 2,
      demand: 2,
      price: 15400.5,
    },
    {
      date: "2025-08-10",
      productionQuantity: 2380,
      quality: 5,
      demand: 2,
      price: 29800.25,
    },
    {
      date: "2025-08-11",
      productionQuantity: 1650,
      quality: 3,
      demand: 1,
      price: 18600.75,
    },
    {
      date: "2025-08-12",
      productionQuantity: 2450,
      quality: 5,
      demand: 1,
      price: 29200.25,
    },
    {
      date: "2025-08-13",
      productionQuantity: 780,
      quality: 1,
      demand: 3,
      price: 11800.0,
    },
    {
      date: "2025-08-14",
      productionQuantity: 1820,
      quality: 4,
      demand: 2,
      price: 23600.5,
    },
    {
      date: "2025-08-15",
      productionQuantity: 1320,
      quality: 2,
      demand: 3,
      price: 17200.25,
    },
    {
      date: "2025-08-16",
      productionQuantity: 2650,
      quality: 5,
      demand: 1,
      price: 32400.75,
    },
    {
      date: "2025-08-17",
      productionQuantity: 1480,
      quality: 3,
      demand: 2,
      price: 20400.0,
    },
    {
      date: "2025-08-18",
      productionQuantity: 1750,
      quality: 4,
      demand: 3,
      price: 22800.5,
    },

    // September 2025 (hingga 2 September - 5 hari sebelum tanggal sekarang 7 September 2025)
    {
      date: "2025-09-01",
      productionQuantity: 1680,
      quality: 3,
      demand: 2,
      price: 20200.75,
    },
    {
      date: "2025-09-02",
      productionQuantity: 2180,
      quality: 4,
      demand: 3,
      price: 26400.5,
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
