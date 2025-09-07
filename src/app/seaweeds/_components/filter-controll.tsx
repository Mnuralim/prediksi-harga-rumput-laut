import React from "react";
import { SortAsc, SortDesc, Calendar } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentSortBy?: string;
  currentSortOrder?: string;
  currentStartDate?: string;
  currentEndDate?: string;
}

export const SeaweedFilterControl = ({
  currentSortBy = "updatedAt",
  currentSortOrder,
  currentStartDate,
  currentEndDate,
}: Props) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value === "") {
      newParams.delete("startDate");
    } else {
      newParams.set("startDate", e.target.value);
    }
    replace(`/seaweeds?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value === "") {
      newParams.delete("endDate");
    } else {
      newParams.set("endDate", e.target.value);
    }
    replace(`/seaweeds?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", e.target.value);
    replace(`/seaweeds?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleSortOrderToggle = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortOrder", currentSortOrder === "asc" ? "desc" : "asc");
    replace(`/seaweeds?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const clearDateFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("startDate");
    newParams.delete("endDate");
    replace(`/seaweeds?${newParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Mulai
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={currentStartDate || ""}
                onChange={handleStartDateChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Akhir
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={currentEndDate || ""}
                onChange={handleEndDateChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={clearDateFilter}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urutkan Berdasarkan
            </label>
            <select
              value={currentSortBy}
              onChange={handleSortByChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="updatedAt">Tanggal Diperbarui</option>
              <option value="date">Tanggal</option>
              <option value="productionQuantity">Jumlah Produksi</option>
              <option value="quality">Kualitas</option>
              <option value="demand">Permintaan</option>
              <option value="price">Harga</option>
              <option value="createdAt">Tanggal Dibuat</option>
              <option value="updatedAt">Tanggal Diperbarui</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSortOrderToggle}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 flex items-center gap-2"
              title={`Urutkan ${
                currentSortOrder === "asc"
                  ? "dari terkecil ke terbesar"
                  : "dari terbesar ke terkecil"
              }`}
            >
              {currentSortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {currentSortOrder === "asc" ? "Ascending" : "Descending"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
