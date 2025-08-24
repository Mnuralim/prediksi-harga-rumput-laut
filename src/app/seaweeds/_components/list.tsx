"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import type { SeaweedPrices } from "@prisma/client";
import { Tabel, type TabelColumn } from "@/app/_components/tabel";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Pagination } from "@/app/_components/pagination";
import { Modal } from "@/app/_components/modal";
import { Alert } from "@/app/_components/alert";
import { useRouter } from "next/navigation";
import { deleteSeaweed } from "@/actions/seaweed";
import { SeaweedPricesForm } from "./form";

interface Props {
  pagination: PaginationProps;
  seaWeeds: SeaweedPrices[];
}

export const SeaWeedList = ({ pagination, seaWeeds }: Props) => {
  const [selectedSeaWeed, setSelectedSeaWeed] = useState<SeaweedPrices | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handelOpenModal = (item?: SeaweedPrices) => {
    if (item) {
      setSelectedSeaWeed(item);
      setIsModalOpen(true);
    } else {
      setSelectedSeaWeed(null);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSeaWeed(null);
  };

  const handleCloseAlert = () => {
    router.replace("/seaweeds", { scroll: false });
  };

  const columns: TabelColumn<SeaweedPrices>[] = [
    {
      header: "No",
      accessor: "id",
      render: (_, index) => (
        <span className="text-slate-500 font-medium">
          {(index as number) + 1}
        </span>
      ),
    },
    {
      header: "Tanggal",
      accessor: (item) => formatDate(new Date(item.date)) || "-",
      className: "font-mono text-sm",
    },
    {
      header: "Jumlah Produksi (KG)",
      accessor: (item) => item.productionQuantity || "-",
    },
    {
      header: "Kualitas (1-5)",
      accessor: (item) => item.quality || "-",
    },
    {
      header: "Permintaan Pasar (1-3)",
      accessor: (item) => item.demand || "-",
    },
    {
      header: "Harga Jual (Rp/KG)",
      accessor: (item) => formatCurrency(item.price) || "-",
    },
    {
      header: "Aksi",
      accessor: (item) => item.id,
      className: "w-32",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handelOpenModal(item)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed border border-green-200"
            title="Edit Data"
          >
            <Edit className="w-4 h-4" />
          </button>
          <form action={() => deleteSeaweed(item.id)} className="inline-block">
            <button
              type="submit"
              className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed border border-red-200"
              title="Hapus Data"
              onClick={(e) => {
                if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                  e.preventDefault();
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </form>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={() => handelOpenModal()}
          className="inline-flex items-center px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors duration-150 shadow-sm border border-green-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Data
        </button>
      </div>

      <Tabel columns={columns} data={seaWeeds} />

      <div className="mt-8">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          preserveParams={pagination.preserveParams}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <SeaweedPricesForm
          modal={selectedSeaWeed ? "edit" : "add"}
          onClose={handleCloseModal}
          selectedSeaWeed={selectedSeaWeed}
        />
      </Modal>
      <Alert
        isVisible={pagination.preserveParams?.message !== undefined}
        message={(pagination.preserveParams?.message as string) || ""}
        onClose={handleCloseAlert}
        type={
          (pagination.preserveParams?.alertType as "success" | "error") ||
          "success"
        }
        autoClose
      />
    </div>
  );
};
