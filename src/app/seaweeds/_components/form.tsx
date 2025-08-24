"use client";

import { useActionState } from "react";
import {
  Calendar,
  Package,
  Star,
  TrendingUp,
  DollarSign,
  Loader2,
} from "lucide-react";
import { ErrorMessage } from "@/app/_components/error-message";
import type { SeaweedPrices } from "@prisma/client";
import { addSeaweed, updateSeaWeed } from "@/actions/seaweed";

interface Props {
  modal?: "add" | "edit";
  selectedSeaWeed?: SeaweedPrices | null;
  onClose: () => void;
}

export const SeaweedPricesForm = ({
  modal,
  selectedSeaWeed,
  onClose,
}: Props) => {
  const [state, action, pending] = useActionState(
    selectedSeaWeed ? updateSeaWeed : addSeaweed,
    {
      error: null,
    }
  );

  const formatDateForInput = (date: Date | string | null) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          {modal === "add"
            ? "Tambah Data Harga Rumput Laut Baru"
            : "Edit Data Harga Rumput Laut"}
        </h2>
        <p className="text-sm text-gray-600">
          {modal === "add"
            ? "Lengkapi informasi harga rumput laut untuk menambahkan data baru"
            : "Perbarui informasi harga rumput laut sesuai kebutuhan"}
        </p>
      </div>

      <form action={action} className="space-y-6">
        <input type="hidden" name="id" defaultValue={selectedSeaWeed?.id} />
        <ErrorMessage message={state.error} />

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Tanggal</h3>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tanggal *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              defaultValue={formatDateForInput(
                selectedSeaWeed?.date || new Date()
              )}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-150"
              required
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <Package className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Jumlah Produksi
            </h3>
          </div>

          <div>
            <label
              htmlFor="productionQuantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Jumlah Produksi (kg) *
            </label>
            <input
              type="number"
              id="productionQuantity"
              name="productionQuantity"
              min="0"
              defaultValue={selectedSeaWeed?.productionQuantity}
              placeholder="Masukkan jumlah produksi dalam kilogram"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-150"
              required
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Kualitas</h3>
          </div>

          <div>
            <label
              htmlFor="quality"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Kualitas *
            </label>
            <select
              id="quality"
              name="quality"
              defaultValue={selectedSeaWeed?.quality || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-150"
              required
            >
              <option value="">Pilih kualitas</option>
              <option value="1">Sangat Rendah</option>
              <option value="2">Rendah</option>
              <option value="3">Sedang</option>
              <option value="4">Tinggi</option>
              <option value="5">Sangat Tinggi</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Permintaan Pasar
            </h3>
          </div>

          <div>
            <label
              htmlFor="demand"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Permintaan Pasar *
            </label>
            <select
              id="demand"
              name="demand"
              defaultValue={selectedSeaWeed?.demand || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-150"
              required
            >
              <option value="">Pilih tingkat permintaan</option>
              <option value="1">Rendah</option>
              <option value="2">Normal</option>
              <option value="3">Tinggi</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Harga</h3>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Harga per kg (Rp) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              defaultValue={selectedSeaWeed?.price}
              placeholder="Masukkan harga per kilogram dalam rupiah"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors duration-150"
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150"
          >
            Batal
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            disabled={pending}
          >
            {pending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading...</span>
              </span>
            ) : modal === "add" ? (
              "Simpan"
            ) : (
              "Perbarui"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
