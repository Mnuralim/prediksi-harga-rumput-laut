"use server";

import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getStats = unstable_cache(
  async function getStats() {
    const [
      totalSeaweedRecords,
      totalWeatherTypes,
      totalPredictions,
      activeModels,
      avgPrice,
      lastTrainingDate,
      recentPredictions,
    ] = await Promise.all([
      // Total baris data harga/produksi rumput laut
      prisma.seaweedPrices.count(),

      // Jumlah tipe cuaca (distinct) yang pernah tercatat di log prediksi
      prisma.predictionLog
        .groupBy({
          by: ["weather"],
        })
        .then((rows) => rows.length),

      // Total log prediksi
      prisma.predictionLog.count(),

      // Model aktif
      prisma.regressionCoefficients.count({
        where: { isActive: true },
      }),

      // Rata-rata jumlah produksi (bisa diganti ke rata-rata harga jika perlu)
      prisma.seaweedPrices
        .aggregate({
          _avg: { price: true },
        })
        .then((r) => r._avg.price || 0),

      // Tanggal pelatihan model terakhir
      prisma.regressionCoefficients
        .findFirst({
          orderBy: { trainedAt: "desc" },
          select: { trainedAt: true },
        })
        .then((r) => r?.trainedAt || null),

      // 5 prediksi terbaru
      prisma.predictionLog.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          date: true, // tanggal_panen
          weather: true, // cuaca
          productionCost: true, // biaya_produksi
          predictionValue: true, // nilai_prediksi
          modelUsed: true, // model_yang_digunakan
          createdAt: true,
        },
      }),
    ]);

    return {
      totalSeaweedRecords,
      totalWeatherTypes,
      totalPredictions,
      activeModels,
      avgPrice,
      lastTrainingDate,
      recentPredictions,
    };
  },
  ["dashboard-stats"],
  {
    revalidate: 300, // Cache 5 menit
  }
);
