"use client";

import { predictSeaweedPrice } from "@/actions/train";
import { Loader2, Waves, AlertCircle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export const PredictForm = () => {
  const [state, action, pending] = useActionState(predictSeaweedPrice, {
    message: "",
    success: false,
  });

  const router = useRouter();

  const qualityOptions = [
    { value: 1, label: "Sangat Rendah (1)" },
    { value: 2, label: "Rendah (2)" },
    { value: 3, label: "Sedang (3)" },
    { value: 4, label: "Tinggi (4)" },
    { value: 5, label: "Sangat Tinggi (5)" },
  ];

  const demandOptions = [
    { value: 1, label: "Rendah (1)" },
    { value: 2, label: "Sedang (2)" },
    { value: 3, label: "Tinggi (3)" },
  ];

  return (
    <div className="space-y-6">
      <form action={action} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="productionQuantity"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Jumlah Produksi (KG)
            </label>
            <input
              type="number"
              id="productionQuantity"
              name="productionQuantity"
              placeholder="Contoh: 1500"
              min="1"
              step="1"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="qualityValue"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Kualitas Rumput Laut
            </label>
            <select
              id="qualityValue"
              name="qualityValue"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="">-- Pilih Kualitas --</option>
              {qualityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="demandValue"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Tingkat Permintaan
            </label>
            <select
              id="demandValue"
              name="demandValue"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="">-- Pilih Permintaan --</option>
              {demandOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {pending ? (
            <span className="flex items-center gap-3 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Memproses Prediksi...</span>
            </span>
          ) : (
            <span className="flex items-center gap-3 justify-center">
              <Waves className="w-5 h-5" />
              <span>Prediksi Harga Rumput Laut</span>
            </span>
          )}
        </button>
      </form>

      {state.message && !state.success && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-red-800 font-medium mb-1">Terjadi Kesalahan</h4>
            <p className="text-red-700 text-sm">{state.message}</p>
          </div>
        </div>
      )}

      {state.data && state.success && (
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-2xl overflow-hidden shadow-lg">
          <div
            className={`px-6 py-4 ${
              (state.data.predictedSeaweed ?? 0) < 0
                ? "bg-gradient-to-r from-amber-600 to-orange-600"
                : "bg-gradient-to-r from-blue-600 to-emerald-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                {(state.data.predictedSeaweed ?? 0) < 0 ? (
                  <AlertCircle className="w-6 h-6 text-white" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  {(state.data.predictedSeaweed ?? 0) < 0
                    ? "Hasil Prediksi - Perlu Perhatian"
                    : "Hasil Prediksi Berhasil"}
                </h3>
                <p className="text-blue-100 text-sm">
                  Prediksi berdasarkan data yang Anda masukkan
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {(state.data.predictedSeaweed ?? 0) < 0 && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-amber-800 font-semibold mb-2">
                      ⚠️ Nilai Prediksi Tidak Valid (Negatif)
                    </h4>
                    <p className="text-amber-700 text-sm mb-2">
                      Model regresi linear berganda menghasilkan nilai negatif
                      (Rp {state.data.predictedSeaweed?.toLocaleString("id-ID")}
                      ). Hal ini menandakan:
                    </p>
                    <ul className="text-amber-700 text-sm space-y-1 ml-4">
                      <li>
                        • Kombinasi input (produksi, kualitas, permintaan)
                        berada di luar rentang data pelatihan
                      </li>
                      <li>
                        • Kualitas atau permintaan yang terlalu rendah dengan
                        produksi tertentu
                      </li>
                      <li>
                        • Model perlu dikalibrasi dengan data yang lebih
                        representatif
                      </li>
                    </ul>
                    <p className="text-amber-800 text-sm font-medium mt-3">
                      💡 Saran: Sesuaikan input Anda atau konsultasikan dengan
                      data historis yang tersedia.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-3 bg-white rounded-xl p-4 shadow-md border border-blue-200 mb-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Waves className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Estimasi Harga Rumput Laut
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        (state.data.predictedSeaweed ?? 0) < 0
                          ? "text-red-600"
                          : "text-gray-800"
                      }`}
                    >
                      Rp{" "}
                      {state.data.predictedSeaweed?.toLocaleString("id-ID") ||
                        "0"}
                      <span className="text-lg font-medium text-gray-600 ml-2">
                        /KG
                      </span>
                    </p>
                    {(state.data.predictedSeaweed ?? 0) < 0 && (
                      <p className="text-xs text-red-500 font-medium mt-1">
                        ⚠️ Nilai tidak valid
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-gray-500 mb-1">💡 Catatan:</p>
                  <p className="text-sm text-gray-600">
                    Hasil prediksi dapat berubah berdasarkan kondisi pasar
                    aktual dan faktor ekonomi lainnya.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-gray-500 mb-2">📊 Detail Input:</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      • Jumlah Produksi: {state.data?.productionQuantity || "-"}{" "}
                      KG
                    </p>
                    <p>• Kualitas: {state.data?.qualityValue || "-"}/5</p>
                    <p>• Permintaan: {state.data?.demandValue || "-"}/3</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.refresh()}
                  className="flex-1 px-4 py-2 bg-white border border-blue-300 text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  Prediksi Ulang
                </button>
                <button
                  onClick={() => {
                    const result = `Prediksi Harga Rumput Laut: Rp ${
                      state.data?.predictedSeaweed?.toLocaleString("id-ID") ||
                      "0"
                    }/KG
Produksi: ${state.data?.productionQuantity || "-"} KG
Kualitas: ${state.data?.qualityValue || "-"}/5
Permintaan: ${state.data?.demandValue || "-"}/3`;
                    navigator.clipboard.writeText(result);
                    alert("Hasil prediksi telah disalin!");
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Salin Hasil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
