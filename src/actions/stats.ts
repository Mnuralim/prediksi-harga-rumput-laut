"use server";

import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getStats = unstable_cache(async function getStats() {
  const [
    totalSeaweedRecords,
    totalWeatherTypes,
    totalPredictions,
    activeModels,
    avgPrice,
    lastTrainingDate,
    recentPredictions,
  ] = await Promise.all([
    prisma.seaweedPrices.count(),
    5,
    prisma.predictionLog.count(),
    prisma.regressionCoefficients.count({
      where: { isActive: true },
    }),

    prisma.seaweedPrices
      .aggregate({
        _avg: { price: true },
      })
      .then((r) => r._avg.price || 0),

    prisma.regressionCoefficients
      .findFirst({
        orderBy: { trainedAt: "desc" },
        select: { trainedAt: true },
      })
      .then((r) => r?.trainedAt || null),

    prisma.predictionLog.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        date: true,
        weather: true,
        productionCost: true,
        predictionValue: true,
        modelUsed: true,
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
});
