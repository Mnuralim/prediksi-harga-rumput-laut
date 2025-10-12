// Import Prisma Client
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

async function exportData() {
  try {
    // Ambil data dari database (sesuaikan dengan nama model Anda)
    const data = await prisma.seaweedPrices.findMany({
      select: {
        date: true,
        productionQuantity: true,
        quality: true,
        demand: true,
        price: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    // Format data sebagai array JavaScript
    const jsArray = data.map((item) => ({
      date: item.date,
      productionQuantity: item.productionQuantity,
      quality: item.quality,
      demand: item.demand,
      price: item.price,
    }));

    // Buat konten file JS
    const fileContent = `// Data exported from Prisma
const productionData = ${JSON.stringify(jsArray, null, 2)};

// Export untuk digunakan di module lain
module.exports = productionData;

// Atau untuk ES6 modules:
// export default productionData;
`;

    // Simpan ke file
    fs.writeFileSync("productionData.js", fileContent, "utf8");

    console.log("✅ Data berhasil diekspor ke productionData.js");
    console.log(`📊 Total data: ${jsArray.length} items`);

    // Tampilkan preview data
    console.log("\n📋 Preview data:");
    console.log(jsArray.slice(0, 3));
  } catch (error) {
    console.error("❌ Error saat mengambil data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Jalankan fungsi export
exportData();
