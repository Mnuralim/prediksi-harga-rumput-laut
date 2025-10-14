"use server";

import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export const getAllSeaweeds = unstable_cache(async function getHarvests(
  take: string,
  skip: string,
  sortBy?: string,
  startDate?: string,
  endDate?: string,
  sortOrder?: string
) {
  console.log(sortBy, sortOrder);
  const whereConditions: Prisma.SeaweedPricesWhereInput[] = [];

  if (startDate && endDate) {
    whereConditions.push({
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    });
  }

  let orderBy: Prisma.SeaweedPricesOrderByWithRelationInput;
  if (sortBy && sortOrder) {
    orderBy = {
      [sortBy]: sortOrder === "desc" ? "desc" : "asc",
    };
  } else {
    orderBy = {
      date: "asc",
    };
  }

  const [seaweeds, totalCount] = await Promise.all([
    prisma.seaweedPrices.findMany({
      where: {
        AND: whereConditions,
      },
      take: parseInt(take, 10),
      skip: parseInt(skip, 10),
      orderBy,
    }),
    prisma.seaweedPrices.count({
      where: {
        AND: whereConditions,
      },
    }),
  ]);

  return {
    seaweeds,
    totalCount,
    currentPage: Math.floor(parseInt(skip) / parseInt(take)) + 1,
    totalPages: Math.ceil(totalCount / parseInt(take)),
    itemsPerPage: parseInt(take),
  };
});

export async function addSeaweed(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const date = formData.get("date") as string;
    const productionQuantity = formData.get("productionQuantity") as string;
    const quality = formData.get("quality") as string;
    const demand = formData.get("demand") as string;
    const price = formData.get("price") as string;

    if (!date || !productionQuantity || !demand || !quality || !price) {
      throw new Error("Semua field harus diisi");
    }

    await prisma.seaweedPrices.create({
      data: {
        demand: parseInt(demand),
        productionQuantity: parseInt(productionQuantity),
        quality: parseInt(quality),
        price: parseFloat(price),
        date: new Date(date),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Terjadi kesalahan saat menambahkan data",
      };
    }
  }

  revalidatePath("/seaweeds");
  revalidatePath("/dashboard");
  redirect(`/seaweeds?success=1&message=Data berhasil ditambahkan`);
}

export async function deleteSeaweed(id: string) {
  try {
    const harvestRecord = await prisma.seaweedPrices.findUnique({
      where: {
        id,
      },
    });

    if (!harvestRecord) {
      throw new Error("Data tidak ditemukan");
    }

    await prisma.seaweedPrices.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/seaweeds?error=1&message=${error.message}`);
    } else {
      redirect(
        `/seaweeds?error=1&message=Terjadi kesalahan saat menghapus data`
      );
    }
  }
  revalidatePath("/seaweeds");
  revalidatePath("/dashboard");
  redirect(`/seaweeds?success=1&message=Data berhasil dihapus`);
}

export async function updateSeaWeed(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;
    const date = formData.get("date") as string;
    const productionQuantity = formData.get("productionQuantity") as string;
    const quality = formData.get("quality") as string;
    const demand = formData.get("demand") as string;
    const price = formData.get("price") as string;

    if (!id || !date || !productionQuantity || !demand || !quality || !price) {
      throw new Error("Semua field harus diisi");
    }

    await prisma.seaweedPrices.update({
      where: {
        id,
      },
      data: {
        demand: parseInt(demand),
        productionQuantity: parseInt(productionQuantity),
        quality: parseInt(quality),
        price: parseFloat(price),
        date: new Date(date),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Terjadi kesalahan saat mengubah data",
      };
    }
  }

  revalidatePath("/seaweeds");
  revalidatePath("/dashboard");
  redirect(`/seaweeds?success=1&message=Data berhasil diubah`);
}
