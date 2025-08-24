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

  // Check if data already exists
  const existingData = await prisma.seaweedPrices.findFirst();
  if (existingData) {
    console.log("Seaweed prices data already exists. Skipping seeding.");
    return;
  }

  const seaweedData = [
    // Januari 2024
    {
      date: "2024-01-03",
      productionQuantity: 1250,
      quality: 3,
      demand: 2,
      price: 18500.5,
    },
    {
      date: "2024-01-08",
      productionQuantity: 980,
      quality: 4,
      demand: 3,
      price: 24200.0,
    },
    {
      date: "2024-01-15",
      productionQuantity: 1850,
      quality: 2,
      demand: 1,
      price: 15800.25,
    },
    {
      date: "2024-01-22",
      productionQuantity: 2200,
      quality: 5,
      demand: 3,
      price: 32500.75,
    },
    {
      date: "2024-01-29",
      productionQuantity: 1450,
      quality: 3,
      demand: 2,
      price: 19200.0,
    },

    // Februari 2024
    {
      date: "2024-02-05",
      productionQuantity: 1680,
      quality: 4,
      demand: 2,
      price: 22800.5,
    },
    {
      date: "2024-02-12",
      productionQuantity: 920,
      quality: 2,
      demand: 3,
      price: 16400.0,
    },
    {
      date: "2024-02-19",
      productionQuantity: 2450,
      quality: 5,
      demand: 1,
      price: 29800.25,
    },
    {
      date: "2024-02-26",
      productionQuantity: 1320,
      quality: 3,
      demand: 3,
      price: 21500.75,
    },

    // Maret 2024
    {
      date: "2024-03-04",
      productionQuantity: 1750,
      quality: 4,
      demand: 1,
      price: 20900.0,
    },
    {
      date: "2024-03-11",
      productionQuantity: 1100,
      quality: 2,
      demand: 2,
      price: 14800.5,
    },
    {
      date: "2024-03-18",
      productionQuantity: 2800,
      quality: 5,
      demand: 2,
      price: 31200.0,
    },
    {
      date: "2024-03-25",
      productionQuantity: 1580,
      quality: 3,
      demand: 3,
      price: 22400.25,
    },

    // April 2024
    {
      date: "2024-04-01",
      productionQuantity: 1890,
      quality: 4,
      demand: 2,
      price: 23600.75,
    },
    {
      date: "2024-04-08",
      productionQuantity: 750,
      quality: 1,
      demand: 3,
      price: 12500.0,
    },
    {
      date: "2024-04-15",
      productionQuantity: 2650,
      quality: 5,
      demand: 1,
      price: 28900.5,
    },
    {
      date: "2024-04-22",
      productionQuantity: 1420,
      quality: 3,
      demand: 2,
      price: 18900.0,
    },
    {
      date: "2024-04-29",
      productionQuantity: 1950,
      quality: 4,
      demand: 3,
      price: 25800.25,
    },

    // Mei 2024
    {
      date: "2024-05-06",
      productionQuantity: 1180,
      quality: 2,
      demand: 1,
      price: 13200.75,
    },
    {
      date: "2024-05-13",
      productionQuantity: 2300,
      quality: 5,
      demand: 3,
      price: 33500.0,
    },
    {
      date: "2024-05-20",
      productionQuantity: 1650,
      quality: 3,
      demand: 2,
      price: 19800.5,
    },
    {
      date: "2024-05-27",
      productionQuantity: 880,
      quality: 1,
      demand: 2,
      price: 11800.0,
    },

    // Juni 2024
    {
      date: "2024-06-03",
      productionQuantity: 2150,
      quality: 4,
      demand: 1,
      price: 21500.25,
    },
    {
      date: "2024-06-10",
      productionQuantity: 1380,
      quality: 2,
      demand: 3,
      price: 17200.75,
    },
    {
      date: "2024-06-17",
      productionQuantity: 2750,
      quality: 5,
      demand: 2,
      price: 30800.0,
    },
    {
      date: "2024-06-24",
      productionQuantity: 1520,
      quality: 3,
      demand: 3,
      price: 21900.5,
    },

    // Juli 2024
    {
      date: "2024-07-01",
      productionQuantity: 1720,
      quality: 4,
      demand: 2,
      price: 22400.0,
    },
    {
      date: "2024-07-08",
      productionQuantity: 650,
      quality: 1,
      demand: 1,
      price: 10200.25,
    },
    {
      date: "2024-07-15",
      productionQuantity: 2950,
      quality: 5,
      demand: 3,
      price: 34200.75,
    },
    {
      date: "2024-07-22",
      productionQuantity: 1480,
      quality: 3,
      demand: 2,
      price: 19400.0,
    },
    {
      date: "2024-07-29",
      productionQuantity: 1850,
      quality: 4,
      demand: 1,
      price: 20800.5,
    },

    // Agustus 2024
    {
      date: "2024-08-05",
      productionQuantity: 1240,
      quality: 2,
      demand: 3,
      price: 16800.0,
    },
    {
      date: "2024-08-12",
      productionQuantity: 2450,
      quality: 5,
      demand: 1,
      price: 29200.25,
    },
    {
      date: "2024-08-19",
      productionQuantity: 1680,
      quality: 3,
      demand: 2,
      price: 20200.75,
    },
    {
      date: "2024-08-26",
      productionQuantity: 920,
      quality: 1,
      demand: 2,
      price: 12800.0,
    },

    // September 2024
    {
      date: "2024-09-02",
      productionQuantity: 2180,
      quality: 4,
      demand: 3,
      price: 26400.5,
    },
    {
      date: "2024-09-09",
      productionQuantity: 1380,
      quality: 2,
      demand: 1,
      price: 14200.0,
    },
    {
      date: "2024-09-16",
      productionQuantity: 2850,
      quality: 5,
      demand: 2,
      price: 31800.25,
    },
    {
      date: "2024-09-23",
      productionQuantity: 1550,
      quality: 3,
      demand: 3,
      price: 22100.75,
    },
    {
      date: "2024-09-30",
      productionQuantity: 1780,
      quality: 4,
      demand: 2,
      price: 23200.0,
    },

    // Oktober 2024
    {
      date: "2024-10-07",
      productionQuantity: 820,
      quality: 1,
      demand: 3,
      price: 13600.5,
    },
    {
      date: "2024-10-14",
      productionQuantity: 2650,
      quality: 5,
      demand: 1,
      price: 28500.0,
    },
    {
      date: "2024-10-21",
      productionQuantity: 1420,
      quality: 3,
      demand: 2,
      price: 18600.25,
    },
    {
      date: "2024-10-28",
      productionQuantity: 1950,
      quality: 4,
      demand: 3,
      price: 25200.75,
    },

    // November 2024
    {
      date: "2024-11-04",
      productionQuantity: 1180,
      quality: 2,
      demand: 2,
      price: 15600.0,
    },
    {
      date: "2024-11-11",
      productionQuantity: 2400,
      quality: 5,
      demand: 3,
      price: 33200.5,
    },
    {
      date: "2024-11-18",
      productionQuantity: 1620,
      quality: 3,
      demand: 1,
      price: 17800.0,
    },
    {
      date: "2024-11-25",
      productionQuantity: 780,
      quality: 1,
      demand: 2,
      price: 11400.25,
    },

    // Desember 2024
    {
      date: "2024-12-02",
      productionQuantity: 2250,
      quality: 4,
      demand: 2,
      price: 24800.75,
    },
    {
      date: "2024-12-09",
      productionQuantity: 1350,
      quality: 2,
      demand: 3,
      price: 17600.0,
    },
    {
      date: "2024-12-16",
      productionQuantity: 2980,
      quality: 5,
      demand: 1,
      price: 30200.5,
    },
    {
      date: "2024-12-23",
      productionQuantity: 1580,
      quality: 3,
      demand: 2,
      price: 19600.0,
    },
    {
      date: "2024-12-30",
      productionQuantity: 1820,
      quality: 4,
      demand: 3,
      price: 24600.25,
    },

    // Januari 2025
    {
      date: "2025-01-06",
      productionQuantity: 950,
      quality: 1,
      demand: 1,
      price: 12200.75,
    },
    {
      date: "2025-01-13",
      productionQuantity: 2550,
      quality: 5,
      demand: 2,
      price: 32800.0,
    },
    {
      date: "2025-01-20",
      productionQuantity: 1480,
      quality: 3,
      demand: 3,
      price: 21600.5,
    },
    {
      date: "2025-01-27",
      productionQuantity: 1720,
      quality: 4,
      demand: 2,
      price: 22900.0,
    },

    // Februari 2025 (data terbaru)
    {
      date: "2025-02-03",
      productionQuantity: 1280,
      quality: 2,
      demand: 2,
      price: 16200.25,
    },
    {
      date: "2025-02-10",
      productionQuantity: 2680,
      quality: 5,
      demand: 3,
      price: 34800.75,
    },
    {
      date: "2025-02-17",
      productionQuantity: 1580,
      quality: 3,
      demand: 1,
      price: 18200.0,
    },
    {
      date: "2025-02-24",
      productionQuantity: 1950,
      quality: 4,
      demand: 2,
      price: 24200.5,
    },

    // Maret 2025
    {
      date: "2025-03-03",
      productionQuantity: 850,
      quality: 1,
      demand: 3,
      price: 14800.0,
    },
    {
      date: "2025-03-10",
      productionQuantity: 2450,
      quality: 5,
      demand: 1,
      price: 29600.25,
    },
    {
      date: "2025-03-17",
      productionQuantity: 1650,
      quality: 3,
      demand: 2,
      price: 20400.75,
    },
    {
      date: "2025-03-24",
      productionQuantity: 1880,
      quality: 4,
      demand: 3,
      price: 25600.0,
    },
    {
      date: "2025-03-31",
      productionQuantity: 1320,
      quality: 2,
      demand: 2,
      price: 16800.5,
    },

    // April 2025
    {
      date: "2025-04-07",
      productionQuantity: 2780,
      quality: 5,
      demand: 2,
      price: 31400.0,
    },
    {
      date: "2025-04-14",
      productionQuantity: 1420,
      quality: 3,
      demand: 3,
      price: 21200.25,
    },
    {
      date: "2025-04-21",
      productionQuantity: 1750,
      quality: 4,
      demand: 1,
      price: 20600.75,
    },
    {
      date: "2025-04-28",
      productionQuantity: 980,
      quality: 1,
      demand: 2,
      price: 13200.0,
    },

    // Mei 2025
    {
      date: "2025-05-05",
      productionQuantity: 2350,
      quality: 5,
      demand: 3,
      price: 33600.5,
    },
    {
      date: "2025-05-12",
      productionQuantity: 1520,
      quality: 3,
      demand: 2,
      price: 19800.0,
    },
    {
      date: "2025-05-19",
      productionQuantity: 1680,
      quality: 4,
      demand: 2,
      price: 22600.25,
    },
    {
      date: "2025-05-26",
      productionQuantity: 1180,
      quality: 2,
      demand: 1,
      price: 14400.75,
    },

    // Juni 2025
    {
      date: "2025-06-02",
      productionQuantity: 2950,
      quality: 5,
      demand: 1,
      price: 30800.0,
    },
    {
      date: "2025-06-09",
      productionQuantity: 1380,
      quality: 3,
      demand: 3,
      price: 20800.5,
    },
    {
      date: "2025-06-16",
      productionQuantity: 1850,
      quality: 4,
      demand: 2,
      price: 23400.0,
    },
    {
      date: "2025-06-23",
      productionQuantity: 720,
      quality: 1,
      demand: 2,
      price: 12600.25,
    },
    {
      date: "2025-06-30",
      productionQuantity: 2480,
      quality: 5,
      demand: 3,
      price: 32400.75,
    },

    // Juli 2025 (data terbaru)
    {
      date: "2025-07-07",
      productionQuantity: 1620,
      quality: 3,
      demand: 2,
      price: 19400.0,
    },
    {
      date: "2025-07-14",
      productionQuantity: 1920,
      quality: 4,
      demand: 1,
      price: 21800.5,
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
