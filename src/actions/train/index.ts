"use server";

import { MultipleLinearRegression } from "@/lib/mlr";
import prisma from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export interface TrainingResult {
  success: boolean;
  message: string;
  data?: {
    intercept: number;
    productionQuantityCoeff: number;
    qualityCoeff: number;
    demandCoeff: number;
    mape: number;
    pe: number;
    rSquared: number;
    rmse: number;
    trainingDataCount: number;
  };
}

export interface PredictionInput {
  productionQuantity: number;
  qualityValue: number;
  demandValue: number;
}

export interface PredictionResult {
  success: boolean;
  message: string;
  data?: {
    predictedSeaweed: number;
    productionQuantity: number;
    qualityValue: number;
    demandValue: number;
    modelUsed: {
      intercept: number;
      productionQuantityCoeff: number;
      qualityCoeff: number;
      demandCoeff: number;
    };
  };
}

export async function trainRegressionModel() {
  try {
    const trainingData = await prisma.seaweedPrices.findMany({
      skip: 0,
      orderBy: {
        date: "asc",
      },
    });

    if (trainingData.length < 4) {
      throw new Error(
        "Data training tidak mencukupi. Minimum 4 data diperlukan untuk 3 variabel."
      );
    }

    const validData = trainingData.filter(
      (record) =>
        record.productionQuantity !== null &&
        record.quality !== null &&
        record.demand !== null &&
        record.price !== null
    );

    if (validData.length < 4) {
      throw new Error(
        "Data training tidak mencukupi setelah filter. Minimum 4 data valid diperlukan."
      );
    }

    const X: number[][] = [];
    const y: number[] = [];

    validData.forEach((record) => {
      X.push([record.productionQuantity, record.quality, record.demand]);
      y.push(record.price);
    });

    const mlr = new MultipleLinearRegression();
    const result = mlr.train(X, y);

    const modelName = "seaweed_price_prediction_model";

    await prisma.regressionCoefficients.upsert({
      where: { modelName },
      update: {
        intercept: result.intercept,
        productionQuantityCoeff: result.productionQuantityCoeff,
        qualityCoeff: result.qualityCoeff,
        demandCoeff: result.demandCoeff,
        mape: result.metrics.mape,
        pe: result.metrics.pe,
        rSquared: result.metrics.rSquared,
        rmse: result.metrics.rmse,
        trainingDataCount: validData.length,
        trainedAt: new Date(),
        isActive: true,
      },
      create: {
        modelName,
        intercept: result.intercept,
        productionQuantityCoeff: result.productionQuantityCoeff,
        qualityCoeff: result.qualityCoeff,
        demandCoeff: result.demandCoeff,
        mape: result.metrics.mape,
        pe: result.metrics.pe,
        rSquared: result.metrics.rSquared,
        rmse: result.metrics.rmse,
        trainingDataCount: validData.length,
        trainedAt: new Date(),
        isActive: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/train?error=1&message=${error.message}`);
    } else {
      redirect(`/train?error=1&message=Terjadi kesalahan saat melatih model`);
    }
  } finally {
    await prisma.$disconnect();
  }
  revalidatePath("/train");
  revalidatePath("/test");
  revalidatePath("/predict");
  redirect(`/train?success=1&message=Model berhasil dilatih`);
}
export async function predictSeaweedPrice(
  formState: PredictionResult,
  formData: FormData
): Promise<PredictionResult> {
  try {
    const input: PredictionInput = {
      productionQuantity: parseFloat(
        formData.get("productionQuantity") as string
      ),
      qualityValue: parseFloat(formData.get("qualityValue") as string),
      demandValue: parseFloat(formData.get("demandValue") as string),
    };

    if (
      isNaN(input.productionQuantity) ||
      isNaN(input.qualityValue) ||
      isNaN(input.demandValue) ||
      input.productionQuantity < 0 ||
      input.qualityValue < 0 ||
      input.demandValue < 0
    ) {
      throw new Error(
        "Semua field harus diisi dengan angka yang valid dan tidak negatif"
      );
    }

    const currentModel = await getCurrentModel();

    if (!currentModel) {
      throw new Error(
        "Model belum dilatih. Silakan latih model terlebih dahulu."
      );
    }

    const mlr = new MultipleLinearRegression();
    mlr.loadCoefficients([
      currentModel.intercept,
      currentModel.productionQuantityCoeff,
      currentModel.qualityCoeff,
      currentModel.demandCoeff,
    ]);

    const predictedHarvest = mlr.predictSingle(
      input.productionQuantity,
      input.qualityValue,
      input.demandValue
    );

    return {
      success: true,
      message: "Prediksi berhasil dilakukan",
      data: {
        predictedSeaweed: Math.round(predictedHarvest * 100) / 100,
        productionQuantity: input.productionQuantity,
        demandValue: input.demandValue,
        qualityValue: input.qualityValue,
        modelUsed: {
          intercept: currentModel.intercept,
          demandCoeff: currentModel.demandCoeff,
          productionQuantityCoeff: currentModel.productionQuantityCoeff,
          qualityCoeff: currentModel.qualityCoeff,
        },
      },
    };
  } catch (error) {
    console.error("Error predicting harvest:", error);
    return {
      success: false,
      message: `Terjadi kesalahan saat melakukan prediksi: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export const getCurrentModel = unstable_cache(async function getCurrentModel() {
  try {
    const model = await prisma.regressionCoefficients.findFirst({
      where: { isActive: true },
      orderBy: { trainedAt: "desc" },
    });

    return model;
  } catch (error) {
    console.error("Error fetching current model:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
});
